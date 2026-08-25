# Estado de indexación y posicionamiento: <dominio>

> Sale de la fase 0 de la skill `siteindex`. Se rellena **antes** de proponer nada, y se actualiza
> cada vez que se revisa. Sin fecha no sirve para comparar, que es para lo que se hace.

- **Dominio:** <https://dominio.com>
- **Barrido:** `bash plantillas/inventario.sh dominio.com`, ejecutado el **AAAA-MM-DD**
- **Quién ha contestado las preguntas:** <nombre>
- **Próxima revisión:** <la fecha más cercana de la columna `EN ESPERA` de la sección 2. Si no hay
  ninguna, cuando se cumpla la meta que toque, no una fecha inventada>

## 1. Lo que ya está hecho

Esto **no se vuelve a proponer**. Si alguien lo sugiere otra vez, se le manda a esta tabla.

| Qué | Cómo se ha comprobado |
|---|---|
| Ejemplo: dominio único, `www` y `http` redirigen a `https://dominio.com` | Barrido, bloque 1 |
| Ejemplo: propiedad de dominio verificada en Search Console | TXT del DNS visto en el barrido, bloque 7 |
| | |

## 2. Lo que falta

Ordenado por impacto, no por número de fase. Cada línea dice **quién** puede arreglarlo: el agente
en el código, o la persona en un panel donde el agente no entra.

**Los cuatro estados, y el tercero es el que más se olvida:**

| Estado | Qué significa | Qué se hace con él |
|---|---|---|
| `PENDIENTE` | Nadie lo ha tocado todavía | Hacerlo |
| `HACIÉNDOSE` | Empezado y sin terminar | Terminarlo |
| `EN ESPERA · revisar el AAAA-MM-DD` | **Ya está hecho, pero su efecto tarda días o semanas** | **No se vuelve a hacer: se vuelve a mirar ese día** |
| `HECHO` | Hecho y su efecto ya se ve en los datos | Nada, pasa a la sección 1 |

⚠️ `EN ESPERA` **no es "pendiente"**. Enviar un sitemap, pedir indexación de una URL o cambiar el
favicon se terminan en un día, pero el buscador tarda en reflejarlo. Confundir los dos estados hace
que en la revisión siguiente alguien lo dé por roto y lo repita, o que se dé por ganado algo que
nadie ha comprobado. Un `EN ESPERA` sin fecha de revisión es un `EN ESPERA` perdido.

Y sí, aquí va una fecha aunque el resto del plan se ordene por impacto y no por calendario: **esta
fecha no la eliges tú, la pone el ciclo de rastreo del buscador.** No es un plazo autoimpuesto, es
cuándo tiene sentido volver a mirar.

| Falta | Fase | Impacto | Lo arregla | Estado |
|---|---|---|---|---|
| Ejemplo: no hay `sitemap.xml` | 12 | Alto | Agente | `PENDIENTE` |
| Ejemplo: sitemap sin enviar en Search Console | 12 | Alto | La persona | `PENDIENTE` |
| Ejemplo: sitemap enviado el 2026-08-25, 0 de 276 URLs indexadas todavía | 12 | Alto | Nadie, el tiempo | `EN ESPERA · revisar el 2026-09-08` |
| Ejemplo: favicon nuevo subido, Google sigue enseñando el viejo | 12 | Bajo | Nadie, el tiempo | `EN ESPERA · revisar el 2026-09-22` |
| | | | | |

## 3. Lo que no aplica

Se escribe para que nadie lo vuelva a sacar.

| No aplica | Por qué |
|---|---|
| Ejemplo: `hreflang` | La web es solo en español |
| Ejemplo: ficha de negocio local | Vende por internet a todo el país |
| | |

## 4. Lo que no se ha podido comprobar

Ni se inventa ni se da por bueno.

- Ejemplo: si el sitemap está enviado en Search Console. Hace falta entrar en la cuenta.
- Ejemplo: datos de campo de Core Web Vitals. El sitio no tiene visitas suficientes todavía.

## 5. Respuestas de la persona

Lo que contó en la fase 0 y no se puede deducir mirando la web.

- **Quién es el cliente y qué escribiría para encontrarlo:**
- **Páginas que dan dinero o clientes:**
- **Competidores que salen por encima:**
- **Ritmo de publicación y quién escribe:**
- **Qué se intentó antes y no funcionó:**

## 6. Lo medido, con fecha

| Fecha | Páginas indexadas | Excluidas y por qué | Impresiones (28 días) | Clics | LCP / INP / CLS |
|---|---|---|---|---|---|
| AAAA-MM-DD | | | | | |

## 7. Preguntas a los asistentes de IA

Las que llevarían un cliente hasta aquí. Se repiten cada mes con las mismas palabras.

| Fecha | Pregunta | ¿Te citan? | Junto a quién |
|---|---|---|---|
| AAAA-MM-DD | | | |
