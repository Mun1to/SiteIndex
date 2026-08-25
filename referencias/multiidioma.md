# Referencia: webs en varios idiomas

Detalle de la fase 6 del `SKILL.md`. Verificado contra la documentacion de Google Search Central
(`developers.google.com/search/docs/specialty/international`) el 2026-08-20.

## Lo que hay que decidir y en qué orden

Este paso aplica **solo si la web existe en más de un idioma o para más de un país**. Si es de un
idioma solo, saltarlo entero: un `hreflang` mal puesto hace más daño que no ponerlo.

### Primero la estructura de URL

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

### `hreflang`, el mapa entre las versiones

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

### La detección automática, que es donde se rompe la indexación

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

### El resto de señales de idioma

- **`<html lang="es">`** en cada página, con el idioma real de esa página. Lo usan los buscadores y
  los lectores de pantalla.
- **Traducción de verdad**, incluidos `<title>`, meta descripción, URL y textos de imagen. La misma
  página en inglés colgada bajo `/es/` no es una versión española.
- **Un sitemap con todas las URLs de todos los idiomas**, no solo las del principal.
- **`og:locale`** con el idioma de la página y **`og:locale:alternate`** con los otros, para que la
  tarjeta que se ve al pegar el enlace también salga bien.

Plantilla: `plantillas/multiidioma.html`. La parte de cliente (arrancar en el idioma del visitante sin
parpadeo) la cubre la skill `SmartDefaults`.
