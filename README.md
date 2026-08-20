# SiteIndex

A Claude Code skill that leaves a website ready to be found: by search engines, and by the AI
assistants people now ask instead of searching.

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

Ask for it when you ship a new site, when you prepare a launch, or when a site that has been live
for weeks still does not show up. Claude also picks it up on its own from phrases like "my site is
not indexed", "review my robots.txt" or "I want ChatGPT to cite my page".

## What it enforces

**1. The gatekeepers first.** No point polishing a title if the crawler cannot get in. The skill
walks `robots.txt`, canonical host, mobile HTML, real 404s and sitemap before it touches a single
meta tag.

**2. The AI bot decision belongs to you, not to the agent.** Training crawlers (`GPTBot`,
`ClaudeBot`, `CCBot`, `Google-Extended`, `Bytespider`) and live-answer crawlers (`OAI-SearchBot`,
`ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`) are two
different groups with two different consequences. Block the first and you
lose nothing visible; block the second and you disappear from AI answers. And the classic trap:
`Google-Extended` has no effect on your Google Search ranking or indexing, which is not what most
robots files out there assume.

**3. Numbers are verified, never recited.** Title lengths, Core Web Vitals thresholds, bot names
and structured-data requirements all expire. The skill carries the procedure and a table of where
to check each number at the moment of use, so it does not quote a stale figure with confidence.

**4. Multilingual sites get their own step.** One URL per language (`/es/`, `/en/`), `hreflang`
with self-reference and return links, `x-default`, and a canonical that points at itself instead of
at another language. Above all: no automatic redirect by language or country. Googlebot sends no
`Accept-Language` header and crawls mostly from US addresses, so a site that redirects everyone
lands the crawler on the same version every time and the rest never get indexed. Detect, suggest,
let the person choose.

**5. It ends in a measurement.** Search Console, PageSpeed, server logs, and asking the assistants
your own key questions once a month. Not an opinion about whether it should rank by now.

## What is in the box

- `SKILL.md`, the full procedure in nine steps, the seven failures that break indexing most often,
  and a checklist.
- `plantillas/robots.txt`, commented, with three AI postures to choose from.
- `plantillas/head-meta.html`, the complete head: title, description, canonical, Open Graph,
  Twitter Card, hreflang.
- `plantillas/multiidioma.html`, the three ways to declare `hreflang` (head, HTTP header, sitemap)
  plus a language banner that suggests instead of redirecting.
- `plantillas/jsonld.html`, ready-made blocks for Organization, WebSite, Article, FAQPage and
  BreadcrumbList.
- `plantillas/sitemap.xml`, a minimal sitemap plus the index variant.
- `plantillas/llms.txt`, with an honest note on what it is and what it is not.

The skill is written in Spanish; it works the same when you talk to your agent in English.

## What it does not cover

Email deliverability (SPF, DKIM, DMARC), local Geo SEO, and link building. Different territories
with different rules, and the skill says so instead of improvising.

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

There is nothing here that runs: Markdown instructions and reference files you copy from.

## License

MIT, see [LICENSE](LICENSE).
