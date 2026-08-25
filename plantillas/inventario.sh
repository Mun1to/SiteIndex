#!/usr/bin/env bash
# Inventario de indexacion: mira lo que YA tiene una web antes de proponer nada.
# Uso:  bash inventario.sh dominio.com
# No cambia nada: solo lee y escribe un informe por pantalla.

set -u
D="${1:-}"
[ -z "$D" ] && { echo "Uso: bash inventario.sh dominio.com"; exit 1; }
D="${D#http://}"; D="${D#https://}"; D="${D%%/*}"
B="https://$D"
UA="Mozilla/5.0 (compatible; inventario-siteindex)"
C() { curl -sS -L --max-time 20 -A "$UA" "$@"; }
si() { [ -n "$1" ] && echo "SI" || echo "NO"; }

echo "== Inventario de $D =="
echo "Fecha: $(date +%Y-%m-%d)"
echo

echo "-- 1. Como responde el dominio --"
for u in "http://$D" "https://$D" "http://www.$D" "https://www.$D"; do
  printf '%-24s %s -> %s\n' "$u" \
    "$(curl -sS -o /dev/null -L --max-time 20 -A "$UA" -w '%{http_code}' "$u" 2>/dev/null || echo ERR)" \
    "$(curl -sS -o /dev/null -L --max-time 20 -A "$UA" -w '%{url_effective}' "$u" 2>/dev/null || echo ERR)"
done
echo
echo "404 de verdad en una URL inventada: $(curl -sS -o /dev/null --max-time 20 -A "$UA" -w '%{http_code}' "$B/esta-url-no-existe-siteindex-123")"
echo

echo "-- 2. Cabeceras HTTP de la portada --"
C -I "$B/" | grep -iE '^(HTTP/|server|content-type|x-robots-tag|cache-control|content-encoding|link):' || echo "(sin cabeceras legibles)"
echo

echo "-- 3. robots.txt --"
R=$(curl -sS --max-time 20 -A "$UA" -o /tmp/si_robots.txt -w '%{http_code}' "$B/robots.txt")
if [ "$R" = "200" ]; then
  echo "robots.txt: 200"
  echo "  Disallow totales : $(grep -ci '^[[:space:]]*Disallow:[[:space:]]*/[[:space:]]*$' /tmp/si_robots.txt)"
  echo "  linea Sitemap    : $(grep -i '^[[:space:]]*Sitemap:' /tmp/si_robots.txt | sed 's/^[[:space:]]*//' | tr '\n' ' ')"
  echo "  bots de IA nombrados:"
  IA=$(grep -ioE 'GPTBot|OAI-SearchBot|OAI-AdsBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|anthropic-ai|CCBot|Google-Extended|PerplexityBot|Perplexity-User|Bytespider|Applebot-Extended|meta-externalagent|Amazonbot' /tmp/si_robots.txt | sort -u)
  if [ -n "$IA" ]; then echo "$IA" | sed 's/^/    /'; else echo "    (ninguno: no hay decision de IA escrita)"; fi
else
  echo "robots.txt: $R  (no hay)"
fi
echo

echo "-- 4. Sitemap --"
for s in "sitemap.xml" "sitemap_index.xml" "sitemap-index.xml"; do
  code=$(curl -sS -o /tmp/si_sm.xml --max-time 20 -A "$UA" -w '%{http_code}' "$B/$s")
  if [ "$code" = "200" ]; then
    echo "$s: 200, URLs listadas: $(grep -c '<loc>' /tmp/si_sm.xml), con lastmod: $(grep -c '<lastmod>' /tmp/si_sm.xml)"
  else
    echo "$s: $code"
  fi
done
echo

echo "-- 5. Otros archivos de raiz --"
for f in "llms.txt" "favicon.ico" "site.webmanifest" "manifest.json" "ads.txt"; do
  printf '  %-18s %s\n' "$f" "$(curl -sS -o /dev/null --max-time 15 -A "$UA" -w '%{http_code}' "$B/$f")"
done
echo

echo "-- 6. Que trae el HTML de la portada (sin ejecutar JavaScript) --"
C "$B/" > /tmp/si_home.html
BYTES=$(wc -c < /tmp/si_home.html)
TXT=$(sed -e 's/<script[^>]*>.*<\/script>//gI' -e 's/<[^>]*>/ /g' /tmp/si_home.html | tr -s ' \n' ' ')
PAL=$(echo "$TXT" | wc -w)
echo "  bytes de HTML          : $BYTES"
echo "  palabras visibles      : $PAL   (menos de ~80 suele significar que el texto lo pinta el JavaScript)"
echo "  <title>                : $(grep -ioP '(?<=<title>).*?(?=</title>)' /tmp/si_home.html | head -1)"
echo "  meta description       : $(grep -ioP '<meta[^>]+name=.description.[^>]*>' /tmp/si_home.html | head -1 | grep -ioP '(?<=content=.).*?(?=")' | cut -c1-90)"
echo "  html lang              : $(grep -ioP '<html[^>]*lang="\K[^"]+' /tmp/si_home.html | head -1)"
echo "  canonical              : $(grep -ioP 'rel="canonical"[^>]*href="\K[^"]+|href="\K[^"]+(?="[^>]*rel="canonical")' /tmp/si_home.html | head -1)"
echo "  meta robots            : $(grep -ioP '<meta[^>]+name="robots"[^>]*>' /tmp/si_home.html | head -1)"
echo "  numero de <h1>         : $(grep -oiE '<h1[ >]' /tmp/si_home.html | wc -l)"
echo "  og: presentes          : $(grep -oiP '<meta[^>]+property="og:\K[^"]+' /tmp/si_home.html | sort -u | tr '\n' ' ')"
echo "  twitter: presentes     : $(grep -oiP '<meta[^>]+name="twitter:\K[^"]+' /tmp/si_home.html | sort -u | tr '\n' ' ')"
echo "  hreflang declarados    : $(grep -oiP 'hreflang="\K[^"]+' /tmp/si_home.html | sort -u | tr '\n' ' ')"
echo "  JSON-LD (@type)        : $(grep -oP '"@type"\s*:\s*"\K[^"]+' /tmp/si_home.html | sort -u | tr '\n' ' ')"
echo

echo "-- 7. Senales de que ya esta dado de alta en algun sitio --"
echo "  google-site-verification (etiqueta): $(si "$(grep -io 'google-site-verification' /tmp/si_home.html | head -1)")"
echo "  msvalidate.01 (Bing, etiqueta)     : $(si "$(grep -io 'msvalidate.01' /tmp/si_home.html | head -1)")"
echo "  yandex-verification                : $(si "$(grep -io 'yandex-verification' /tmp/si_home.html | head -1)")"
echo "  TXT del DNS con verificacion       :"
nslookup -type=TXT "$D" 2>/dev/null | grep -iE 'google-site-verification|MS=|facebook-domain' | sed 's/^/    /' || echo "    (no se pudo consultar el DNS)"
MED=$( { grep -oE 'G-[A-Z0-9]{9,}' /tmp/si_home.html; grep -ioE 'gtag\(|googletagmanager|plausible\.io|umami|matomo|cloudflareinsights|posthog|clarity\.ms' /tmp/si_home.html; } | sort -u | tr '
' ' ')
echo "  medicion instalada                 : ${MED:-(ninguna detectada)}"
echo

echo "-- 8. Rendimiento de bulto (no sustituye a PageSpeed) --"
curl -sS -o /dev/null --max-time 30 -A "$UA" -w '  TTFB: %{time_starttransfer}s   total: %{time_total}s   peso HTML: %{size_download} bytes\n' "$B/"
echo
echo "== Fin. Lo que salga aqui YA esta hecho: no se vuelve a proponer. =="
