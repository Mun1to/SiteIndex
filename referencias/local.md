# Referencia: negocio local

Detalle de la fase 11 del `SKILL.md`. Lo entrecomillado está verificado en
`support.google.com/business/answer/7091` el **2026-08-25**.

Aplica solo si el negocio atiende a clientes en un sitio físico o en una zona concreta. Si vende a
todo el mundo por internet, esta fase no existe.

## 1. Los tres factores, dichos por Google

Google dice que el resultado local se decide por **relevancia, distancia y popularidad**.

- **Relevancia**: cuánto encaja tu ficha con lo que la persona ha buscado. Se mejora dando
  información completa y detallada. Google lo dice así: "las empresas que proporcionan información
  completa y precisa tienen más probabilidades de aparecer en los resultados".
- **Distancia**: a qué distancia estás de quien busca. **No se toca.** Por eso el negocio de la calle
  de al lado te gana en su calle y tú le ganas en la tuya.
- **Popularidad**: cuánto se te conoce. Entran reseñas, menciones, enlaces y reputación general.

⚠️ **"No se puede solicitar ni pagar por obtener un mejor posicionamiento local en Google".** Con
esas palabras. Quien venda "posiciones garantizadas en el mapa", miente.

## 2. Lo que se hace, por orden

1. **Perfil de Empresa de Google, verificado.** Sin verificar no compites. La verificación puede
   tardar y a veces pide vídeo o postal: se empieza por aquí, no por lo último.
2. **Categoría principal correcta.** Es la señal de relevancia más fuerte de la ficha, y la que más
   se elige mal. Se mira qué categoría usan los que ya salen primero.
3. **Ficha completa**: dirección, zona de servicio si vas al cliente, teléfono, web, horario real
   (festivos incluidos), servicios, formas de pago, accesibilidad. Los detalles que Google nombra
   (aparcamiento, wifi) cuentan.
4. **Fotos y vídeos propios**, actualizados. No las de archivo.
5. **Reseñas, y respuestas a las reseñas.** Google dice que "las reseñas positivas y las respuestas
   útiles pueden ayudar a que tu empresa destaque". Pedirlas está permitido; comprarlas o filtrar
   solo a los contentos, no.
6. **Publicaciones y novedades** si el negocio da para ello. Una ficha viva se ve distinta de una
   abandonada.

## 3. Lo que se hace en la web

- **El mismo nombre, dirección y teléfono en todas partes**, empezando por el pie de la web y la
  página de contacto. Las variantes ("C/" contra "Calle", con y sin número de local) confunden.
- **Una página por servicio y por zona, con contenido propio**: precios de esa zona, casos de esa
  zona, fotos de esa zona. La misma página con la ciudad cambiada es exactamente lo que Google llama
  **páginas puerta** y está en las políticas de spam.
- **`LocalBusiness` en JSON-LD** con los mismos datos que la ficha: nombre, dirección, teléfono,
  horario, zona atendida. Si son varios locales, uno por página de local.
- **Mapa incrustado y cómo llegar**, que además responde a la búsqueda real ("cómo llegar a...").
- **Página de contacto de verdad**, con teléfono en texto (no dentro de una imagen) y enlace `tel:`.

## 4. Directorios y menciones

- Los directorios del sector y los de tu ciudad siguen sirviendo, siempre que sean sitios donde
  alguien mira de verdad. Los datos, idénticos a los de la ficha.
- Aparecer en el periódico local, en la asociación de comerciantes o en el proveedor con el que
  trabajas vale más que veinte directorios vacíos.
- **Los directorios de pago que prometen posiciones son spam de enlaces** (ver
  `referencias/contenido.md`).

## 5. Cómo se mide

- **Perfil de Empresa**, su propio panel: cuánta gente lo ve, cuántos piden cómo llegar, cuántos
  llaman. Es la métrica que le importa al dueño del negocio.
- **Search Console** para la web, filtrando por las consultas con nombre de ciudad o "cerca de mí".
- **Las llamadas**: preguntar al cliente cómo te encontró sigue siendo el dato más barato y más
  fiable que existe.
