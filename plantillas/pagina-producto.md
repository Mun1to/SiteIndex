# Esqueleto de una página de producto digital que posiciona

Plantilla de la fase 9 de `siteindex`. Se copia el esqueleto, se rellena y se borra lo que no
aplique. El orden importa: es el orden en que lee una persona con prisa y en que extrae un
asistente.

Regla de fondo: **cada bloque responde a una pregunta que alguien escribe en un buscador**. Si un
bloque no responde a ninguna, sobra.

---

## `<title>` y descripción

- **Título:** `{{Nombre}}, {{lo que hace}} para {{quién o qué sistema}}`
  Ejemplo de forma, no de estilo: `Expoal, descargar vídeos sin publicidad en Windows`.
  El nombre solo no vale: nadie busca un nombre que no conoce.
- **Meta descripción:** una frase con el beneficio y una con la condición (gratis, local, sin
  cuenta, código abierto). Es el anuncio, no el resumen.

## H1 y primer párrafo

- **H1:** lo que hace, con las palabras del usuario. Ni el eslogan ni el nombre solo.
- **Primer párrafo, dos frases:** qué es y qué problema quita. Aquí es donde se cita cuando una IA
  te recomienda, así que tiene que poder leerse suelto, fuera de la página.
- Debajo, una línea de **datos duros**: sistema operativo, precio (o "gratis"), licencia, tamaño.

## Bloque de acción

- Botón de descarga o de registro, con la **versión y la fecha** al lado, en texto.
- Enlace a las demás plataformas, visible aunque el sistema se detecte solo.
- Si al abrirlo va a salir un aviso de SmartScreen o del antivirus, **decirlo aquí**, no en el foro.

## `## Qué resuelve` (el problema, antes que las funciones)

Tres o cuatro situaciones reales, escritas como las diría el usuario. Cada una es una búsqueda:
"se me llena el disco", "no quiero subir mis archivos a una nube", "necesito hacerlo sin saber
programar".

## `## Cómo funciona`

Tres pasos, con una captura por paso. Si hay vídeo, **la transcripción va debajo en texto**: el
vídeo no se indexa, el texto sí.

## `## Qué incluye` (funciones, y solo aquí)

Lista corta, cada línea con el beneficio delante y la función detrás. Las funciones sin beneficio
son un inventario, y nadie busca inventarios.

## `## Requisitos y compatibilidad`

Sistema, versión mínima, espacio, dependencias. Es lo que más se pregunta antes de descargar y lo
que menos gente escribe.

## `## Precio` (o el enlace a la página de precios)

El precio **en texto**, no en una imagen ni tras un formulario. Si es gratis, la palabra "gratis"
escrita. Si hay versión de pago, qué cambia exactamente.

## `## Preguntas frecuentes`

Las que te llegan de verdad por correo o por WhatsApp, con la respuesta en la primera frase.
Marcar con `FAQPage` solo si están visibles en la página.

Las tres que casi siempre se buscan y casi nadie contesta:

- ¿Es gratis? ¿Con qué límite?
- ¿Manda mis datos a algún sitio?
- ¿Cómo se desinstala?

## `## Alternativas y comparación`

Enlace a la comparativa honesta y a las páginas de "alternativa a X". Reconocer dónde el otro es
mejor no resta: es lo que hace que la comparación se cite.

## Pie de confianza

- Quién está detrás, con enlace a una página de "sobre mí" o "sobre nosotros" de verdad.
- Enlace al repositorio si es de código abierto, y a la licencia.
- Fecha de la última actualización de la página, real.
- Enlace al changelog.

---

## Lo que NO se pone

- Testimonios inventados ni valoraciones que no existen.
- Contadores de descargas falsos.
- "El mejor del mundo" sin nada que lo sostenga: no posiciona y quema la confianza.
- Texto escondido con palabras clave al pie de página.

## Datos estructurados que le corresponden

`SoftwareApplication` (obligatorios `name` y `offers.price`, más `aggregateRating` o `review`),
`FAQPage` si las preguntas están visibles, `VideoObject` si hay demostración, y `BreadcrumbList`
si la página cuelga de una sección. Todo en `plantillas/jsonld.html`.
