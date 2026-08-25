# Referencia: velocidad, rastreo y estructura técnica

Detalle de las fases 7 y 10 del `SKILL.md`. Verificado en `web.dev` y en
`developers.google.com/search/docs/crawling-indexing` el **2026-08-25**.

## 1. Core Web Vitals

Tres métricas, medidas con **visitantes reales** (datos de campo), no con una simulación:

| Métrica | Qué mide | Qué la estropea casi siempre |
|---|---|---|
| **LCP** | Cuánto tarda en pintarse el elemento grande de arriba | Imagen del encabezado sin optimizar, servidor lento, tipografías |
| **INP** | Cuánto tarda la página en responder a un toque o un clic | JavaScript que bloquea el hilo principal |
| **CLS** | Cuánto se mueve el contenido mientras carga | Imágenes sin `width` y `height`, banners insertados, fuentes que cambian |

Dos cosas que hay que tener claras:

- **INP sustituyó a FID** como métrica estable en 2024. Si una guía habla de FID, está caducada.
- **Se mide el percentil 75** de las cargas, separando móvil y escritorio: no basta con que vaya
  rápido en tu portátil.
- **Los umbrales exactos se miran en PageSpeed Insights en el momento**, no se recitan (regla 0 del
  `SKILL.md`).

INP no se puede medir en laboratorio, porque no hay nadie tocando la pantalla. Lo que se ve en
Lighthouse es una aproximación (TBT); el dato bueno es el de campo.

## 2. El orden en que se arregla

1. **La imagen de arriba**: tamaño real ajustado al hueco, formato moderno, `fetchpriority="high"`
   en la que manda, y nunca cargarla con JavaScript.
2. **`width` y `height` en todas las imágenes**, aunque el CSS luego las escale. Es lo que reserva
   el hueco y mata el CLS.
3. **Tipografías**: pocas, precargadas, con `font-display: swap` y una alternativa del sistema.
4. **JavaScript**: quitar lo que no se usa, dividir por rutas, y cargar después lo que no hace falta
   para ver la página. Los widgets de terceros (chats, mapas, vídeos) se cargan cuando se piden.
5. **Servidor y caché**: un TTFB alto se lo come todo. Caché en el borde, compresión, HTTP/2 o
   HTTP/3.
6. **Reservar espacio** para banners de cookies, avisos y anuncios.

## 3. JavaScript y lo que ve el bot

- Google rastrea, **después** renderiza. El renderizado va en otra cola y puede tardar.
- La comprobación real: **Inspección de URLs en Search Console**, pestaña de HTML renderizado, y ver
  si el texto está ahí.
- La comprobación rápida sin abrir nada: `curl -s https://dominio/pagina | wc -w`. Si salen cuatro
  palabras, el contenido lo pinta el navegador.
- Lo que no es un `<a href>` no se rastrea. Un `onclick` que navega es un callejón sin salida.
- Ante la duda: renderizado en servidor o pre-render de las páginas que importan.

## 4. Presupuesto de rastreo

Solo preocupa a sitios grandes. Google lo dice claro: interesa a sitios de un millón de páginas o
más que cambian cada semana, a sitios de diez mil páginas o más que cambian a diario, y a los que
tienen muchas URLs en "Descubierta, actualmente sin indexar". **Un sitio pequeño y estable no
necesita esta sección.**

Se compone de dos cosas: cuánto aguanta tu servidor y cuánto quiere rastrear Google. Lo que lo
malgasta:

- Contenido duplicado y URLs innecesarias (filtros, ordenaciones, parámetros de campaña).
- Errores 404 blandos, que devuelven 200 con una página de "no encontrado".
- Cadenas de redirecciones.
- Páginas lentas.
- Sitemaps desactualizados.

Buenas prácticas de la propia documentación: consolidar duplicados, bloquear en `robots.txt` lo que
no importa (**no con `noindex`**, que obliga a rastrearlo igual), devolver 404 o 410 de verdad para
lo eliminado, mejorar el tiempo de respuesta y admitir `304 Not Modified`.

Solo hay dos formas de que Google rastree más: **más capacidad de servidor** o **mejor contenido**.

## 5. Redirecciones

- **301** para lo permanente, **302** solo para lo temporal de verdad.
- **Sin cadenas.** Cada salto pierde tiempo y Googlebot deja de seguirlas después de unos cuantos.
  El origen apunta directo al destino final.
- **Sin bucles**, obviamente, y sin redirigir todo lo que no existe a la portada: eso genera 404
  blandos.
- En una **migración de dominio**, mapa de redirecciones uno a uno de las URLs que tenían tráfico,
  y cambio de dirección declarado en Search Console.

## 6. Paginación y filtros de catálogo

**Paginación:** cada página de la serie lleva su propio `canonical` apuntándose a sí misma. `rel=prev`
y `rel=next` ya no los usa Google. Lo que sí rompe la paginación es que los enlaces de página solo
existan en JavaScript, o que las páginas dos en adelante lleven `noindex` heredado de una plantilla.

**Filtros y facetas:** cada combinación de color, talla y precio puede generar una URL nueva, y eso
multiplica el catálogo por miles. La recomendación es cerrarlos en `robots.txt` y dejar indexables
solo las combinaciones que alguien buscaría de verdad, que además merecen su propia página con texto
propio.

## 7. Arquitectura y enlaces internos

- **Poca profundidad**: lo que da dinero, a pocos clics de la portada.
- **Cero huérfanas**: una página sin ningún enlace interno solo se descubre por el sitemap, y esa
  señal es débil. Se localizan comparando las URLs del sitemap con las que enlaza el propio sitio.
- **Texto de enlace descriptivo**, que es lo que le dice al buscador de qué va el destino.
- **Migas de pan** con `BreadcrumbList`: mejoran la navegación y salen en el resultado.
- **Grupos por tema**: una página principal del tema y las específicas colgando, enlazadas en las dos
  direcciones.
- **Enlaces salientes** cuando aportan contexto; `nofollow` en lo que no controlas y en lo que
  escriben los usuarios.

## 8. Herramientas sin pagar nada

- **Search Console**, informe de páginas, para ver qué está indexado y por qué no lo está el resto.
- **PageSpeed Insights**, que trae datos de campo si el sitio tiene visitas suficientes.
- **Lighthouse** en el navegador para el laboratorio.
- **`curl`** para las comprobaciones de cabeceras, redirecciones y HTML servido: es lo que hace
  `plantillas/inventario.sh`.
- **Los logs del servidor**, la única fuente que dice qué bots entran de verdad y a qué.
