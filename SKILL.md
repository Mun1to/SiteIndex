---
name: siteindex
description: >-
  Posiciona una web y la deja lista para que la encuentren los buscadores y los asistentes de IA.
  Empieza SIEMPRE barriendo el dominio para ver qué está ya hecho, incluida el alta en Search
  Console y Bing, y solo pregunta lo que no puede comprobar. Cubre robots.txt, sitemap, canonical,
  Open Graph, JSON-LD, qué bots de IA entran, webs en varios idiomas con /es/ y hreflang, contenido
  e intención de búsqueda, enlaces internos, velocidad, negocio local, la página de un producto
  digital (app, herramienta o skill) y la medición final. Úsalo al publicar una web, al preparar un
  lanzamiento, al auditar el SEO de un sitio vivo, y cuando digan "no salgo en Google", "quiero
  posicionar", "no me indexa", "nadie descarga mi app", "quiero que ChatGPT o Perplexity me citen"
  o "revísame el robots.txt".
---

# SiteIndex, posicionar una web y dejarla lista para que la encuentren

## Qué logra

Que la web sea **descubrible** (que los rastreadores entren y entiendan qué es cada página),
**merecedora** (que haya un motivo para enseñarla por encima de otra) y **medible** (que al final
se compruebe con datos, no con la sensación de que "ya debería salir").

## Cuándo NO usarla

- Si el problema es que la web **no carga o da error de servidor**: eso se arregla antes, y no es
  esta skill.
- Si lo que se pide es **publicidad de pago**, campañas o redes sociales. Aquí no se compra
  tráfico, se gana.
- Si el encargo es **escribir el contenido**. Esta skill dice qué contenido hace falta y cómo se
  estructura, no lo redacta por ti.

## Regla 0: los números se verifican, nunca se recitan

Esta skill contiene procedimientos, no cifras. **Todo lo que lleve un número o un requisito
concreto caduca**, así que antes de dar un límite por bueno hay que abrir la fuente oficial en ese
momento. Si el usuario pide un número exacto y no se puede verificar, se dice que no se ha
verificado, no se inventa.

| Lo que caduca | Dónde se comprueba |
|---|---|
| Qué dice Google del largo de `<title>` y meta descripción. Hoy (2026-08-25) **no publica ninguna cifra**: dice que el título se recorta al ancho del dispositivo. Toda cifra que circula es de un tercero | Google Search Central, «Title links» y documentación de fragmentos |
| Umbrales de Core Web Vitals (LCP, INP, CLS) | web.dev y PageSpeed Insights |
| Nombres y user-agents de los bots de IA | La página de cada proveedor (OpenAI, Anthropic, Perplexity, Google) |
| Tipos y campos obligatorios de datos estructurados | Galería de resultados enriquecidos de Google Search Central |
| Qué buscadores admiten IndexNow | `indexnow.org/searchengines.json`, que es la lista viva |
| Reglas de `hreflang` y códigos de idioma admitidos | Google Search Central, «Localized versions» |
| Plazo de refresco del favicon en resultados de Google | developers.google.com, «Favicon in Search» |
| Qué informes existen hoy en Search Console | La propia Search Console del usuario, abriéndola |

Los user-agents son lo que más se mueve: aparecen bots nuevos cada pocos meses. Un `robots.txt`
escrito hace un año está desactualizado por definición.

## Regla 1: primero se mira, después se pregunta, y nunca se propone lo que ya está hecho

**Está prohibido recomendar nada antes de terminar la fase 0.** Un informe que dice "date de alta
en Search Console" a alguien que lleva un año usándola es ruido, y hace que se ignore el resto.

Tres consecuencias que se aplican siempre:

1. **Cada punto del informe empieza por el estado real**: `YA ESTÁ`, `FALTA`, `MAL PUESTO` o
   `NO APLICA`. Nada sale sin etiqueta.
2. **Lo que el barrido ya ha contestado no se pregunta.** Se enseña como hecho y se pasa al
   siguiente.
3. **Lo que no se ha podido comprobar se dice**, con esas palabras, en vez de suponerlo. "No he
   podido ver si el sitemap está enviado en Search Console" es una respuesta válida; inventarlo, no.

## Fase 0: el inventario, antes de tocar nada

### 0.1 El barrido, que es automático

Se lanza el barrido contra el dominio real. Mide en producción, no lee el repositorio: lo que
importa es lo que sirve el servidor, que muchas veces no es lo que hay en el código.

```bash
bash plantillas/inventario.sh dominio.com
```

Contesta solo, sin molestar al usuario, a esto:

| Lo que responde el barrido | Para qué sirve |
|---|---|
| Si `http`, `https`, con y sin `www` acaban todas en la misma URL | Detecta el dominio partido en dos |
| Si hay `robots.txt`, qué bloquea y qué bots de IA nombra | Dice si la decisión de IA está tomada o no existe |
| Si hay `sitemap.xml`, cuántas URLs lleva y si tienen `lastmod` | Dice si el sitemap es real o decorativo |
| `<title>`, descripción, `canonical`, `h1`, `og:`, `twitter:`, `hreflang`, `html lang` | La cabecera página a página |
| Los `@type` de JSON-LD que ya hay | Evita proponer datos estructurados que ya están |
| Etiqueta `google-site-verification`, `msvalidate.01` y los TXT del DNS | **Dice si la web ya está dada de alta en Search Console y en Bing** |
| Qué herramienta de analítica está instalada | Evita proponer medición que ya existe |
| Palabras visibles en el HTML servido | Detecta el contenido que solo existe tras ejecutar JavaScript |
| TTFB y peso del HTML | Primer aviso de lentitud, no sustituye a PageSpeed |

Si el dominio todavía no existe (web sin publicar), el barrido no aplica: se salta, se dice que se
salta, y se trabaja sobre los archivos del repositorio.

### 0.2 Las preguntas, que son las que el barrido no puede contestar

Se preguntan **de una vez, en un solo mensaje, máximo ocho**, y solo las que sigan en pie después
del barrido. Preguntar algo que el barrido ya contestó es el fallo que esta fase existe para evitar.

Ronda única, y se adapta a lo que haya salido:

1. **¿Entras en Google Search Console y en Bing Webmaster Tools, o solo están verificadas?** El
   barrido ve la verificación, no ve si alguien mira los informes ni si el sitemap está enviado.
2. **¿Qué dice hoy Search Console: cuántas páginas indexadas y cuántas excluidas, y por qué motivo?**
   Es el dato que más ahorra: convierte el trabajo entero en una lista concreta.
3. **¿Quién es el cliente y qué escribiría en el buscador para encontrarte?** Tres o cuatro frases
   reales, tal y como las diría una persona.
4. **¿Qué páginas dan dinero o clientes?** Solo esas merecen trabajo fino; el resto puede esperar.
5. **¿Hay competidores que salgan por encima?** Dos o tres nombres bastan para saber contra qué se
   compite.
6. **¿Se publica contenido nuevo, con qué ritmo y quién lo escribe?** Decide si la parte de
   contenido es viable o es humo.
7. **¿La web atiende a clientes en un sitio físico o en una zona concreta?** Si sí, entra la fase 11.
8. **¿Qué se ha intentado ya y no funcionó?** Evita repetir lo que ya falló y da pistas del fallo.

Si el usuario no sabe contestar a la 1 o la 2, no se le interroga más: se le explica en dos líneas
cómo mirarlo y se sigue con lo que sí se puede hacer.

### 0.3 La hoja de estado

El resultado de la fase 0 se escribe en un archivo del proyecto, no en el chat, porque el chat se
pierde. Plantilla: `plantillas/SEO-ESTADO.md`.

Lleva tres columnas (`Ya está`, `Falta`, `No aplica`), la fecha del barrido y, en cada línea que
falta, **quién puede arreglarlo**: el agente en el código, o el usuario en un panel donde el agente
no entra (Search Console, Bing, perfil de empresa).

De ahí sale el plan: **ordenado por impacto, no por el orden de las fases**. Primero lo que impide
entrar, después lo que impide entender, después lo que hace que merezca la pena, y al final el pulido.

## El orden de trabajo

No sirve de nada pulir un título si el bot no puede entrar en la página. El orden es este, y cada
bloque desbloquea el siguiente:

| Bloque | Fases | Qué desbloquea |
|---|---|---|
| **Que puedan entrar** | 1, 2, 3 | Sin esto, lo demás no se llega a leer |
| **Que entiendan qué es cada página** | 4, 5, 6, 7 | Sin esto, entran y no saben qué enseñar |
| **Que merezca la pena enseñarla** | 8, 9, 10, 11 | Sin esto, te leen y eligen a otro |
| **Que se sepa y se compruebe** | 12, 13, 14 | Sin esto, nadie se entera y nadie lo sabe |

Las fases que no aplican se saltan **diciéndolo**: se anotan como `NO APLICA` en la hoja de estado,
para que nadie las vuelva a sacar dentro de un mes.

## 1. Los porteros: `robots.txt`

Vive en `dominio.com/robots.txt`. Antes de escribir nada, **leer el que ya hay** y comprobar qué
está bloqueado (el barrido ya lo trajo).

- Bloquear solo lo inútil o duplicado: panel de administración, carrito, resultados del buscador
  interno, y sobre todo **los filtros de catálogo**, que generan una URL por cada combinación de
  color, talla y precio. Google recomienda cerrar esas en `robots.txt` y no con `noindex`, porque
  el `noindex` obliga a rastrearlas igual para poder leerlo.
- Enlazar el sitemap explícitamente con `Sitemap:`.
- **`robots.txt` es un cartel, no un candado.** Los bots que raspan contenido se lo saltan entero.
- **Bloquear en `robots.txt` y poner `noindex` a la vez se anula solo**: el bot nunca llega a leer
  la etiqueta. Para sacar una página del índice de verdad: dejar entrar al bot y servirle `noindex`,
  o ponerla detrás de contraseña.
- **Nunca bloquear el CSS ni el JavaScript** que la página necesita para pintarse: Google dice que
  necesita acceder a los mismos recursos que el navegador del visitante.

Plantilla: `plantillas/robots.txt`. Presupuesto de rastreo y sitios grandes:
`referencias/rendimiento.md`.

## 2. La decisión de IA, que es una decisión de negocio

Los bots de IA no son buscadores y no hacen todos lo mismo. Hay que separarlos en dos grupos y
**preguntar al usuario**, porque esto no lo decide el que implementa:

| Grupo | Tokens | Qué pasa si lo bloqueas |
|---|---|---|
| **Entrenamiento** | `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`, `Bytespider`, `Applebot-Extended`, `meta-externalagent`, `Amazonbot` | Tu contenido no entrena modelos. No pierdes visibilidad. |
| **Búsqueda y respuesta** | `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User` | **Desapareces de las respuestas de las IA.** |

La postura por defecto para quien quiere visibilidad: **bloquear entrenamiento, permitir búsqueda
y respuesta.** Ofrecer siempre las tres posturas (todo abierto, mixta, todo cerrado) y que elija
el usuario.

⚠️ **La trampa que se traga mucha gente:** `Google-Extended` **no afecta a tu posición ni a tu
indexación en Google**, solo al entrenamiento de Gemini. El que te borra del buscador es bloquear a
`Googlebot`, que es otro user-agent distinto. Confundirlos es autobloquearse.

⚠️ **Bloquear bots de IA no te saca de las respuestas de IA de Google.** Las AI Overviews y el modo
IA se sirven del índice normal de Búsqueda, así que ahí mandan `Googlebot` y las etiquetas de
fragmento, no `Google-Extended`. Lo que sí las controla está en la fase 13.

Los tokens exactos, quién obedece `robots.txt` y quién no, y dónde publica cada proveedor sus rangos
de IP: `referencias/ia.md`, con la fecha de la última verificación. **Reverificar antes de escribir
un `robots.txt`**, no copiar la tabla a ciegas.

Plantilla: `plantillas/robots.txt`, con las tres posturas comentadas.

## 3. Cimientos que no se negocian

Si algo de esto falla, lo demás sobra:

- **HTTPS en todas las páginas.**
- **Una sola versión canónica del dominio.** O `https://dominio.com` o `https://www.dominio.com`,
  y la otra redirige con un 301. Nunca las dos respondiendo 200. El barrido lo comprueba en el
  primer bloque de su salida.
- **Primero el móvil.** Se indexa la versión móvil: un contenido o un enlace que solo existe en
  escritorio, para el buscador no existe.
- **404 de verdad** para lo que no existe, en vez de redirigir todo a la portada.
- **Que el contenido esté en el HTML.** Si la página lo pinta todo con JavaScript en el cliente,
  comprobar qué ve el bot (Inspección de URLs de Search Console, pestaña de HTML renderizado).
  Ante la duda, renderizado en servidor o pre-render. El barrido da la primera pista: si el HTML
  servido trae cuatro palabras, el texto lo pinta el JavaScript.
- **URLs legibles**, con palabras que una persona reconoce, agrupadas por temas en carpetas.
- **Si la web lleva movimiento, cruza con la skill `frontlaxweb` antes de construirlo.** El
  storytelling al scroll es donde este fallo nace: los textos acaban dentro de componentes que
  solo existen cuando el JavaScript monta y el elemento entra en viewport. Un reveal debe ocultar
  por CSS algo que YA está en el HTML, nunca decidir en JavaScript si el texto existe.

## 4. Página a página: la cabecera

Cada página necesita, como mínimo:

- **`<title>` propio**, con lo importante cerca del principio. Ni repetido entre páginas ni vacío.
- **Meta descripción propia**, que funciona como el anuncio: no posiciona sola, pero decide el clic.
  Google la usa como fuente del fragmento, aunque no siempre literal.
- **Un solo `<h1>`**, y `<h2>`/`<h3>` con jerarquía real.
- **`rel="canonical"`** apuntando a la versión buena cuando el mismo contenido es alcanzable por
  varias URLs (parámetros, filtros, paginación). En una serie paginada, cada página se apunta a sí
  misma.
- **Open Graph** (`og:title`, `og:description`, `og:image`, `og:url`) y Twitter Card. No es SEO,
  es lo que se ve al pegar el enlace en WhatsApp, LinkedIn o Slack, y es lo primero que nota el
  usuario cuando falta.
- **Texto alternativo en las imágenes**, corto y descriptivo, con la imagen colocada cerca del texto
  que habla de ella.
- **`hreflang`** solo si hay URLs separadas por idioma, y entonces con las reglas de la fase 5.

Las etiquetas que controlan qué se puede enseñar de tu página (`max-snippet`, `nosnippet`,
`data-nosnippet`, `max-image-preview`) valen también para las respuestas de IA de Google, y por eso
van en la fase 13 y no aquí.

Plantilla: `plantillas/head-meta.html`.

## 5. Varios idiomas: la barra `/es/` y `hreflang`

Aplica **solo si la web existe en más de un idioma o para más de un país**. Si es de un idioma
solo, saltar la fase entera: un `hreflang` mal puesto hace más daño que no ponerlo.

Lo que no se puede olvidar, en cuatro líneas:

1. **Cada idioma necesita su propia URL.** Lo que se ve en `dominio.com/es/precios` no es magia de
   detección: es que la versión española **es otra página**. La subcarpeta es la opción por defecto;
   el parámetro `?lang=es` Google lo marca como no recomendado.
2. **`hreflang` con las tres reglas**: cada versión se lista a sí misma, los enlaces son de ida y
   vuelta, y hay un `x-default` para quien no encaja en ninguna.
3. **El `canonical` de cada idioma apunta a sí mismo.** Apuntarlo al inglés borra la versión
   española del buscador. Es el error más caro de esta fase.
4. **Nada de redirigir automáticamente por idioma o por país.** Googlebot no manda cabecera
   `Accept-Language` y rastrea sobre todo desde Estados Unidos: si la web redirige a todo el mundo,
   el bot cae siempre en la misma versión y las demás no se indexan nunca.

El detalle completo (estructura de URL, las tres formas de declarar `hreflang`, códigos de idioma,
cómo se sugiere idioma sin redirigir y qué parte cubre la skill `SmartDefaults`) está en
`referencias/multiidioma.md`. Plantilla: `plantillas/multiidioma.html`.

## 6. JSON-LD, traducir la página al idioma de la máquina

Los datos estructurados desbloquean resultados enriquecidos y ayudan a que te entiendan como
entidad. Tipos habituales: `Organization`, `WebSite`, `Article`, `FAQPage`, `Product`,
`LocalBusiness`, `BreadcrumbList`.

Reglas: que el JSON-LD **describa lo que se ve en la página** (marcar lo que no está visible es
motivo de penalización), y pasarlo por la prueba de resultados enriquecidos antes de darlo por
bueno.

⚠️ **No lo vendas como truco de IA.** Google dice por escrito que los datos estructurados **no son
un requisito** para salir en sus funciones de IA generativa, y que no hay un schema especial para
eso. Sirven para los resultados enriquecidos del buscador, que ya es bastante.

Plantilla: `plantillas/jsonld.html`.

## 7. Arquitectura y enlaces internos

Los enlaces internos son gratis, los controlas tú entero, y casi nadie los trabaja.

- **Todo lo importante, a pocos clics de la portada.** Lo que está a siete clics existe para ti y no
  para el buscador.
- **Cero páginas huérfanas.** Una página a la que no apunta ningún enlace interno solo se descubre
  por el sitemap, y eso es una señal muy débil. El sitemap no sustituye a un enlace.
- **Texto de enlace descriptivo.** "Cómo se calcula el IVA" en vez de "aquí" o "leer más": ese texto
  le dice al buscador de qué va la página de destino.
- **Enlaces `<a href>` de verdad**, no botones que navegan por JavaScript. Lo que no es un enlace,
  no se rastrea.
- **Agrupar por temas**: una página principal del tema y las específicas colgando de ella, enlazadas
  en las dos direcciones. Así se construye autoridad sobre un tema en vez de veinte páginas sueltas.
- **Migas de pan** visibles y con `BreadcrumbList`, que además salen en el resultado de búsqueda.
- **Enlazar hacia fuera** cuando aporta contexto, y marcar con `nofollow` lo que no controlas o lo
  que escriben los usuarios.

Cadenas de redirecciones, paginación, filtros de catálogo y presupuesto de rastreo:
`referencias/rendimiento.md`.

## 8. El contenido, que es lo que de verdad posiciona

Lo técnico deja entrar al bot. Lo que decide si sales por encima de otro es esto. Sin esta fase,
el resto es una casa vacía perfectamente señalizada.

**El procedimiento, en orden:**

1. **Sacar las preguntas reales**, no las palabras bonitas. Se parte de las respuestas de la fase 0,
   del buscador interno de la web, de lo que preguntan los clientes por WhatsApp o por correo, y de
   las sugerencias del propio buscador al escribir.
2. **Clasificar por intención** antes de escribir una línea: saber (informativa), comparar, ir a un
   sitio concreto (navegacional) o comprar (transaccional). La misma palabra con otra intención pide
   otra página. Escribir un artículo para una búsqueda de compra es tirar el trabajo.
3. **Una intención, una página.** Dos páginas peleando por lo mismo se roban entre ellas: se
   fusionan en la buena y la otra redirige.
4. **Mirar lo que ya sale primero** en esa búsqueda y responder a la pregunta **mejor**, no más
   largo. Google dice que no hay un número mágico de palabras.
5. **Responder arriba.** La respuesta en las dos o tres primeras frases y el desarrollo debajo. Sirve
   para la persona que tiene prisa y para el asistente que busca la frase que citar.
6. **Firmar y fechar.** Quién lo escribe, con qué experiencia, y cuándo se actualizó de verdad.
   Cambiar solo la fecha para fingir frescura es una de las cosas que Google nombra como abuso.
7. **Revisar lo viejo antes de escribir lo nuevo.** Actualizar la página que ya tiene impresiones
   suele rendir más que publicar otra.

**Lo que Google mira, dicho por Google:** experiencia, especialización, autoridad y confianza
(E-E-A-T), con la confianza como la más importante. No es un factor de posicionamiento que se
active con una etiqueta: es lo que evalúan sus sistemas y sus revisores. Las preguntas de
autoevaluación que publica Google, la regla de "quién, cómo y por qué" y qué considera contenido
hecho para el buscador y no para las personas están en `referencias/contenido.md`.

**Contenido con IA:** se juzga el contenido, no la herramienta. Contenido asistido por IA que aporta
algo está bien; producir páginas en masa para posicionar es **abuso de contenido a escala** y está
en las políticas de spam, la escriba quien la escriba. Y en la UE hay que declarar el contenido
sintético donde corresponda.

## 9. Producto digital: app, herramienta, skill o servicio

Aplica si lo que se vende o se regala es **software**: una aplicación de escritorio, una web de
suscripción, una extensión, una skill, un paquete. Salta esta fase si no lo es.

**El problema del nombre inventado.** Nadie busca tu marca hasta que ya te conoce, así que
posicionar por el nombre el primer día es posicionar por nada. La portada se gana por **categoría y
problema** ("editor de vídeo con IA para DaVinci Resolve"), no por el nombre bonito. El `<title>`
lleva las dos cosas: el nombre y lo que hace.

**Las páginas que traen clientes**, de menos a más intención de compra: casos de uso, comparativa
con quien ya sale primero, "alternativa a X", precios y descarga. Y dos que casi nadie hace y valen
mucho: **documentación indexable** y **changelog con fechas reales**.

⚠️ Generar cien páginas "alternativa a" desde una plantilla, cambiando solo el nombre, es abuso de
contenido a escala y páginas puerta a la vez. Si no tienes nada real que decir de ese competidor, no
hagas esa página.

**Lo que un asistente necesita leer para recomendarte** (si falta, te descarta sin avisar): qué es y
qué problema resuelve en la primera frase, en qué sistema funciona, cuánto cuesta (incluido "gratis"
con esa palabra), si es de código abierto y con qué licencia, qué datos toca y a dónde los manda,
cómo se instala, y quién está detrás.

**Datos estructurados:** `SoftwareApplication` sigue dando resultado enriquecido. Obligatorios
`name`, `offers.price` (con `0` si es gratis) y **o** `aggregateRating` **o** `review`. Nunca
inventar valoraciones: las reseñas falsas, las incentivadas sin declarar y las copiadas de otras
webs están prohibidas por escrito.

**Fuera de tu web es donde busca la gente software**: gestores de paquetes (winget, Microsoft Store,
Homebrew, npm), directorios de alternativas (AlternativeTo, SaaSHub), plataformas de lanzamiento,
GitHub con sus `topics` y sus releases, y el registro oficial del ecosistema al que pertenezcas. Con
el mismo nombre y los mismos datos en todas partes.

Detalle, con la tabla de páginas y la lista de sitios: `referencias/producto-digital.md`.
Esqueleto de la página, bloque a bloque: `plantillas/pagina-producto.md`.

## 10. Velocidad y experiencia de página

Google mide la experiencia con las **Core Web Vitals**, y las mide con datos de visitantes reales,
no con una simulación. Son tres: **LCP** (cuánto tarda en pintarse lo grande), **INP** (cuánto tarda
en responder al tocar) y **CLS** (cuánto se mueve todo mientras carga). **Los umbrales exactos se
miran en el momento en PageSpeed Insights**, no se recitan de memoria (regla 0).

Lo que casi siempre las arregla, por orden de efecto:

1. **Imágenes**: tamaño correcto, formato moderno, `width` y `height` puestos para que nada salte.
2. **Tipografías**: precargadas y con `font-display`, o el texto aparece tarde.
3. **JavaScript**: menos, y el que no hace falta al principio, que cargue después.
4. **Servidor y caché**: un TTFB alto se lo come todo lo demás.
5. **Nada que se mueva de sitio** después de cargar: avisos, banners de cookies y anuncios con su
   espacio reservado.

⚠️ La velocidad **no te saca del pozo si el contenido no responde a la búsqueda**, pero sí decide
entre dos páginas parecidas, y decide cuánta gente se queda. Detalle en `referencias/rendimiento.md`.

## 11. Negocio local, si atiende clientes en un sitio o en una zona

Salta esta fase si la web no vende en una zona concreta. Si sí, es lo que más mueve la aguja, por
encima de casi todo lo anterior.

Google dice que el resultado local se decide por **relevancia, distancia y popularidad**. La
distancia no se toca; las otras dos sí:

- **Perfil de empresa de Google verificado y completo**: categoría correcta, dirección, horario de
  verdad (festivos incluidos), teléfono, servicios, fotos.
- **El mismo nombre, dirección y teléfono en todas partes**, empezando por la web. Las variantes
  confunden.
- **Reseñas, y respuestas a las reseñas.** Google dice por escrito que las reseñas positivas y las
  respuestas útiles ayudan a destacar.
- **Una página por servicio o por zona con contenido propio**, no la misma página con el nombre de
  la ciudad cambiado, que es exactamente lo que Google llama páginas puerta.
- **`LocalBusiness` en JSON-LD** con los mismos datos que el perfil.

⚠️ **No se puede pagar por salir mejor en los resultados locales**, y Google lo dice con esas
palabras. Quien lo venda, miente. Detalle en `referencias/local.md`.

## 12. Darse de alta y avisar de los cambios

- **Google Search Console.** Dos formas de dar de alta un sitio: **propiedad de dominio**, que se
  verifica con un registro TXT del DNS y cubre todos los subdominios y los dos protocolos, o
  **prefijo de URL**, que verifica solo esa dirección y admite archivo HTML, etiqueta, Analytics o
  Tag Manager. Para una web propia, la de dominio es la buena. Ahí se sube el sitemap, se vigila el
  informe de páginas y se usa Inspección de URLs al publicar o arreglar algo.
- **Bing Webmaster Tools:** la segunda opinión, y la puerta a **IndexNow**. Importa más de lo que
  parece: los asistentes que responden citando webs no se apoyan solo en el índice de Google.
- **IndexNow** se monta una vez: una clave hexadecimal servida en un `.txt` en la raíz y un aviso
  por HTTP en cada publicación. Admite hasta 10.000 URLs por envío, y un 200 significa "recibido",
  no "indexado". **Google no participa**, así que complementa a Search Console, no la sustituye.
  Formato exacto en `indexnow.org/documentation`.
- **Sitemap XML** con las URLs indexables. No meter en el sitemap lo que lleva `noindex` ni lo
  redirigido: son señales contradictorias. Si el sitio es grande, un índice de sitemaps.

⚠️ **El favicon en los resultados va por su cuenta, aparte del resto del rastreo.** Es fácil
comprobar que `favicon.ico` se sirve bien, está indexado y aun así Google sigue enseñando un icono
viejo en el buscador. No es un fallo del sitio: Google lo cachea aparte y su documentación dice que
el rastreo "puede tardar de varios días a varias semanas" sin dar un plazo fijo. No hay botón para
forzarlo, solo **Inspección de URLs y Solicitar indexación** de la portada.

Plantilla: `plantillas/sitemap.xml`.

## 13. Que te encuentren y te citen las IA

Aquí hay dos cosas distintas que se confunden todo el rato: **las funciones de IA de Google**
(AI Overviews y modo IA) y **los asistentes que navegan** (ChatGPT, Claude, Perplexity).

**Las de Google.** Google publicó su guía oficial el 15 de mayo de 2026 y es tajante: no hay un
algoritmo aparte, sus funciones de IA se apoyan en los mismos sistemas de posicionamiento y calidad
de la Búsqueda. De ahí salen tres consecuencias:

- **Para que te citen, primero hay que estar indexado** y poder mostrar fragmento. Una página
  bloqueada no se cita.
- **No hace falta ningún archivo especial.** Google dice literalmente que no necesitas crear
  archivos legibles por máquina, archivos de IA, marcado ni Markdown para aparecer.
- **Lo que sí controla lo que pueden usar de tu página** son las etiquetas de fragmento:
  `nosnippet`, `max-snippet`, `data-nosnippet` y `max-image-preview`. Limitar el fragmento limita
  también lo que las AI Overviews pueden usar de tu página. Es un cuchillo de doble filo: menos
  fragmento es menos presencia.

**Los asistentes que navegan.** Ahí manda la fase 2 (que sus bots de búsqueda puedan entrar) y el
formato del contenido: responder arriba, tablas para comparar, listas para procesos, preguntas
frecuentes reales, y datos con su fuente. No es un truco distinto del de la fase 8: es la fase 8
bien hecha.

**`llms.txt`:** propuesta de la comunidad, **no un estándar adoptado**. Google ha dicho por escrito
que no lo usa. Cuesta diez minutos y no hace daño, así que se puede poner, pero no se cuenta como
canal ni se vende como tal. Plantilla: `plantillas/llms.txt`.

Cómo se mide todo esto, incluido el informe de IA generativa de Search Console y el interruptor para
quedarse fuera de las funciones de IA: `referencias/ia.md`.

## 14. Medir, que es donde acaba el trabajo

Ninguna tarea anterior está terminada hasta que se ve el efecto:

- **Search Console:** páginas indexadas frente a enviadas y los motivos de exclusión; y en el
  informe de rendimiento, impresiones, clics, posición media y consultas. La comparación de dos
  periodos vale más que la foto de un día.
- **Las consultas donde ya sales en posición baja** son la lista de trabajo más rentable que existe:
  ya te ve el buscador, solo falta merecer más.
- **PageSpeed Insights** para Core Web Vitals, con datos de campo si los hay.
- **Los logs del servidor:** qué bots entran de verdad. Más fiable que cualquier panel.
- **Las preguntas clave a los asistentes, a mano, una vez al mes:** apuntar si te citan y junto a
  quién. Ese registro sigue siendo el informe de posiciones en IA más honesto que hay.
- **Analytics:** las visitas desde `chatgpt.com` o `perplexity.ai` son pocas y con muchísima
  intención.

**Y se anota la fecha.** Un informe sin fecha no sirve para comparar dentro de dos meses, que es
justo para lo que se hace.

## Enlaces entrantes: lo único que no tiene atajo

Que otros te enlacen sigue contando, y es la parte donde más dinero se pierde. Lo que hay que saber
para no hacer daño:

- **Comprar o intercambiar enlaces para posicionar es spam de enlaces** en las políticas de Google,
  y eso incluye los intercambios excesivos y los enlaces generados en masa. El riesgo no es que no
  funcione: es una acción manual sobre el sitio.
- **Lo que sí funciona** es lento y aburrido: publicar algo que alguien quiera citar, aparecer donde
  ya está tu público (medios del sector, directorios legítimos, colaboraciones, comunidades), y que
  el nombre de la marca se mencione aunque no lleve enlace.
- **Perseguir menciones artificiales de marca para colarse en las IA** tampoco funciona: Google lo
  nombra como estrategia inefectiva en su propia guía de IA generativa.
- **El sitio propio también da enlaces**: la fase 7 es la parte de esto que sí controlas al 100%.

Si el usuario pide una campaña de enlaces, se le dice esto y se le ofrece lo que sí se puede hacer
desde el código y el contenido.

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
   indexan nunca (fase 5).
8. **Páginas huérfanas**: existen, están bien hechas y no las enlaza nadie desde dentro (fase 7).
9. **Indexada pero sin motivo para salir**: el caso más común en webs correctas. No es un fallo
   técnico, es la fase 8.

## Lo que hunde una web entera

Las políticas de spam de Google no son consejos: se aplican con acciones manuales. Las que aparecen
en encargos normales, sin querer:

- **Contenido a escala**: muchas páginas generadas para posicionar y no para ayudar. Da igual si las
  escribe una persona o un modelo.
- **Páginas puerta**: la misma página repetida cambiando la ciudad o la palabra clave.
- **Texto oculto**, relleno de palabras clave y listas de ciudades al pie.
- **Cloaking**: enseñar al bot algo distinto de lo que ve la persona. Ojo con las "optimizaciones"
  que detectan al bot por user-agent.
- **Abuso de la reputación del sitio**: alquilar una sección del dominio a terceros para que
  aprovechen tu autoridad.
- **Afiliación fina**: fichas de producto copiadas del fabricante sin aportar nada.

La lista completa y las definiciones exactas: `referencias/contenido.md`.

## Los consejos que más rinden

Si solo hay tiempo para unas pocas cosas, estas. Están ordenadas por lo que devuelven frente a lo
que cuestan, no por lo bonitas que suenan.

1. **Empieza por lo que ya está en la página dos.** En Search Console, las consultas con posición
   entre 8 y 20 son las que menos trabajo necesitan para dar visitas: el buscador ya te considera,
   solo hay que merecer un poco más. Publicar una página nueva tarda meses; mejorar esa, días.
2. **Actualiza antes de publicar.** La página que ya tiene impresiones rinde más retocada que una
   nueva desde cero. Y quien actualiza, además, mantiene lo que ya funciona.
3. **Un título es un anuncio, no una etiqueta.** Escribe lo que la persona gana, no el nombre
   interno del producto. El nombre solo lo busca quien ya te conoce.
4. **Responde en las tres primeras frases.** Es lo que se lleva el fragmento destacado, lo que cita
   un asistente y lo que lee quien tiene prisa. El desarrollo va debajo, no delante.
5. **Enlaza desde tus páginas fuertes a las que quieres subir.** Un enlace interno desde la página
   que ya tiene visitas vale más que diez enlaces desde el pie.
6. **Publica el precio en texto.** Escondido tras un formulario, no lo indexa nadie, no lo cita
   ninguna IA y la mitad de la gente se va a buscarlo a un comparador.
7. **Menos páginas y mejores.** Diez páginas que responden ganan a cien que rellenan, porque la
   calidad se evalúa a nivel de sitio: lo flojo arrastra a lo bueno.
8. **Comprueba lo que ve el bot, no lo que ves tú.** `curl` a la página o Inspección de URLs. Es la
   diferencia entre creer que tienes contenido y tenerlo.
9. **Firma, fecha y cuenta cómo lo has hecho.** Es lo más barato que existe para demostrar
   experiencia, y es literalmente lo que Google pide con su "quién, cómo y por qué".
10. **Convierte lo que te preguntan en páginas.** Las dudas que llegan por correo o por WhatsApp son
    búsquedas reales escritas por tu cliente. Nadie tiene esa lista salvo tú.
11. **Avisa cuando publiques.** Sitemap actualizado, IndexNow para los que participan, y una
    inspección de URL en Search Console si es importante. Esperar al rastreo es perder semanas.
12. **Si tiene vídeo, pon la transcripción.** El texto se indexa, el vídeo no. Y de paso la página
    responde a preguntas que el vídeo contesta hablando.
13. **Repite las mismas mediciones cada mes, con fecha.** Un número suelto no dice nada; dos números
    con un mes de diferencia dicen si el trabajo sirvió.
14. **No toques cinco cosas a la vez si quieres saber cuál funcionó.** En una web pequeña, un cambio
    grande por vez es lo único que se puede atribuir.

## Checklist

Se responde con el estado (`YA ESTÁ`, `FALTA`, `MAL PUESTO`, `NO APLICA`), nunca con un sí a secas.

**Fase 0, antes de nada**

- [ ] ¿Barrido lanzado contra el dominio real y su salida pegada en la hoja de estado?
- [ ] ¿Preguntas hechas de una vez, sin preguntar nada que el barrido ya contestara?
- [ ] ¿`SEO-ESTADO.md` escrito, con fecha y con quién arregla cada cosa?

**Que puedan entrar**

- [ ] ¿`robots.txt` revisado, sin bloquear nada que deba indexarse, y sin cerrar CSS ni JavaScript?
- [ ] ¿Decisión de bots de IA tomada **por el usuario**, con los dos grupos explicados?
- [ ] ¿Ninguna página lleva `noindex` sin querer (HTML y cabecera `X-Robots-Tag`)?
- [ ] ¿Una sola versión canónica del dominio, con 301 desde la otra?
- [ ] ¿Contenido visible en el HTML servido, no solo tras ejecutar JavaScript?

**Que entiendan qué es cada página**

- [ ] ¿Cada página con `<title>` y meta descripción propios, y un solo `<h1>`?
- [ ] ¿`rel="canonical"` correcto en las páginas con parámetros o duplicados?
- [ ] ¿Open Graph completo y con imagen, comprobado pegando el enlace en un chat de verdad?
- [ ] Si hay varios idiomas: ¿URL propia por idioma, `hreflang` con autorreferencia y enlaces de
      vuelta, `x-default`, canonical a sí mismo y ninguna redirección automática?
- [ ] ¿JSON-LD validado y describiendo lo que se ve en la página?
- [ ] ¿Todo lo importante a pocos clics, sin páginas huérfanas y con texto de enlace descriptivo?

**Que merezca la pena**

- [ ] ¿Cada página responde a una intención de búsqueda concreta, y no hay dos peleando por la misma?
- [ ] ¿La respuesta está arriba, en las primeras frases?
- [ ] ¿Autor, experiencia y fecha real de actualización visibles?
- [ ] ¿Core Web Vitals medidos en PageSpeed con datos de campo?
- [ ] Si es producto digital: ¿la portada se gana por categoría y problema, y no solo por el nombre?
- [ ] Si es producto digital: ¿precio, sistema, licencia e instalación en texto, dentro del HTML?
- [ ] Si es producto digital: ¿está listado donde se busca software (gestor de paquetes, directorios,
      GitHub, el registro de su ecosistema) con los mismos datos?
- [ ] Si es negocio local: ¿perfil verificado y completo, datos coherentes y reseñas atendidas?

**Que se sepa y se compruebe**

- [ ] ¿Sitemap generado, sin URLs `noindex` ni redirigidas, y enlazado desde `robots.txt`?
- [ ] ¿Sitemap enviado en Search Console y en Bing Webmaster Tools?
- [ ] ¿Medido en Search Console y PageSpeed, con la fecha de la comprobación anotada?
- [ ] ¿Fecha de la próxima revisión puesta, con lo que se espera ver?

## Lo que esta skill no cubre

Se dice de frente en vez de improvisar:

- **Escribir el contenido.** Dice qué hace falta y cómo se estructura; la redacción es otro encargo.
- **Publicidad de pago.** Aquí no se compra tráfico.
- **Reputación de correo y entregabilidad** (SPF, DKIM, DMARC, listas de bloqueo). Es otro
  territorio, con sus propias reglas. Para mirarlo por su cuenta están Spamhaus y MXToolbox Email
  Health, los dos en vibeset.dev/resources.
- **Auditorías de sitios enormes** (cientos de miles de URLs) con análisis de logs y rastreo
  completo: hace falta herramienta de pago y es un encargo aparte. Lo que sí se puede hacer sin ella
  está en `referencias/rendimiento.md`.

## Índice de recursos

**Plantillas** (se copian y se adaptan):

- `plantillas/inventario.sh`, el barrido de la fase 0.
- `plantillas/SEO-ESTADO.md`, la hoja de estado con las tres columnas.
- `plantillas/robots.txt`, comentado, con las tres posturas de IA para elegir.
- `plantillas/head-meta.html`, la cabecera completa: title, descripción, canonical, Open Graph,
  Twitter Card y hreflang.
- `plantillas/jsonld.html`, bloques listos para `Organization`, `WebSite`, `Article`, `FAQPage`,
  `BreadcrumbList`, `LocalBusiness`, `SoftwareApplication` y `VideoObject`.
- `plantillas/multiidioma.html`, las tres formas de declarar `hreflang` más el aviso que sugiere
  idioma sin redirigir.
- `plantillas/pagina-producto.md`, el esqueleto de una página de producto digital, bloque a
  bloque, con lo que responde cada uno.
- `plantillas/sitemap.xml`, ejemplo mínimo con índice de sitemaps.
- `plantillas/llms.txt`, con la advertencia de qué es y qué no es.

**Referencias** (se leen cuando toca esa fase, no antes):

- `referencias/contenido.md`, intención de búsqueda, E-E-A-T, las preguntas de autoevaluación de
  Google y la lista completa de políticas de spam.
- `referencias/rendimiento.md`, Core Web Vitals, JavaScript, presupuesto de rastreo, redirecciones,
  paginación y filtros de catálogo.
- `referencias/ia.md`, los bots uno a uno con su fecha de verificación, la guía oficial de Google
  para funciones de IA generativa y cómo se mide.
- `referencias/producto-digital.md`, las páginas que traen clientes de una app o una skill, los
  datos estructurados de software y los directorios donde se busca software de verdad.
- `referencias/multiidioma.md`, el detalle de la fase 5.
- `referencias/local.md`, negocio local y perfil de empresa.
- `referencias/recursos.md`, dónde aprender esto de verdad: documentación oficial, cursos gratuitos
  y las herramientas que se usan en cada fase.

