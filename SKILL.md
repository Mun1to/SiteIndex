---
name: webindex
description: >-
  Deja una web lista para que la encuentren los buscadores y los asistentes de IA: robots.txt que
  no bloquea lo que importa, sitemap real, canonical, metadatos Open Graph, JSON-LD y la decisión
  de qué bots de IA entran (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended).
  Úsalo al publicar una web nueva o preparar su lanzamiento, al auditar el SEO técnico de un sitio
  ya vivo, y cuando el usuario diga "no salgo en Google", "no me indexa", "quiero que ChatGPT o
  Perplexity me citen", "revísame el robots.txt" o "ponme los metadatos". Termina midiendo en
  Search Console, no opinando.
---

# WebIndex, dejar una web lista para que la encuentren

## Qué logra

Que la web sea **descubrible**: que los rastreadores puedan entrar, entiendan qué es cada página,
y que además te puedan citar los asistentes de IA. Y que al final se compruebe con datos, no con
la sensación de que "ya debería salir".

## Regla 0: los números se verifican, nunca se recitan

Esta skill contiene procedimientos, no cifras. **Todo lo que lleve un número o un requisito
concreto caduca**, así que antes de dar un límite por bueno hay que abrir la fuente oficial en ese
momento. Si el usuario pide un número exacto y no se puede verificar, se dice que no se ha
verificado, no se inventa.

| Lo que caduca | Dónde se comprueba |
|---|---|
| Longitud recomendada de `<title>` y meta descripción | Google Search Central, documentación de fragmentos |
| Umbrales de Core Web Vitals (LCP, INP, CLS) | web.dev y PageSpeed Insights |
| Nombres y user-agents de los bots de IA | La página de cada proveedor (OpenAI, Anthropic, Perplexity, Google) |
| Tipos y campos obligatorios de datos estructurados | Galería de resultados enriquecidos de Google Search Central |
| Qué buscadores admiten IndexNow | indexnow.org |

Los user-agents son lo que más se mueve: aparecen bots nuevos cada pocos meses. Un `robots.txt`
escrito hace un año está desactualizado por definición.

## Orden de trabajo

El orden importa: no sirve de nada pulir un título si el bot no puede entrar en la página.

### 1. Los porteros: `robots.txt`

Vive en `dominio.com/robots.txt`. Antes de escribir nada, **leer el que ya hay** y comprobar qué
está bloqueado.

- Bloquear solo lo inútil o duplicado (panel de administración, carrito, resultados del buscador
  interno). Cada URL basura que rastrean gasta presupuesto de rastreo.
- Enlazar el sitemap explícitamente con `Sitemap:`.
- **`robots.txt` es un cartel, no un candado.** Los bots que raspan contenido se lo saltan entero.
- **Bloquear en `robots.txt` y poner `noindex` a la vez se anula solo**: el bot nunca llega a leer
  la etiqueta. Para sacar una página del índice de verdad: dejar entrar al bot y servirle `noindex`,
  o ponerla detrás de contraseña.

Plantilla: `plantillas/robots.txt`.

### 2. La decisión de IA, que es una decisión de negocio

Los bots de IA no son buscadores y no hacen todos lo mismo. Hay que separarlos en dos grupos y
**preguntar al usuario**, porque esto no lo decide el que implementa:

| Grupo | Ejemplos | Qué pasa si lo bloqueas |
|---|---|---|
| **Entrenamiento** | `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Bytespider` | Tu contenido no entrena modelos. No pierdes visibilidad. |
| **Consulta en directo** | `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot` | **Desapareces de las respuestas de las IA.** |

⚠️ **La trampa que se traga mucha gente:** `Google-Extended` **no afecta a tu posición ni a tu
indexación en Google**, solo al entrenamiento de Gemini. El que te borra del buscador es bloquear
a `Googlebot`, que es otro user-agent distinto. Confundirlos es autobloquearse.

La postura por defecto para quien quiere visibilidad: **bloquear entrenamiento, permitir consulta.**
Ofrecer siempre las tres posturas (todo abierto / mixta / todo cerrado) y que elija el usuario.

### 3. Cimientos que no se negocian

Si algo de esto falla, lo demás sobra:

- **HTTPS en todas las páginas.**
- **Una sola versión canónica del dominio.** O `https://dominio.com` o `https://www.dominio.com`,
  y la otra redirige con un 301. Nunca las dos respondiendo 200.
- **Primero el móvil.** Se indexa la versión móvil: un contenido o un enlace que solo existe en
  escritorio, para el buscador no existe.
- **404 de verdad** para lo que no existe, en vez de redirigir todo a la portada.
- **Que el contenido esté en el HTML.** Si la página lo pinta todo con JavaScript en el cliente,
  comprobar qué ve el bot (Inspección de URLs de Search Console, pestaña de HTML renderizado).
  Ante la duda, renderizado en servidor o pre-render.

### 4. Sitemap y darse de alta

- **Sitemap XML** con las URLs indexables. No meter en el sitemap lo que lleva `noindex` ni lo
  redirigido: son señales contradictorias.
- **Google Search Console:** subir el sitemap, vigilar el informe de páginas (qué está indexado y
  por qué no lo está el resto) y usar Inspección de URLs al publicar o arreglar algo.
- **Bing Webmaster Tools:** la segunda opinión, y la puerta a **IndexNow** (avisas y se enteran
  Bing y compañía sin esperar al rastreo). Google no usa IndexNow, así que complementa a Search
  Console, no la sustituye.

Plantilla: `plantillas/sitemap.xml`.

### 5. Página a página: la cabecera

Cada página necesita, como mínimo:

- **`<title>` propio**, con lo importante cerca del principio. Ni repetido entre páginas ni vacío.
- **Meta descripción propia**, que funciona como el anuncio: no posiciona sola, pero decide el clic.
- **Un solo `<h1>`**, y `<h2>`/`<h3>` con jerarquía real.
- **`rel="canonical"`** apuntando a la versión buena cuando el mismo contenido es alcanzable por
  varias URLs (parámetros, filtros, paginación).
- **Open Graph** (`og:title`, `og:description`, `og:image`, `og:url`) y Twitter Card. No es SEO,
  es lo que se ve al pegar el enlace en WhatsApp, LinkedIn o Slack, y es lo primero que nota el
  usuario cuando falta.
- **`hreflang`** solo si hay URLs separadas por idioma.

Plantilla: `plantillas/head-meta.html`.

### 6. JSON-LD, traducir la página al idioma de la máquina

Los datos estructurados desbloquean resultados enriquecidos y ayudan a que te entiendan como
entidad. Tipos habituales: `Organization`, `WebSite`, `Article`, `FAQPage`, `Product`,
`LocalBusiness`, `BreadcrumbList`.

Reglas: que el JSON-LD **describa lo que se ve en la página** (marcar lo que no está visible es
motivo de penalización), y pasarlo por la prueba de resultados enriquecidos antes de darlo por
bueno.

Plantilla: `plantillas/jsonld.html`.

### 7. Que te citen las IA (AEO)

- **Responder en las dos o tres primeras frases** debajo de cada encabezado, y desarrollar debajo.
  Los modelos buscan la respuesta directa, no el rodeo.
- **Lenguaje natural:** la pregunta entera, tal y como la haría alguien, en vez de la palabra clave
  suelta.
- **Formato legible por máquina:** tablas para comparar, listas para procesos, preguntas frecuentes
  reales.
- **Revisar el `robots.txt` antes de culpar al contenido:** si los bots de consulta están
  bloqueados, nada de esto sirve (paso 2).
- **`llms.txt`:** propuesta de la comunidad, **no un estándar adoptado**, y Google ha dicho
  públicamente que no lo usa. Cuesta diez minutos y no hace daño, así que se puede poner, pero no
  se cuenta como canal ni se vende como tal. Plantilla: `plantillas/llms.txt`.

### 8. Medir, que es donde acaba el trabajo

Ninguna de las tareas anteriores está terminada hasta que se ve el efecto:

- **Search Console:** páginas indexadas frente a enviadas, y los motivos de exclusión.
- **PageSpeed Insights** para Core Web Vitals, con datos de campo si los hay.
- **Los logs del servidor:** qué bots entran de verdad. Más fiable que cualquier panel.
- **Las preguntas clave a los asistentes, a mano, una vez al mes:** apuntar si te citan y junto a
  quién. Ese registro es el único informe de posiciones en IA que existe hoy.
- **Analytics:** las visitas desde `chatgpt.com` o `perplexity.ai` son pocas y con muchísima
  intención.

## Los fallos que más veces rompen una indexación

Antes de tocar nada en una web que "no sale en Google", descartar estos por orden:

1. **`noindex` olvidado** de la fase de desarrollo, en la cabecera o en la cabecera HTTP
   `X-Robots-Tag`. Es la causa número uno.
2. **`Disallow: /` en el `robots.txt`** que se subió del entorno de pruebas.
3. **Sitio nuevo sin dar de alta** en Search Console y sin ningún enlace entrante: nadie sabe que
   existe. La indexación tarda, no es instantánea.
4. **Las dos versiones del dominio vivas a la vez** (con y sin `www`, o http y https), partiendo
   las señales en dos.
5. **Canonical apuntando a otra página** (típico de plantillas copiadas): le estás diciendo al
   buscador que esa página no es la buena.
6. **Contenido que solo existe tras ejecutar JavaScript**, en un sitio que además tarda en pintar.

## Contenido generado con IA

Se juzga el contenido, no la herramienta: contenido asistido por IA que aporta algo está bien;
producir páginas casi idénticas en masa para posicionar es una política de spam, la escriba quien
la escriba. Además, en la UE el Reglamento de IA exige declarar el contenido sintético donde
corresponda, y la etiqueta no cuesta nada al lado de una penalización.

## Checklist

- [ ] ¿`robots.txt` revisado y sin bloquear nada que deba indexarse?
- [ ] ¿Decisión de bots de IA tomada **por el usuario**, con los dos grupos explicados?
- [ ] ¿Ninguna página lleva `noindex` sin querer (HTML y cabecera `X-Robots-Tag`)?
- [ ] ¿Una sola versión canónica del dominio, con 301 desde la otra?
- [ ] ¿Sitemap generado, sin URLs `noindex` ni redirigidas, y enlazado desde `robots.txt`?
- [ ] ¿Sitemap subido a Search Console y a Bing Webmaster Tools?
- [ ] ¿Cada página con `<title>` y meta descripción propios, y un solo `<h1>`?
- [ ] ¿`rel="canonical"` correcto en las páginas con parámetros o duplicados?
- [ ] ¿Open Graph completo y con imagen, comprobado pegando el enlace en un chat de verdad?
- [ ] ¿JSON-LD validado y describiendo lo que se ve en la página?
- [ ] ¿Contenido visible en el HTML servido, no solo tras ejecutar JS?
- [ ] ¿Medido en Search Console y PageSpeed, con la fecha de la comprobación anotada?

## Lo que esta skill no cubre

Se dice de frente en vez de improvisar:

- **Reputación de correo y entregabilidad** (SPF, DKIM, DMARC, listas de bloqueo). Es otro
  territorio, con sus propias reglas.
- **Geo SEO local** (perfil de empresa, coherencia de nombre-dirección-teléfono, reseñas).
- **Enlaces entrantes y autoridad.** Aquí no hay atajo técnico: se gana con contenido que alguien
  quiera enlazar.

Si el usuario pregunta por alguno de los tres, decirle que queda fuera del alcance y, si hace
falta, tratarlo aparte con fuentes verificadas en el momento.

## Índice de recursos

- `plantillas/robots.txt`, comentado, con las tres posturas de IA para elegir.
- `plantillas/head-meta.html`, la cabecera completa: title, descripción, canonical, Open Graph,
  Twitter Card y hreflang.
- `plantillas/jsonld.html`, bloques JSON-LD listos para `Organization`, `WebSite`, `Article`,
  `FAQPage` y `BreadcrumbList`.
- `plantillas/sitemap.xml`, ejemplo mínimo con índice de sitemaps.
- `plantillas/llms.txt`, con la advertencia de qué es y qué no es.
