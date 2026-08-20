---
name: webindex
description: >-
  Deja una web lista para que la encuentren los buscadores y los asistentes de IA: robots.txt que
  no bloquea lo que importa, sitemap real, canonical, metadatos Open Graph, JSON-LD y la decisión
  de qué bots de IA entran (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended).
  Úsalo al publicar una web nueva o preparar su lanzamiento, al auditar el SEO técnico de un sitio
  ya vivo, y cuando el usuario diga "no salgo en Google", "no me indexa", "quiero que ChatGPT o
  Perplexity me citen", "revísame el robots.txt" o "ponme los metadatos". Cubre también las webs en varios
  idiomas:
  estructura de URL con /es/ y /en/, hreflang, y por qué redirigir automáticamente por idioma o por
  país rompe la indexación. Termina midiendo en Search Console, no opinando.
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
| Reglas de `hreflang` y códigos de idioma admitidos | Google Search Central, «Localized versions» |
| Plazo de refresco del favicon en resultados de Google | developers.google.com, «Favicon in Search» |

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

| Grupo | Tokens | Qué pasa si lo bloqueas |
|---|---|---|
| **Entrenamiento** | `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Bytespider` | Tu contenido no entrena modelos. No pierdes visibilidad. |
| **Búsqueda y respuesta** | `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User` | **Desapareces de las respuestas de las IA.** |

Verificado en la documentación de OpenAI, Anthropic, Perplexity, Common Crawl y Google el
**2026-08-14**. Cada proveedor tiene ya un bot de índice y otro de visita en directo, así que la
lista crece: reverifícala antes de escribir un `robots.txt`, no la copies de aquí a ciegas.

⚠️ **La trampa que se traga mucha gente:** `Google-Extended` **no afecta a tu posición ni a tu
indexación en Google**, solo al entrenamiento de Gemini. Lo dice Google por escrito. El que te
borra del buscador es bloquear a `Googlebot`, que es otro user-agent distinto. Confundirlos es
autobloquearse.

⚠️ **Los bots de acción del usuario no siempre obedecen.** Perplexity documenta que
`Perplexity-User` generalmente ignora `robots.txt` porque la petición nace de una persona. Si el
objetivo es que ese contenido no salga, `robots.txt` no es la herramienta (paso 1).

La postura por defecto para quien quiere visibilidad: **bloquear entrenamiento, permitir búsqueda
y respuesta.** Ofrecer siempre las tres posturas (todo abierto / mixta / todo cerrado) y que elija
el usuario.

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
- **Si la web lleva movimiento, cruza con la skill `frontlaxweb` antes de construirlo.** El
  storytelling al scroll es donde este fallo nace: los textos acaban dentro de componentes que
  solo existen cuando el JavaScript monta y el elemento entra en viewport. Un reveal debe ocultar
  por CSS algo que YA está en el HTML, nunca decidir en JavaScript si el texto existe. Ese skill
  lleva la contraparte escrita, con lo que cada efecto le hace al LCP, al INP y al CLS.

### 4. Sitemap y darse de alta

- **Sitemap XML** con las URLs indexables. No meter en el sitemap lo que lleva `noindex` ni lo
  redirigido: son señales contradictorias.
- **Google Search Console:** subir el sitemap, vigilar el informe de páginas (qué está indexado y
  por qué no lo está el resto) y usar Inspección de URLs al publicar o arreglar algo.
- **Bing Webmaster Tools:** la segunda opinión, y la puerta a **IndexNow** (avisas y se enteran
  Bing y compañía sin esperar al rastreo). Google no usa IndexNow, así que complementa a Search
  Console, no la sustituye.

⚠️ **El favicon en los resultados va por su cuenta, aparte del resto del rastreo.** Es fácil
comprobar que `favicon.ico` se sirve bien, está indexado y aun así Google sigue enseñando un icono
viejo en el buscador (el típico susto: "¿por qué me sale el icono anterior si ya lo cambié?"). No es
un fallo del sitio: Google lo cachea aparte y su propia documentación dice que el rastreo "puede
tardar de varios días a varias semanas" sin dar un plazo fijo. No hay botón para forzarlo, solo
**Inspección de URLs → Solicitar indexación** de la portada, que es justo lo que la documentación
recomienda para acelerarlo. Verificado en
`developers.google.com/search/docs/appearance/favicon-in-search` el 2026-08-18.

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
- **`hreflang`** solo si hay URLs separadas por idioma, y entonces con las reglas del paso 6.

Plantilla: `plantillas/head-meta.html`.

### 6. Varios idiomas: la barra `/es/` y `hreflang`

Este paso aplica **solo si la web existe en más de un idioma o para más de un país**. Si es de un
idioma solo, saltarlo entero: un `hreflang` mal puesto hace más daño que no ponerlo.

#### 6.1 Primero la estructura de URL

Cada idioma necesita **su propia dirección**. Lo que se ve en `dominio.com/es/precios` no es magia
de detección: es que la versión española **es otra página**, con su URL, que se puede enlazar,
compartir e indexar por separado. Sin eso, el buscador solo conoce una página y solo puede
enseñarla en un idioma.

| Estructura | Ejemplo | Cuándo usarla |
|---|---|---|
| **Subcarpeta** | `dominio.com/es/precios` | **La opción por defecto.** Fácil de montar, un solo dominio y toda la autoridad concentrada. |
| Subdominio | `es.dominio.com/precios` | Cuando cada idioma vive en un servidor o lo lleva otro equipo. |
| Dominio por país | `dominio.es` | Solo con presupuesto y equipo por país: son sitios independientes y cada uno se gana su reputación desde cero. |
| Parámetro | `dominio.com?lang=es` | **Google lo marca como no recomendado.** No usarlo. |

**Idioma y país no son lo mismo.** `es` es "español"; `es-MX` es "español de México". Se separa por
país solo si de verdad cambia algo real (precio, moneda, envío, condiciones legales). Si no cambia
nada, un solo `/es/` para todos los hispanohablantes es una web menos que mantener.

#### 6.2 `hreflang`, el mapa entre las versiones

`hreflang` es lo que le dice al buscador "estas URLs son la misma página en otro idioma", para que
enseñe la correcta a cada persona en vez de tratarlas como contenido duplicado. Tres formas
equivalentes, según Google: etiquetas `<link>` en la cabecera, cabecera HTTP `Link` (para PDF y
archivos que no son HTML) o anotaciones `<xhtml:link>` dentro del sitemap. Se elige **una**.

Las tres reglas que lo rompen casi siempre:

1. **Cada versión se lista a sí misma** además de a las demás. Una página que no se autorreferencia
   deja el grupo cojo.
2. **Los enlaces son de ida y vuelta.** Si `/es/` apunta a `/en/`, `/en/` tiene que apuntar a `/es/`.
   Sin ese enlace de retorno, Google ignora la anotación entera ("missing return links" es el error
   que más sale en Search Console).
3. **`x-default` para quien no encaja en ninguna.** Es el valor reservado para el visitante cuyo
   idioma no está en la lista.

Códigos: idioma en ISO 639-1 y, opcional detrás, región en ISO 3166-1 Alpha 2. **Nunca región sola.**
Google ignora inventos como `EU`, `UN` o `UK` (el del Reino Unido es `GB`).

⚠️ **El error que borra un idioma del buscador:** poner el `rel="canonical"` de `/es/precios`
apuntando a `/en/pricing`. Eso es decirle a Google que la página buena es la inglesa y que la
española no debe indexarse. **Cada URL de idioma es canónica de sí misma**, y las demás versiones
se declaran con `hreflang`, no con canonical.

#### 6.3 La detección automática, que es donde se rompe la indexación

Aquí está el punto delicado, y va con aviso de la propia documentación de Google (verificado el
**2026-08-20**):

- Googlebot **manda sus peticiones sin la cabecera `Accept-Language`**, así que no le puede decir a
  la web en qué idioma la quiere.
- Rastrea sobre todo desde direcciones IP de Estados Unidos, aunque ya también desde otros países.
- Google recomienda **no redirigir automáticamente** al visitante de una versión a otra, porque
  "esas redirecciones pueden impedir que los usuarios (y los buscadores) vean todas las versiones
  del sitio".
- Y avisa de que si el contenido cambia solo por cookie o por configuración del navegador en la
  misma URL, **puede no encontrar ni rastrear todas las variantes**.

Traducido: si la web redirige a todo el mundo según su idioma o su IP, el bot que llega sin idioma
y desde Estados Unidos acaba siempre en la misma versión, y las otras nunca se indexan. La web
funciona perfectamente para las personas y es invisible a medias para el buscador.

**La forma que sí funciona:**

1. **Servir siempre lo que se pide.** Si la petición es `/en/precios`, se sirve `/en/precios`,
   aunque el navegador venga en español. Una URL de idioma explícita **no se redirige jamás**.
2. **Detectar solo en la raíz.** La única URL donde tiene sentido mandar a un idioma u otro es
   `dominio.com/`, que no es la versión de nadie. Y aun ahí, mejor sugerir que obligar.
3. **Sugerir con un aviso, no con un salto.** Una franja de "esta página está en español,
   ¿la abres?" con un enlace deja al visitante y al bot ver la página que pidieron.
4. **Recordar la elección** en cookie o `localStorage`, y respetarla por encima de cualquier
   detección: lo que la persona eligió a mano gana siempre.
5. **Selector de idioma visible y con enlaces `<a href>` de verdad**, no un botón de JavaScript.
   Ese selector es el camino por el que el rastreador descubre las demás versiones.

El orden de preferencia para adivinar el idioma, de más fiable a menos: primero, lo que el visitante
eligió antes y quedó guardado en una cookie; después, la cabecera `Accept-Language` que manda su
navegador, que es su preferencia real declarada; y en último lugar la ubicación por IP, que es la
peor de las tres, porque una VPN, un móvil en itinerancia o un turista la tumban, y porque estar en
un país no dice en qué idioma se lee.

La parte de cliente (arrancar en el idioma y el tema del visitante sin parpadeo y sin forzar
redirecciones) la cubre la skill **SmartDefaults**. Aquí se decide **qué URLs existen y cómo se
anotan**, que es lo que ve el buscador.

#### 6.4 El resto de señales de idioma

- **`<html lang="es">`** en cada página, con el idioma real de esa página. Lo usan los buscadores y
  los lectores de pantalla.
- **Traducción de verdad**, incluidos `<title>`, meta descripción, URL y textos de imagen. La misma
  página en inglés colgada bajo `/es/` no es una versión española.
- **Un sitemap con todas las URLs de todos los idiomas**, no solo las del principal.
- **`og:locale`** con el idioma de la página y **`og:locale:alternate`** con los otros, para que la
  tarjeta que se ve al pegar el enlace también salga bien.

Plantilla: `plantillas/multiidioma.html`.

### 7. JSON-LD, traducir la página al idioma de la máquina

Los datos estructurados desbloquean resultados enriquecidos y ayudan a que te entiendan como
entidad. Tipos habituales: `Organization`, `WebSite`, `Article`, `FAQPage`, `Product`,
`LocalBusiness`, `BreadcrumbList`.

Reglas: que el JSON-LD **describa lo que se ve en la página** (marcar lo que no está visible es
motivo de penalización), y pasarlo por la prueba de resultados enriquecidos antes de darlo por
bueno.

Plantilla: `plantillas/jsonld.html`.

### 8. Que te citen las IA (AEO)

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

### 9. Medir, que es donde acaba el trabajo

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
7. **Redirección automática por idioma o por país** en un sitio multiidioma: el bot llega sin
   `Accept-Language` y desde Estados Unidos, cae siempre en la misma versión y las demás no se
   indexan nunca (paso 6).

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
- [ ] Si hay varios idiomas: ¿cada uno con su URL propia, `hreflang` con autorreferencia y enlaces
      de vuelta, `x-default`, y ninguna redirección automática forzada?
- [ ] Si hay varios idiomas: ¿el `canonical` de cada página apunta a sí misma y no a otro idioma?
- [ ] ¿JSON-LD validado y describiendo lo que se ve en la página?
- [ ] ¿Contenido visible en el HTML servido, no solo tras ejecutar JS?
- [ ] ¿Medido en Search Console y PageSpeed, con la fecha de la comprobación anotada?

## Lo que esta skill no cubre

Se dice de frente en vez de improvisar:

- **Reputación de correo y entregabilidad** (SPF, DKIM, DMARC, listas de bloqueo). Es otro
  territorio, con sus propias reglas. Queda fuera del alcance, pero no hace falta dejar al
  usuario sin nada: para mirarlo por su cuenta están Spamhaus (si el dominio o la IP están en
  listas de spam) y MXToolbox Email Health (MX, SPF, DMARC y listas negras de un tirón, un
  análisis gratis al día), los dos en vibeset.dev/resources.
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
- `plantillas/multiidioma.html`, las tres formas de declarar `hreflang` (cabecera, HTTP y sitemap)
  más el aviso que sugiere idioma sin redirigir.
- `plantillas/sitemap.xml`, ejemplo mínimo con índice de sitemaps.
- `plantillas/llms.txt`, con la advertencia de qué es y qué no es.
