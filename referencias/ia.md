# Referencia: bots de IA, funciones de IA de Google y cómo se mide

Detalle de las fases 2 y 13 del `SKILL.md`.

⚠️ **Esta tabla caduca.** Los proveedores añaden bots cada pocos meses y cambian de nombre. Antes de
escribir un `robots.txt`, abrir las páginas de la última columna y confirmar. La fecha de cada fila
es la de la última comprobación real, no la de "cuando se escribió esto".

## 1. Los bots, uno a uno

| User-agent | Quién | Para qué | ¿Obedece `robots.txt`? | Verificado | Dónde se comprueba |
|---|---|---|---|---|---|
| `GPTBot` | OpenAI | Entrenamiento de modelos | Sí | 2026-11-18 | `developers.openai.com/api/docs/bots` |
| `OAI-SearchBot` | OpenAI | Índice de búsqueda de ChatGPT | Sí | 2026-11-18 | igual |
| `ChatGPT-User` | OpenAI | Visita en directo pedida por una persona | **Puede no aplicarle** | 2026-11-18 | igual |
| `OAI-AdsBot` | OpenAI | Comprobar páginas de destino de anuncios. No entrena modelos | **Su documentación no lo dice** | 2026-11-18 | igual |
| `ClaudeBot` | Anthropic | Entrenamiento | Sí | 2026-11-18 | `support.claude.com`, artículo de rastreo |
| `Claude-SearchBot` | Anthropic | Mejorar los resultados de búsqueda | Sí | 2026-11-18 | igual |
| `Claude-User` | Anthropic | Visita pedida por una persona en Claude | Sí | 2026-11-18 | igual |
| `Claude-Agent` | Anthropic | Navegador alojado que hace una tarea pedida por una persona. No es un rastreador | **No va por `robots.txt`**: se identifica por user-agent e IP | 2026-11-18 | `support.claude.com`, artículo de navegadores alojados |
| `PerplexityBot` | Perplexity | Índice para enlazar webs en sus respuestas. No entrena modelos | Sí | 2026-11-18 | `docs.perplexity.ai/guides/bots` |
| `Perplexity-User` | Perplexity | Visita pedida por una persona | **No, lo ignora** | 2026-11-18 | igual |
| `Googlebot` | Google | Índice de Búsqueda. **El que te borra si lo bloqueas** | Sí | 2026-11-18 | `developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers` |
| `Google-Extended` | Google | Token de control, no un rastreador: entrenamiento de futuros modelos Gemini y grounding en las apps de Gemini y en Vertex AI. **No afecta a la Búsqueda** | Sí | 2026-11-18 | igual |
| `GoogleOther` | Google | Rastreo genérico de otros equipos de Google | Sí | 2026-11-18 | igual |
| `Google-CloudVertexBot` | Google | Para quien construye agentes con Vertex AI | Sí | 2026-11-18 | igual |
| `Google-Agent` | Google | Agentes de Google que visitan una web por encargo de una persona | **Por lo general no**: es un fetcher activado por el usuario | 2026-11-18 | `developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers` |
| `CCBot` | Common Crawl | Archivo público que luego usan muchos modelos | Sí | 2026-11-18 | `commoncrawl.org/ccbot` |
| `Bytespider` | ByteDance | Entrenamiento | **Sin confirmar**: no hay página oficial localizada, y terceros publican que no siempre obedece | 2026-11-18 | Sin fuente primaria |
| `Applebot-Extended` | Apple | No rastrea: decide si lo que recoge `Applebot` puede entrenar los modelos de Apple. No saca de Siri ni de Spotlight | Sí | 2026-11-18 | `support.apple.com/en-us/119829` |
| `meta-externalagent` | Meta | Entrenamiento de modelos e indexación directa para sus productos | Sí, se bloquea con `Disallow` | 2026-11-18 | `developers.facebook.com/docs/sharing/webmasters/web-crawlers` |
| `meta-webindexer` | Meta | Mejorar los resultados de búsqueda de Meta AI y poder citarte | **Su documentación no lo dice** | 2026-11-18 | igual |
| `meta-externalfetcher` | Meta | Visita pedida por una persona o por un agente | **Puede saltárselo** | 2026-11-18 | igual |
| `meta-externalads` | Meta | Publicidad y productos de empresa | **Su documentación no lo dice** | 2026-11-18 | igual |
| `Amazonbot` | Amazon | Mejorar sus productos. **Puede entrenar sus modelos de IA** | Sí | 2026-11-18 | `developer.amazon.com/amazonbot` |
| `Amzn-SearchBot` | Amazon | Búsqueda en sus productos, como Alexa. No entrena modelos | Sí. Si no se le nombra, sigue las reglas de los demás buscadores | 2026-11-18 | igual |
| `Amzn-User` | Amazon | Visita en directo por una acción de una persona. No entrena modelos | **Puede no seguirlo entero** | 2026-11-18 | igual |

**Rangos de IP publicados** (para comprobar en los logs si el bot era el de verdad o alguien
poniéndose su nombre):

- OpenAI: `openai.com/gptbot.json`, `openai.com/searchbot.json`, `openai.com/chatgpt-user.json`,
  `openai.com/adsbot.json`.
- Anthropic: `claude.com/crawling/bots.json`.
- Perplexity: `www.perplexity.ai/perplexitybot.json`, `www.perplexity.ai/perplexity-user.json`.
- Google: DNS inverso, o sus listas `developers.google.com/static/search/apis/ipranges/googlebot.json`,
  `developers.google.com/static/crawling/ipranges/common-crawlers.json` y
  `developers.google.com/static/crawling/ipranges/user-triggered-fetchers.json`.
- Common Crawl: `index.commoncrawl.org/ccbot.json`.
- Amazon: `developer.amazon.com/amazonbot/ip-addresses/`, `.../searchbot-ip-addresses/` y
  `.../live-ip-addresses/`.
- `Claude-Agent`: `claude.com/.well-known/sail`.

Bloquear por IP es mala idea: si el bot no puede leer tu `robots.txt`, tampoco puede obedecerlo.

## 2. Las tres posturas

| Postura | Qué hace | Para quién |
|---|---|---|
| **Todo abierto** | No se bloquea nada | Quien quiere alcance máximo y no le importa el entrenamiento |
| **Mixta** (la de la casa) | Fuera entrenamiento, dentro búsqueda y respuesta | Quien quiere que le citen sin regalar el archivo |
| **Todo cerrado** | Fuera todos los bots de IA | Contenido de pago o con licencia, medios, obra propia |

La decisión es del dueño de la web. El agente propone y explica las consecuencias; no elige.

**Señal nueva de preferencia, todavía en borrador.** Desde el 30 de octubre de 2026 Anthropic dice que
empieza a reconocer una señal legible por máquina para decir «no al entrenamiento», basada en el trabajo
del grupo `aipref` del IETF, y que la irá aplicando poco a poco. Si `robots.txt` nombra a `ClaudeBot`,
manda esa regla sobre la señal general. No es un estándar cerrado: para decidir hoy, se escribe la regla
con el nombre del bot.

Y avisa de lo que `robots.txt` no puede: los raspadores no lo leen, y los bots de visita en directo
de OpenAI, Perplexity, Google, Meta y Amazon pueden ignorarlo porque la petición nace de una persona. Si el objetivo es que
un contenido no salga de ahí, la herramienta es una contraseña, no un archivo de texto.

## 3. Las funciones de IA de Google

Google publicó su guía oficial el **15 de mayo de 2026**
(`developers.google.com/search/docs/fundamentals/ai-optimization-guide`, verificada el 2026-11-18).
Lo que dice, con sus palabras:

- **No hay algoritmo aparte.** "Las prácticas recomendadas de SEO siguen siendo relevantes porque
  nuestras funciones de IA generativa en la Búsqueda se apoyan en nuestros sistemas principales de
  posicionamiento y calidad."
- **Requisito de entrada:** para poder salir, la página tiene que estar **indexada** y poder mostrar
  **fragmento**, cumpliendo los requisitos técnicos de la Búsqueda.
- **No hace falta ningún archivo especial:** "No necesitas crear nuevos archivos legibles por
  máquina, archivos de IA, marcado ni Markdown para aparecer en la Búsqueda de Google."
- **Los datos estructurados no son un requisito**, y no hay un schema especial para IA.
- **No hace falta trocear el contenido** en pedacitos ni escribir de una forma especial.
- **Perseguir menciones artificiales de marca no es una estrategia efectiva.**
- **Lo que sí influye a largo plazo**: contenido único, útil y con un punto de vista propio. "No
  recicles lo que otros ya han dicho en internet, ni lo que un modelo generativo podría producir sin
  esfuerzo."
- **Experiencia de página**: que se vea bien en cualquier dispositivo, que responda rápido y que se
  distinga el contenido principal del resto.

Traducción práctica: **AEO y GEO, hechos bien, son SEO**. Quien venda otra cosa está vendiendo humo.

## 4. Controlar qué pueden usar de tu página

Estas etiquetas valen para el fragmento del buscador **y para lo que las funciones de IA pueden usar
como entrada directa**:

| Etiqueta | Qué hace |
|---|---|
| `nosnippet` | Ni fragmento ni vista previa de vídeo, en ningún sitio |
| `max-snippet:[n]` | Limita el fragmento a n caracteres. `0` equivale a `nosnippet`, `-1` deja a Google elegir |
| `data-nosnippet` | Marca un trozo concreto (`span`, `div`, `section`) para que no se use |
| `max-image-preview:[none/standard/large]` | Tamaño máximo de la vista previa de imagen |
| `noindex` | Fuera del índice, y por tanto fuera de todo lo demás |

⚠️ **Cortar el fragmento corta también la presencia.** Menos fragmento es menos superficie donde
aparecer, en el buscador y en las respuestas de IA. Se hace con un motivo, no por si acaso.

⚠️ **Si la página está bloqueada en `robots.txt`, estas etiquetas no se leen.** El bot no entra, no
las ve, y no las aplica.

## 5. Medir

- **Informe de rendimiento de IA generativa en Search Console.** Google lo anunció en junio de 2026 y
  su propia guía remite a él para medir cómo va el contenido en las funciones de IA. En el momento de
  escribir esto no está en todas las propiedades ni trae todas las métricas: **se abre Search Console
  y se mira qué hay en la propiedad del usuario**, no se promete lo que no se ve.
- **Interruptor para quedarse fuera de las funciones de IA.** Google introdujo un control para
  excluir el contenido de sus funciones de IA sin perder posición orgánica. Antes de recomendarlo,
  comprobar si está disponible en esa cuenta, y avisar de que salir de ahí es salir de donde hoy mira
  la gente.
- **A mano, una vez al mes:** las cinco preguntas que llevarían a un cliente hasta ti, hechas a
  ChatGPT, Claude, Perplexity y al modo IA de Google. Se apunta si te citan, con qué frase y junto a
  quién. Es el informe de posiciones en IA más honesto que existe hoy.
- **Analytics:** las visitas que llegan desde `chatgpt.com`, `perplexity.ai` o `claude.ai` son pocas
  y con muchísima intención. Merecen su propio segmento.
- **Los logs del servidor:** quién entra de verdad, con qué frecuencia y a qué páginas. Cruzar con
  los rangos de IP del punto 1 para descartar a los que se ponen el nombre de otro.

## 6. `llms.txt`

Propuesta de la comunidad para dar a los modelos un índice del sitio en Markdown. **No es un
estándar adoptado**: Google ha dicho públicamente que no lo usa, y su guía de IA repite que no hacen
falta archivos especiales. Cuesta diez minutos, no hace daño y algún cliente lo pedirá por haberlo
leído en LinkedIn. Se puede poner, pero no se cuenta como canal ni se factura como tal.

Plantilla: `plantillas/llms.txt`.
