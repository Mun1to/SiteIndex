# Referencia: bots de IA, funciones de IA de Google y cómo se mide

Detalle de las fases 2 y 13 del `SKILL.md`.

⚠️ **Esta tabla caduca.** Los proveedores añaden bots cada pocos meses y cambian de nombre. Antes de
escribir un `robots.txt`, abrir las páginas de la última columna y confirmar. La fecha de cada fila
es la de la última comprobación real, no la de "cuando se escribió esto".

## 1. Los bots, uno a uno

| User-agent | Quién | Para qué | ¿Obedece `robots.txt`? | Verificado | Dónde se comprueba |
|---|---|---|---|---|---|
| `GPTBot` | OpenAI | Entrenamiento de modelos | Sí | 2026-08-25 | `developers.openai.com/api/docs/bots` |
| `OAI-SearchBot` | OpenAI | Índice de búsqueda de ChatGPT | Sí | 2026-08-25 | igual |
| `ChatGPT-User` | OpenAI | Visita en directo pedida por una persona | **Puede no aplicarle** | 2026-08-25 | igual |
| `OAI-AdsBot` | OpenAI | Comprobar páginas de destino de anuncios. No entrena modelos | **Su documentación no lo dice** | 2026-08-25 | igual |
| `ClaudeBot` | Anthropic | Entrenamiento | Sí | 2026-08-25 | `support.claude.com`, artículo de rastreo |
| `Claude-SearchBot` | Anthropic | Mejorar los resultados de búsqueda | Sí | 2026-08-25 | igual |
| `Claude-User` | Anthropic | Visita pedida por una persona en Claude | Sí | 2026-08-25 | igual |
| `PerplexityBot` | Perplexity | Índice para enlazar webs en sus respuestas | Sí | 2026-08-25 | `docs.perplexity.ai/guides/bots` |
| `Perplexity-User` | Perplexity | Visita pedida por una persona | **No, lo ignora** | 2026-08-25 | igual |
| `Googlebot` | Google | Índice de Búsqueda. **El que te borra si lo bloqueas** | Sí | 2026-08-25 | `developers.google.com/search/docs/crawling-indexing/google-common-crawlers` |
| `Google-Extended` | Google | Solo entrenamiento de Gemini. **No afecta a la Búsqueda** | Sí | 2026-08-25 | igual |
| `GoogleOther` | Google | Rastreo genérico de otros equipos de Google | Sí | 2026-08-25 | igual |
| `Google-CloudVertexBot` | Google | Para quien construye agentes con Vertex AI | Sí | 2026-08-25 | igual |
| `CCBot` | Common Crawl | Archivo público que luego usan muchos modelos | Sí | 2026-08-14 | `commoncrawl.org/ccbot` |
| `Bytespider` | ByteDance | Entrenamiento | Declarado | 2026-08-14 | Documentación de ByteDance |
| `Applebot-Extended` | Apple | Excluir del entrenamiento sin salir de Siri ni Spotlight | Sí | 2026-08-25 | `support.apple.com/en-us/119829` |
| `meta-externalagent` | Meta | Entrenamiento | Sí | 2026-08-14 | Documentación de Meta |
| `Amazonbot` | Amazon | Índice de Alexa y servicios propios | Sí | 2026-08-14 | Documentación de Amazon |

**Rangos de IP publicados** (para comprobar en los logs si el bot era el de verdad o alguien
poniéndose su nombre):

- OpenAI: `openai.com/gptbot.json`, `openai.com/searchbot.json`, `openai.com/chatgpt-user.json`,
  `openai.com/adsbot.json`.
- Anthropic: `claude.com/crawling/bots.json`.
- Perplexity: `www.perplexity.com/perplexitybot.json`, `www.perplexity.com/perplexity-user.json`.
- Google: se comprueba por DNS inverso, no por lista.

Bloquear por IP es mala idea: si el bot no puede leer tu `robots.txt`, tampoco puede obedecerlo.

## 2. Las tres posturas

| Postura | Qué hace | Para quién |
|---|---|---|
| **Todo abierto** | No se bloquea nada | Quien quiere alcance máximo y no le importa el entrenamiento |
| **Mixta** (la de la casa) | Fuera entrenamiento, dentro búsqueda y respuesta | Quien quiere que le citen sin regalar el archivo |
| **Todo cerrado** | Fuera todos los bots de IA | Contenido de pago o con licencia, medios, obra propia |

La decisión es del dueño de la web. El agente propone y explica las consecuencias; no elige.

Y avisa de lo que `robots.txt` no puede: los raspadores no lo leen, y los bots de visita en directo
de OpenAI y Perplexity pueden ignorarlo porque la petición nace de una persona. Si el objetivo es que
un contenido no salga de ahí, la herramienta es una contraseña, no un archivo de texto.

## 3. Las funciones de IA de Google

Google publicó su guía oficial el **15 de mayo de 2026**
(`developers.google.com/search/docs/fundamentals/ai-optimization-guide`, verificada el 2026-08-25).
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
