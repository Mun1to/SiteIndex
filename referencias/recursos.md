# Referencia: dónde se aprende esto y con qué se trabaja

Todas las direcciones se comprobaron el **2026-08-25**: respondían. Si alguna falla, se busca el
título, no se inventa una ruta parecida.

## 1. La fuente, que manda sobre todas las demás

Cuando una guía de un blog contradiga a esta lista, gana esta lista.

| Qué | Dónde |
|---|---|
| Fundamentos y requisitos técnicos de Google | `developers.google.com/search/docs/essentials` |
| Guía de inicio de SEO (la oficial, corta y sin humo) | `developers.google.com/search/docs/fundamentals/seo-starter-guide` |
| Crear contenido útil, E-E-A-T y las preguntas de autoevaluación | `developers.google.com/search/docs/fundamentals/creating-helpful-content` |
| Optimizar para las funciones de IA generativa de Google (15-mayo-2026) | `developers.google.com/search/docs/fundamentals/ai-optimization-guide` |
| Políticas de spam | `developers.google.com/search/docs/essentials/spam-policies` |
| Rastreadores de Google, uno a uno | `developers.google.com/search/docs/crawling-indexing/google-common-crawlers` |
| Etiquetas `robots` y `X-Robots-Tag` | `developers.google.com/search/docs/crawling-indexing/robots-meta-tag` |
| Presupuesto de rastreo para sitios grandes | `developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget` |
| Webs en varios idiomas | `developers.google.com/search/docs/specialty/international` |
| Galería de resultados enriquecidos (qué schema da qué) | `developers.google.com/search/docs/appearance/structured-data/search-gallery` |
| Novedades de la documentación, por fecha | `developers.google.com/search/updates` |
| Vocabulario de datos estructurados | `schema.org/docs/gs.html` |
| Core Web Vitals y rendimiento web | `web.dev/learn/performance` |
| Datos reales de Chrome (CrUX) | `developer.chrome.com/docs/crux` |
| IndexNow, protocolo y formato | `indexnow.org/documentation` |
| Bing Webmaster Tools | `bing.com/webmasters/about` |
| Posicionamiento local, por Google | `support.google.com/business/answer/7091` |

**Podcast y vídeo oficiales**, que es donde Google explica el porqué:
`developers.google.com/search/podcasts/search-off-the-record` y el canal
`youtube.com/@GoogleSearchCentral`.

## 2. Cursos gratuitos que sirven

Ordenados por lo que aportan a alguien que empieza. Todos gratis en el momento de comprobarlos.

| Curso | Dónde | Para qué sirve de verdad |
|---|---|---|
| **Guía de inicio de Google** | La de la tabla de arriba | Lo esencial sin marketing. Se lee en una tarde |
| **Ahrefs Academy** | `ahrefs.com/academy` | El curso de SEO más práctico y corto que hay gratis |
| **Moz, guía para principiantes** | `moz.com/beginners-guide-to-seo` y `moz.com/learn/seo` | El manual clásico. Bien para entender el vocabulario |
| **Semrush Academy** | `academy.semrush.com` | Cursos por tema, con certificado. Muy orientado a su herramienta |
| **HubSpot, certificación de SEO** | `academy.hubspot.com/courses/seo-training` | Enfoque de contenido y embudo, no técnico |
| **Yoast Academy** | `yoast.com/academy/` | Para quien trabaja sobre WordPress |
| **web.dev, Learn Performance** | `web.dev/learn/performance` | La fase 10 explicada por los que definen las métricas |

**Blogs que sí aportan**, para estar al día sin tragar humo: `ahrefs.com/blog`, `yoast.com/seo-blog`,
`searchengineland.com/library/seo` y `searchenginejournal.com/category/seo`. Se leen sabiendo que
venden herramienta: lo que digan de números, se contrasta con la fuente oficial.

⚠️ **La mitad de lo que se publica sobre SEO está desactualizado o es promoción.** Regla práctica:
si una guía habla de FID, de `rel=prev/next` o de la densidad de palabras clave, está caducada.

## 3. Herramientas por fase

| Fase | Herramienta | Gratis |
|---|---|---|
| 0, inventario | `plantillas/inventario.sh` de esta skill, y `curl` | Sí |
| 0, inventario | Ahrefs Webmaster Tools (`ahrefs.com/webmaster-tools`), auditoría del sitio propio | Sí, verificando la propiedad |
| 0, inventario | Screaming Frog (`screamingfrog.co.uk/seo-spider`) | Hasta 500 URLs |
| 1 y 4, rastreo | Search Console: Inspección de URLs, informe de páginas, sitemaps | Sí |
| 4, alta | Bing Webmaster Tools, con IndexNow dentro | Sí |
| 7, JSON-LD | Prueba de resultados enriquecidos (`search.google.com/test/rich-results`) | Sí |
| 7, JSON-LD | Validador de Schema (`validator.schema.org`) | Sí |
| 8, contenido | Google Trends (`trends.google.com`), interés y estacionalidad | Sí |
| 8, contenido | Planificador de palabras clave de Google Ads | Sí, con cuenta de Ads |
| 10, velocidad | PageSpeed Insights (`pagespeed.web.dev`) y Lighthouse | Sí |
| 12, local | Perfil de Empresa de Google | Sí |
| 13, medir | Search Console, informe de rendimiento, comparando periodos | Sí |

**Lo que no hace falta pagar al principio:** con Search Console, Bing Webmaster Tools, PageSpeed y el
barrido de esta skill se cubre casi todo lo que un sitio pequeño necesita. Las herramientas de pago
(Ahrefs, Semrush, Sitebulb) empiezan a valer la pena cuando hay que investigar competencia y enlaces
a escala, no antes.

## 4. Cómo leer un dato de SEO sin tragárselo

1. **¿Quién lo dice?** Google sobre Google es fuente primaria. Una agencia sobre Google es opinión
   informada. Un artículo escrito para posicionar por "SEO 2026" es marketing.
2. **¿De cuándo es?** Sin fecha visible, se descarta.
3. **¿Trae un número?** Los números caducan (regla 0 del `SKILL.md`): se comprueban en la fuente
   antes de repetirlos.
4. **¿Se puede medir?** Si una recomendación no se puede comprobar en Search Console o en el
   servidor, no entra en el plan.
