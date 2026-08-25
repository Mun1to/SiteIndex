# Referencia: contenido, intención de búsqueda y calidad

Detalle de la fase 8 del `SKILL.md`. Lo que lleva cita textual está verificado en
`developers.google.com/search/docs` el **2026-08-25**. Lo demás es procedimiento.

## 1. De la palabra suelta a la pregunta real

El error de principiante es partir de una palabra ("zapatillas") en vez de una pregunta
("qué zapatillas para correr si peso 90 kilos"). Google lo dice a su manera en la guía de inicio:
hay que **anticipar cómo busca la gente**, y sus sistemas de lenguaje ya relacionan una página con
muchas formas distintas de preguntar lo mismo.

De dónde salen las preguntas reales, por orden de calidad:

1. **Lo que preguntan los clientes** por correo, WhatsApp o teléfono. Nadie más tiene esto.
2. **El buscador interno de la web**, si lo hay: es una lista de deseos escrita por los visitantes.
3. **Search Console**, informe de rendimiento, pestaña de consultas: por qué te ve ya la gente.
4. **Las sugerencias del propio buscador** al escribir, y el bloque de "otras preguntas".
5. **Herramientas**: Google Trends para comparar interés y estacionalidad, el planificador de
   palabras clave de Google Ads para volúmenes, y las gratuitas de Ahrefs, Semrush o Ubersuggest
   para una primera lista. Los volúmenes son estimaciones, se tratan como tales.

## 2. La intención, que decide el formato

| Intención | Cómo se reconoce | Qué página pide |
|---|---|---|
| **Saber** | "qué es", "cómo se hace", "por qué" | Guía o artículo que responde arriba |
| **Comparar** | "mejor", "vs", "alternativas a" | Comparativa con tabla y criterio |
| **Ir** | El nombre de una marca o de un producto | La página oficial de eso |
| **Hacer o comprar** | "precio", "comprar", "cerca de mí", "contratar" | Página de producto o servicio, con precio y forma de contacto |

Dos comprobaciones antes de escribir:

- **Mirar qué está saliendo ya** en esa búsqueda. Si salen fichas de producto y tú escribes un
  ensayo, no vas a entrar por mucho que lo optimices.
- **Una intención, una página.** Si dos páginas propias compiten por lo mismo, se fusionan en la que
  ya tiene impresiones y la otra redirige con 301.

## 3. Las preguntas de autoevaluación de Google

Google publica una lista para juzgar el propio contenido. Resumidas y agrupadas:

**Contenido y calidad**

- ¿Aporta información, datos, investigación o análisis **originales**?
- ¿Es una descripción sustancial y completa del tema?
- ¿Ofrece análisis interesante o información que no es obvia?
- Si copia de otras fuentes, ¿añade valor real en vez de reescribirlas?
- ¿El titular describe el contenido sin exagerar ni escandalizar?
- ¿Es de los que guardarías, compartirías o recomendarías?
- ¿Aguanta la comparación con una fuente impresa de referencia sobre el tema?

**Especialización y confianza**

- ¿Se presenta de forma que dé confianza: fuentes claras, pruebas de la experiencia que hay detrás,
  información sobre el autor y sobre quién publica?
- Si alguien investiga quién publica esto, ¿saldría con la impresión de que es una fuente de
  confianza en la materia?
- ¿Lo escribe alguien con conocimiento demostrable del tema, o alguien que lo describe de oídas?
- ¿Tiene errores de datos fáciles de comprobar?

**Personas primero**

- ¿Tienes un público real que encontraría útil esto si llegara directamente, sin buscador?
- ¿Se nota experiencia de primera mano (haber usado el producto, haber estado en el sitio)?
- ¿Quien lo lee sale sabiendo lo suficiente para hacer lo que venía a hacer?
- ¿Sale con la sensación de haber tenido una buena experiencia?

**Quién, cómo y por qué** es el resumen que usa Google:

- **Quién** lo escribe, dicho claramente, con firma y algo sobre esa persona.
- **Cómo** se ha hecho, sobre todo si hay automatización de por medio: Google recomienda declararlo
  cuando el lector podría preguntarse razonablemente "¿cómo se hizo esto?".
- **Por qué** existe. Si la respuesta honesta es "para posicionar", eso es lo que Google llama
  contenido hecho para el buscador y no para las personas.

## 4. E-E-A-T, sin misticismo

Experiencia, especialización, autoridad y confianza. **La confianza es la más importante** de las
cuatro, y no todas pesan igual en todos los temas. En asuntos de salud, dinero o seguridad (lo que
Google llama YMYL), sus sistemas dan **más peso** al contenido que demuestra un E-E-A-T fuerte.

Lo importante: **no es un factor de posicionamiento que se active con una etiqueta**. Google lo dice
en su propia guía de inicio, en la lista de cosas que no importan. Es lo que evalúan sus sistemas y
sus revisores de calidad, y se demuestra con hechos visibles en la página: quién firma, qué ha hecho
antes, de dónde salen los datos, cómo se contacta con la empresa, si hay página de aviso legal.

## 5. Lo que Google dice que NO importa

De la guía de inicio oficial, para dejar de perder el tiempo:

- **La etiqueta `meta keywords`**: Google no la usa.
- **Repetir la palabra clave**: es política de spam y cansa al lector.
- **La palabra clave en el dominio o en la URL**: efecto casi nulo más allá de las migas de pan.
- **La extensión del dominio** (`.com`, `.dev`, `.guru`): solo importa si apuntas a un país.
- **La longitud del texto**: no hay número mágico de palabras, ni mínimo ni máximo.
- **Subdominio o subcarpeta**: lo que tenga sentido para el negocio.
- **El orden o la cantidad de encabezados**: no hay una cantidad ideal.
- **Contenido duplicado por accidente**: no provoca una acción manual.

## 6. Políticas de spam, la lista completa

Verificado en `developers.google.com/search/docs/essentials/spam-policies` el 2026-08-25. Se aplican
con acciones manuales, no son consejos:

| Política | Qué es |
|---|---|
| **Cloaking** | Enseñar al buscador algo distinto de lo que ve la persona |
| **Páginas puerta** | Muchas páginas casi iguales para captar variantes de búsqueda y mandar a todos al mismo sitio |
| **Abuso de dominios caducados** | Comprar un dominio con historial y colgarle contenido sin valor para aprovechar su reputación |
| **Contenido pirateado** | Contenido metido por una brecha de seguridad |
| **Texto y enlaces ocultos** | Texto blanco sobre blanco, fuera de pantalla o con opacidad cero |
| **Relleno de palabras clave** | Repetir palabras o listas de ciudades de forma antinatural |
| **Spam de enlaces** | Comprar, vender o intercambiar enlaces para posicionar, y generarlos en masa |
| **Tráfico automatizado** | Lanzar consultas automáticas a Google, incluido raspar resultados para medir posiciones |
| **Malware** | Software pensado para dañar al visitante o su equipo |
| **Funcionalidad engañosa** | Prometer algo que la página no hace |
| **Abuso de contenido a escala** | "Se generan muchas páginas con el objetivo principal de manipular las posiciones y no de ayudar a los usuarios", sin importar cómo se hayan creado |
| **Raspado** | Publicar contenido de otros sin aportar nada |
| **Redirecciones engañosas** | Llevar a la persona a un sitio distinto del que ve el buscador |
| **Abuso de la reputación del sitio** | Publicar contenido de terceros aprovechando las señales ya ganadas por el dominio anfitrión |
| **Afiliación fina** | Fichas copiadas del fabricante sin nada propio |
| **Spam de usuarios** | Comentarios y foros que se llenan de spam sin que nadie lo modere |

## 7. Contenido con IA

Google juzga el contenido, no la herramienta. Contenido asistido por IA que aporta algo está bien.
El límite está escrito en la política de **abuso de contenido a escala**: usar automatización "con el
objetivo principal de manipular las posiciones" es spam.

Además, en la Unión Europea el Reglamento de IA obliga a declarar el contenido sintético donde
corresponda. La etiqueta no cuesta nada al lado de una penalización, y la skill `galsas` lo audita.
