# SiteIndex

A Claude Code skill that gets a website found: by search engines, and by the AI assistants people
now ask instead of searching. It starts by looking at what you already have, so it never hands you
a list of things you did months ago.

## Install

Inside Claude Code, two lines:

```
/plugin marketplace add Mun1to/Vibeset
/plugin install siteindex@vibeset
```

If the install summary says `Run /reload-plugins to activate`, run it.

<details>
<summary>Prefer to install it by hand?</summary>

```bash
git clone https://github.com/Mun1to/SiteIndex.git
ln -s "$(pwd)/SiteIndex" ~/.claude/skills/siteindex
```

On Windows, with PowerShell:

```powershell
New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\siteindex" -Target "C:\path\to\SiteIndex"
```
</details>

## Use it

Ask for it when you ship a new site, when you prepare a launch, when a site that has been live for
weeks still does not show up, when nobody finds the app you built, or when you want to rank and do
not know where to start. Claude also picks it up on its own from phrases like "my site is not
indexed", "review my robots.txt" or "I want ChatGPT to cite my page".

## What it enforces

**1. It looks before it talks.** Phase 0 runs a sweep against the live domain (`plantillas/inventario.sh`):
redirects, robots, sitemap, head tags, JSON-LD types, analytics, rendered word count, and the DNS
records that reveal whether the site is **already verified in Search Console and Bing**. Then it asks
at most eight questions, and only the ones the sweep could not answer. Every line of the report
carries its real status: already done, missing, wrong, or not applicable. No generic checklist, no
advice you already followed.

**2. The gatekeepers first.** No point polishing a title if the crawler cannot get in. The skill
walks `robots.txt`, canonical host, mobile HTML, real 404s and sitemap before it touches a meta tag.

**3. The AI bot decision belongs to you, not to the agent.** Training crawlers (`GPTBot`, `ClaudeBot`,
`CCBot`, `Google-Extended`, `Bytespider`) and live-answer crawlers (`OAI-SearchBot`, `ChatGPT-User`,
`Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`) are two different groups with
two different consequences. Block the first and you lose nothing visible; block the second and you
disappear from AI answers. And the classic trap: `Google-Extended` has no effect on your Google
Search ranking, which is not what most robots files out there assume.

**4. Numbers are verified, never recited.** Title lengths, Core Web Vitals thresholds, bot names and
structured-data requirements all expire. The skill carries the procedure and a table of where to
check each number at the moment of use, so it never quotes a stale figure with confidence.

**5. It covers the half that actually ranks.** Search intent before writing, one intent per page,
Google's own self-assessment questions, E-E-A-T without the mysticism, internal links and orphan
pages, Core Web Vitals, and local business if the site serves an area. Technical work gets the
crawler in; this is what makes it worth showing.

**6. Digital products get their own phase.** Nobody searches for an invented product name on day
one, so the homepage has to win on category and problem instead. The skill lays out the pages that
actually bring users (use cases, comparisons, "alternative to X", pricing, download, docs,
changelog), what an assistant needs to read before it will recommend you (platform, price, licence,
where the data goes, how to install), `SoftwareApplication` structured data with Google's required
fields, and the places outside your own site where people really look for software: package
managers, alternative directories, launch platforms, GitHub topics and releases.

**7. Multilingual sites get their own phase.** One URL per language (`/es/`, `/en/`), `hreflang` with
self-reference and return links, `x-default`, and a canonical that points at itself instead of at
another language. Above all: no automatic redirect by language or country. Googlebot sends no
`Accept-Language` header and crawls mostly from US addresses, so a site that redirects everyone lands
the crawler on the same version every time and the rest never get indexed.

**8. AEO and GEO are SEO, and the skill says so.** Google's own May 2026 guidance is quoted: its AI
features run on the same ranking and quality systems, you do not need special machine-readable files
or markup, and structured data is not a requirement for them. What does control what AI features can
use from your page are the snippet directives, and those are documented here.

**9. It ends in a measurement, and it says out loud what is not over.** Search Console, PageSpeed,
server logs, and asking the assistants your own key questions once a month, written down with a date.
Not an opinion about whether it should rank by now. Submitting a sitemap, requesting indexing or
changing a favicon all finish in an afternoon and take days or weeks to show, so those carry their own
status, `EN ESPERA`, and the final report arrives in three piles instead of two: what is missing, what
is done, and what is done but still waiting. Every waiting line carries the date it is worth reopening
and what you expect to see by then. Where the official source publishes no timeframe, the skill says
so instead of inventing one.

On top of the phases, the skill closes with fourteen high-yield tips (start with the queries
already sitting on page two, revise before you publish, put the price in text, check what the bot
sees rather than what you see) and a checklist that answers with a status, never with a plain yes.

## What is in the box

Templates you copy from:

- `plantillas/inventario.sh`, the phase 0 sweep. Reads only, changes nothing.
- `plantillas/SEO-ESTADO.md`, the status sheet: done / missing / waiting / not applicable, plus what
  could not be checked, who has to fix each item, and the date each waiting item is worth reopening.
- `plantillas/robots.txt`, commented, with three AI postures to choose from.
- `plantillas/head-meta.html`, the complete head: title, description, canonical, Open Graph, Twitter
  Card, hreflang.
- `plantillas/multiidioma.html`, the three ways to declare `hreflang` plus a language banner that
  suggests instead of redirecting.
- `plantillas/jsonld.html`, ready-made blocks for Organization, WebSite, Article, FAQPage,
  BreadcrumbList, LocalBusiness, SoftwareApplication and VideoObject.
- `plantillas/pagina-producto.md`, the skeleton of a digital-product page, block by block, with the
  question each block answers.
- `plantillas/sitemap.xml`, a minimal sitemap plus the index variant.
- `plantillas/llms.txt`, with an honest note on what it is and what it is not.

References the agent opens only when that phase comes up:

- `referencias/contenido.md`, search intent, E-E-A-T, Google's self-assessment questions and the full
  spam-policy list.
- `referencias/rendimiento.md`, Core Web Vitals, JavaScript rendering, crawl budget, redirects,
  pagination and faceted navigation.
- `referencias/ia.md`, every AI crawler with the date it was last verified, Google's generative-AI
  guidance, the snippet controls, and how to measure citations.
- `referencias/multiidioma.md`, the full multilingual procedure.
- `referencias/producto-digital.md`, product pages, software structured data and the directories
  where software is actually found.
- `referencias/local.md`, local business and Google Business Profile.
- `referencias/recursos.md`, where to actually learn this: official docs, free courses and the tool
  for each phase.

The skill is written in Spanish; it works the same when you talk to your agent in English.

## What it does not cover

Writing the content itself, paid advertising, email deliverability (SPF, DKIM, DMARC), and full
crawls of very large sites, which need a paid crawler. The skill says so instead of improvising.

## Don't trust it, check it

Open source only helps if somebody actually reads the code, and almost nobody does. So instead of
asking you to trust this project, here is the prompt to check it: point your own AI agent at this
repository and get a security report, in your language, in a few minutes, even if you do not know
how to program.

**[Open AI-AUDIT.md](AI-AUDIT.md)** and paste it into Claude Code, Codex, Cursor, Copilot or
whatever you use. It is the same prompt in every public repository here, so you can compare.

> **ES:** No hace falta que te fíes. Abre [AI-AUDIT.md](AI-AUDIT.md), pega ese texto en tu IA y
> te dirá en tu idioma qué hace este programa de verdad: qué envía por internet, qué toca en tu
> ordenador y qué ejecuta al instalarse.

The only executable file here is `plantillas/inventario.sh`, and it only reads: `curl` against your
own domain and a DNS lookup. Everything else is Markdown and reference files you copy from.

## License

MIT, see [LICENSE](LICENSE).
