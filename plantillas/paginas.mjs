#!/usr/bin/env node
// Repaso pagina a pagina: recorre el sitemap de una web y mira lo que sirve el servidor, sin ejecutar JavaScript.
// Uso:   node paginas.mjs dominio.com [otro.com ...] [--todas] [--max=500]
//        --todas   lista todas las paginas con algo que mirar (por defecto, las 60 primeras)
//        --max=N   mira solo las N primeras URLs del sitemap
// Solo lee, no cambia nada. Node 18 o superior, sin dependencias.

import { gunzipSync } from 'node:zlib'

const UA = 'Mozilla/5.0 (compatible; inventario-siteindex)'
const A_LA_VEZ = 8
const TIEMPO_MAX_MS = 20000
const REINTENTOS = 2
const MIN_PALABRAS = 80
const MAX_SITEMAPS = 200
const LISTA_CORTA = 60

const espera = (ms) => new Promise((hecho) => setTimeout(hecho, ms))

async function pedir(url, redirect = 'manual') {
  for (let intento = 0; intento <= REINTENTOS; intento++) {
    try {
      const r = await fetch(url, {
        headers: { 'user-agent': UA },
        redirect,
        signal: AbortSignal.timeout(TIEMPO_MAX_MS),
      })
      const ocupado = r.status === 429 || r.status === 503
      if (!ocupado || intento === REINTENTOS) return { estado: r.status, cabeceras: r.headers, datos: Buffer.from(await r.arrayBuffer()) }
    } catch {
      if (intento === REINTENTOS) return { estado: 0, cabeceras: new Headers(), datos: Buffer.alloc(0) }
    }
    await espera(1500 * (intento + 1))
  }
}

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
const descodificar = (t) =>
  t.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (todo, e) => {
    if (e[0] !== '#') return ENTIDADES[e.toLowerCase()] ?? todo
    const n = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)
    return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : todo
  })
const limpiar = (t) => descodificar(t || '').replace(/\s+/g, ' ').trim()

const atributos = (etiqueta) =>
  Object.fromEntries(
    [...etiqueta.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map((m) => [
      m[1].toLowerCase(),
      descodificar(m[2] ?? m[3] ?? m[4] ?? ''),
    ]),
  )
const etiquetas = (html, nombre) =>
  [...html.matchAll(new RegExp(`<${nombre}\\b(?:[^>"']|"[^"]*"|'[^']*')*>`, 'gi'))].map((m) => atributos(m[0]))

// Dos URLs son la misma pagina aunque difieran en la barra final, el fragmento o las mayusculas del dominio.
function normalizar(href, base) {
  try {
    const u = new URL(href, base)
    u.hash = ''
    const ruta = u.pathname.length > 1 ? u.pathname.replace(/\/+$/, '') : u.pathname
    return `${u.protocol}//${u.host.toLowerCase()}${ruta}${u.search}`
  } catch {
    return ''
  }
}

// Lo que ve quien abre la pagina: el <body> sin script, style, noscript, svg, template ni comentarios.
function separar(html) {
  const sinRuido = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1\s*>/gi, ' ')
  const inicioBody = sinRuido.search(/<body\b/i)
  const finHead = sinRuido.search(/<\/head\s*>/i)
  const corte = inicioBody >= 0 ? inicioBody : finHead >= 0 ? finHead : 0
  const cabeza = sinRuido.slice(0, corte)
  const cuerpo = sinRuido.slice(corte).replace(/<\/head\s*>/i, ' ').replace(/<\/body\b[\s\S]*$/i, ' ')
  return { cabeza, cuerpo }
}

function contarPalabras(cuerpo) {
  return descodificar(cuerpo.replace(/<[^>]+>/g, ' '))
    .split(/\s+/)
    .filter((p) => /[\p{L}\p{N}]/u.test(p)).length
}

function tiposJsonLd(html) {
  const tipos = new Set()
  let roto = false
  const recorrer = (nodo) => {
    if (Array.isArray(nodo)) return nodo.forEach(recorrer)
    if (!nodo || typeof nodo !== 'object') return
    for (const t of [nodo['@type']].flat()) if (typeof t === 'string') tipos.add(t)
    Object.values(nodo).forEach(recorrer)
  }
  for (const m of html.matchAll(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script\s*>/gi)) {
    try {
      recorrer(JSON.parse(m[1]))
    } catch {
      roto = true
    }
  }
  return { tipos: [...tipos], roto }
}

function alternosDeCabecera(link, base) {
  const alternos = []
  for (const m of (link || '').matchAll(/<([^>]+)>\s*;([^,]*)/g)) {
    if (/rel="?alternate"?/i.test(m[2]) && /hreflang=/i.test(m[2])) alternos.push(normalizar(m[1], base))
  }
  return alternos
}

function analizar(url, respuesta, alternosSitemap) {
  const { estado, cabeceras, datos } = respuesta
  const fila = { url, clave: normalizar(url), estado, destino: cabeceras.get('location') || '', alternos: new Set(alternosSitemap) }
  fila.esHtml = /html/i.test(cabeceras.get('content-type') || 'text/html')
  if (estado !== 200 || !fila.esHtml) return fila

  const html = datos.toString('utf8')
  const { cabeza, cuerpo } = separar(html)
  const metas = etiquetas(cabeza, 'meta')
  const enlaces = etiquetas(cabeza, 'link')
  const meta = (...nombres) => metas.find((a) => nombres.includes((a.name || a.property || '').toLowerCase()))
  const conRel = (rel) => enlaces.filter((a) => (a.rel || '').toLowerCase().split(/\s+/).includes(rel))

  fila.titulo = limpiar(/<title\b(?:[^>"']|"[^"]*"|'[^']*')*>([\s\S]*?)<\/title\s*>/i.exec(cabeza)?.[1])
  fila.descripcion = limpiar(meta('description')?.content)
  fila.canonical = conRel('canonical')[0]?.href ? normalizar(conRel('canonical')[0].href, url) : ''
  const robots = metas.filter((a) => ['robots', 'googlebot'].includes((a.name || '').toLowerCase())).map((a) => a.content || '')
  fila.noindex = /noindex|\bnone\b/i.test([...robots, cabeceras.get('x-robots-tag') || ''].join(' '))
  fila.h1 = (cuerpo.match(/<h1\b/gi) || []).length
  fila.ogImage = Boolean(meta('og:image')?.content)
  fila.palabras = contarPalabras(cuerpo)
  Object.assign(fila, tiposJsonLd(html))

  const declarados = conRel('alternate').filter((a) => a.hreflang && a.href).map((a) => normalizar(a.href, url))
  for (const a of [...declarados, ...alternosDeCabecera(cabeceras.get('link'), url)]) fila.alternos.add(a)
  return fila
}

const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((m) => descodificar(m[1]))

async function leerXml(url) {
  const r = await pedir(url, 'follow')
  if (r.estado !== 200) return ''
  const comprimido = r.datos[0] === 0x1f && r.datos[1] === 0x8b
  return (comprimido ? gunzipSync(r.datos) : r.datos).toString('utf8')
}

// Devuelve cada URL del sitemap con las versiones de idioma que el propio sitemap declara para ella.
async function leerSitemaps(base) {
  const robots = (await pedir(`${base}/robots.txt`, 'follow')).datos.toString('utf8')
  const declarados = [...robots.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1])
  const habituales = ['sitemap.xml', 'sitemap_index.xml', 'sitemap-index.xml'].map((f) => `${base}/${f}`)
  const paginas = new Map()

  for (const inicio of [declarados, habituales]) {
    const cola = [...inicio]
    const vistos = new Set()
    while (cola.length && vistos.size < MAX_SITEMAPS) {
      const url = cola.shift()
      if (vistos.has(url)) continue
      vistos.add(url)
      const xml = await leerXml(url)
      if (/<sitemapindex\b/i.test(xml)) cola.push(...locs(xml))
      else if (/<urlset\b/i.test(xml)) {
        for (const [bloque] of xml.matchAll(/<url\b[\s\S]*?<\/url\s*>/gi)) {
          const [loc] = locs(bloque)
          if (!loc) continue
          const alternos = etiquetas(bloque, 'xhtml:link').filter((a) => a.hreflang && a.href).map((a) => normalizar(a.href, loc))
          paginas.set(loc, [...(paginas.get(loc) || []), ...alternos])
        }
      }
    }
    if (paginas.size) break
  }
  return paginas
}

const seEnlazan = (a, b) => a.alternos.has(b.clave) && b.alternos.has(a.clave)

// Cuantas paginas distintas comparten cada valor. Las versiones de idioma enlazadas por hreflang
// de ida y vuelta cuentan como una sola: que digan lo mismo en dos idiomas no es un repetido.
function repetidos(filas, campo) {
  const grupos = new Map()
  for (const f of filas) if (f[campo]) grupos.set(f[campo], [...(grupos.get(f[campo]) || []), f])

  const veces = new Map()
  for (const grupo of grupos.values()) {
    if (grupo.length < 2) continue
    const padre = new Map(grupo.map((f) => [f, f]))
    const raiz = (f) => {
      while (padre.get(f) !== f) f = padre.get(f)
      return f
    }
    for (let i = 0; i < grupo.length; i++)
      for (let j = i + 1; j < grupo.length; j++) if (seEnlazan(grupo[i], grupo[j])) padre.set(raiz(grupo[i]), raiz(grupo[j]))
    const distintas = new Set(grupo.map(raiz)).size
    if (distintas > 1) for (const f of grupo) veces.set(f, distintas)
  }
  return veces
}

function problemasDe(f, ctx) {
  if (f.estado !== 200) return [[`estado ${f.estado || 'sin respuesta'}`, f.destino ? `-> ${f.destino}` : '']]
  const p = []
  const nota = (tipo, detalle = '') => p.push([tipo, detalle])

  if (!f.titulo) nota('sin title')
  else if (ctx.titulos.has(f)) nota('title repetido', `x${ctx.titulos.get(f)}`)
  if (!f.descripcion) nota('sin descripcion')
  else if (ctx.descripciones.has(f)) nota('descripcion repetida', `x${ctx.descripciones.get(f)}`)
  if (!f.canonical) nota('sin canonical')
  else if (f.canonical !== f.clave) nota('canonical a otra', f.canonical)
  if (f.noindex) nota('noindex en el sitemap')
  if (f.h1 !== 1) nota(f.h1 ? 'varios h1' : 'sin h1', f.h1 ? `h1=${f.h1}` : '')
  if (!f.ogImage) nota('sin og:image')
  if (f.palabras < MIN_PALABRAS) nota('poco texto en el HTML', `${f.palabras} palabras`)
  if (f.roto) nota('JSON-LD roto')
  if (f.alternos.size) {
    if (!f.alternos.has(f.clave)) nota('hreflang sin autorreferencia')
    const sinVuelta = [...f.alternos].filter((a) => a !== f.clave && ctx.porClave.has(a) && !ctx.porClave.get(a).alternos.has(f.clave))
    if (sinVuelta.length) nota('hreflang sin vuelta', sinVuelta[0])
  }
  return p
}

async function repasar(sitio, { todas, max }) {
  const base = /^https?:\/\//i.test(sitio) ? sitio.replace(/\/+$/, '') : `https://${sitio}`
  const corta = (u) => (u.startsWith(base) ? u.slice(base.length) || '/' : u)

  const paginas = await leerSitemaps(base)
  const sinSitemap = paginas.size === 0
  if (sinSitemap) paginas.set(`${base}/`, [])
  const urls = [...paginas.keys()].slice(0, max)

  console.log(`\n################ ${sitio}: ${sinSitemap ? 'SIN SITEMAP, miro solo la portada' : `${paginas.size} URLs en el sitemap`}`)
  if (urls.length < paginas.size) console.log(`Miro solo las ${urls.length} primeras (--max).`)

  const filas = []
  for (let i = 0; i < urls.length; i += A_LA_VEZ) {
    const lote = urls.slice(i, i + A_LA_VEZ)
    filas.push(...(await Promise.all(lote.map(async (u) => analizar(u, await pedir(u), paginas.get(u))))))
  }

  const noHtml = filas.filter((f) => f.estado === 200 && !f.esHtml)
  const revisables = filas.filter((f) => f.esHtml || f.estado !== 200)
  const buenas = revisables.filter((f) => f.estado === 200)
  const ctx = {
    titulos: repetidos(buenas, 'titulo'),
    descripciones: repetidos(buenas, 'descripcion'),
    porClave: new Map(buenas.map((f) => [f.clave, f])),
  }

  const conProblemas = revisables.map((f) => [f, problemasDe(f, ctx)]).filter(([, p]) => p.length)
  const porTipo = new Map()
  for (const [, p] of conProblemas) for (const [tipo] of p) porTipo.set(tipo, (porTipo.get(tipo) || 0) + 1)

  if (!conProblemas.length) {
    console.log('Todas las paginas: 200, title y descripcion propios, canonical a si misma, un h1, og:image y texto en el HTML.')
  } else {
    console.log(`Con algo que mirar: ${conProblemas.length} de ${revisables.length} paginas`)
    for (const [tipo, n] of [...porTipo].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${tipo}`)
    console.log('Pagina a pagina:')
    const lista = todas ? conProblemas : conProblemas.slice(0, LISTA_CORTA)
    for (const [f, p] of lista) console.log(`  ${corta(f.url)}  [${p.map(([t, d]) => (d ? `${t} ${corta(d)}` : t)).join('; ')}]`)
    if (lista.length < conProblemas.length) console.log(`  ... y ${conProblemas.length - lista.length} mas (--todas para verlas)`)
  }

  if (noHtml.length) console.log(`No son HTML y no se revisan: ${noHtml.length}`)
  if (!buenas.length) {
    process.exitCode = 1
    return
  }

  const tipos = new Map()
  for (const f of buenas) for (const t of f.tipos) tipos.set(t, (tipos.get(t) || 0) + 1)
  const palabras = buenas.map((f) => f.palabras).sort((a, b) => a - b)
  console.log(`JSON-LD por tipo: ${[...tipos].map(([t, n]) => `${t}:${n}`).join(' ') || '(ninguno)'}`)
  console.log(`hreflang en ${buenas.filter((f) => f.alternos.size).length} de ${buenas.length} paginas`)
  console.log(`Palabras en el HTML (minimo / mediana): ${palabras[0]} / ${palabras[Math.floor(palabras.length / 2)]}`)
  console.log(
    `Pistas, sin cifra oficial de Google: ${buenas.filter((f) => (f.titulo || '').length > 65).length} titles de mas de 65 caracteres, ` +
      `${buenas.filter((f) => f.descripcion && f.descripcion.length < 70).length} descripciones de menos de 70`,
  )
}

const args = process.argv.slice(2)
const sitios = args.filter((a) => !a.startsWith('--'))
if (!sitios.length) {
  console.log('Uso: node paginas.mjs dominio.com [otro.com ...] [--todas] [--max=500]')
  process.exit(2)
}
const max = Number(args.find((a) => a.startsWith('--max='))?.slice(6)) || Infinity
for (const sitio of sitios) await repasar(sitio, { todas: args.includes('--todas'), max })
