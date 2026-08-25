# Referencia: posicionar un producto digital

Detalle de la fase 9 del `SKILL.md`. Aplica a software: aplicaciones de escritorio, webs de
suscripción, extensiones, skills, paquetes y librerías. Verificado en
`developers.google.com/search/docs/appearance/structured-data` el **2026-08-25**.

Es donde más tráfico se pierde por no entender cómo busca la gente el software.

## El problema del nombre inventado

**Nadie busca tu nombre hasta que ya te conoce.** Un producto que se llama con un nombre acuñado
tiene cero búsquedas del nombre el primer día, así que posicionar por la marca es posicionar por
nada. La web tiene que ganar **por categoría y por problema**:

- La portada se lleva la categoría: "editor de vídeo con IA para DaVinci Resolve", no "Vidorq, tu
  compañero creativo".
- El `<title>` de la portada lleva el nombre **y** lo que hace: `Nombre, lo que hace y para quién`.
  El nombre solo sirve a quien ya te conoce, y esos te encuentran igual.
- La descripción de la ficha, el `og:description` y el primer párrafo dicen **qué es, para qué sirve
  y en qué sistema funciona**, en una frase que se pueda citar entera.

## Las páginas que traen clientes de un producto digital

Cada una responde a un momento distinto de la decisión. Se hacen por este orden, porque el de abajo
convierte más que el de arriba:

| Página | Qué búsqueda captura | Qué no puede faltar |
|---|---|---|
| **Alternativa a X** | "alternativa a [competidor]", "[competidor] gratis" | Comparación honesta, qué hace mejor el otro, y qué haces tú distinto |
| **Comparativa** | "[tú] vs [competidor]", "mejor programa para X" | Tabla de verdad, con los puntos donde pierdes |
| **Caso de uso** | "cómo hacer X" con tu producto dentro | El problema primero, el producto como respuesta, no al revés |
| **Precios** | "[categoría] precio", "cuánto cuesta X" | El precio **visible y en texto**, no en una imagen ni tras un formulario |
| **Descarga o instalación** | "descargar X", "instalar X en Windows" | Versión, tamaño, requisitos, y qué pasa al abrirlo |
| **Documentación** | Las preguntas concretas de quien ya lo usa | URLs estables, indexable, sin bloquear en `robots.txt` |
| **Changelog** | Poca búsqueda, mucha confianza | Fechas reales, una entrada por versión |
| **Integraciones** | "[tu categoría] con [otra herramienta]" | Solo las que existen de verdad |

⚠️ **El límite con el spam:** generar cien páginas "alternativa a" desde una plantilla, cambiando
solo el nombre del competidor, es **abuso de contenido a escala** y **páginas puerta** a la vez. Una
plantilla con datos reales y comparación real por página está bien; la misma página con el nombre
cambiado, no. Si no tienes nada que decir de ese competidor, no hagas esa página.

## Lo que las personas y las IA necesitan encontrar en la página

Los asistentes recomiendan software cuando pueden contestar estas preguntas leyendo la página. Si
alguna no está en el HTML, te descartan sin decírtelo:

- **Qué es y qué problema resuelve**, en la primera frase.
- **En qué sistema funciona** (Windows, macOS, Linux, navegador) y desde qué versión.
- **Cuánto cuesta**, incluido "gratis" dicho con esa palabra, y si hay prueba o límite.
- **Si es de código abierto** y con qué licencia.
- **Qué datos toca y a dónde los manda**, sobre todo si es local. "Todo se procesa en tu ordenador"
  es una de las frases que más se citan.
- **Cómo se instala**, en un comando o en tres pasos.
- **Quién lo hace.** Un producto sin cara detrás pierde contra uno que la tiene.

## Datos estructurados de software

`SoftwareApplication` sigue dando resultado enriquecido en Google. Campos **obligatorios**: `name`,
`offers.price` (con `0` si es gratis) y **o bien** `aggregateRating` **o bien** `review`.
Recomendados: `operatingSystem` y `applicationCategory`.

⚠️ **Cuidado con las valoraciones.** Google prohíbe las reseñas falsas, las incentivadas sin
declarar y **las copiadas de otras webs**. La prohibición de reseñas sobre uno mismo está escrita
para `LocalBusiness` y `Organization`, no para el software, pero la regla de fondo vale igual: si
marcas una valoración, tiene que venir de personas reales y verse en la página. Inventar cinco
estrellas es la forma más rápida de comerse una acción manual.

Si hay vídeo de demostración, `VideoObject`. Si hay preguntas frecuentes de verdad, `FAQPage`.

Plantilla: `plantillas/jsonld.html`, bloque de `SoftwareApplication`.

## Fuera de tu web: donde de verdad busca la gente software

Tu web es una de las paradas, y casi nunca la primera. Estos sitios posicionan mejor que tú para tu
propia categoría, así que estar dentro es aparecer sin depender de tu dominio:

- **Los repositorios de paquetes**, que es como se instala hoy: winget y la Microsoft Store en
  Windows, Homebrew en macOS, el gestor que toque en Linux, npm o PyPI si es librería. Un producto
  instalable con un comando se recomienda mucho más fácil, y las IA lo citan con ese comando.
- **Los directorios de alternativas**: AlternativeTo y SaaSHub. La gente busca "alternativa a X" ahí
  antes que en Google, y esas fichas salen luego en los resultados.
- **Los de lanzamiento**: Product Hunt y compañía. Un pico de un día, pero deja un enlace y una
  ficha permanente.
- **Los de descarga clásicos** (Softpedia, SourceForge) si es un ejecutable de escritorio.
- **Los de reseñas B2B** (G2, Capterra) solo si vendes a empresas y puedes conseguir reseñas reales.
- **GitHub**, que es un buscador en sí mismo: `topics` bien puestos, README que explica qué es en la
  primera línea, y una release por versión con sus notas.
- **El sitio del ecosistema al que perteneces**: si es una skill, una extensión o un plugin, su
  registro oficial pesa más que tu web.

Todo esto, con los mismos datos y el mismo nombre en todas partes, y con enlace a tu web. No es
comprar enlaces: es estar en el catálogo del sector, que es lo que Google llama estar donde ya está
tu público.

## La descarga, que es donde se cae la mitad de la gente

- **Enlace directo y visible**, con el sistema detectado pero sin ocultar los demás.
- **Versión, fecha, peso y requisitos** escritos en texto, al lado del botón.
- **Qué pasa al abrirlo**: si Windows va a enseñar el aviso de SmartScreen o el antivirus va a
  protestar, dilo tú antes. Esconderlo cuesta más instalaciones que decirlo.
- **Suma de verificación o firma**, si el binario es propio.
- **Instrucciones de desinstalación.** Suena raro y es de lo que más confianza da.

Nada de esto posiciona por sí solo, pero decide si la visita que ya ganaste se convierte en usuario,
y las páginas que la gente usa de verdad acaban posicionando mejor.
