# Ivory & Bloom Atelier — Website 2.0

Handmade luxury bridal accessories. Static site, zero runtime dependencies, deployable
to any Apache/shared host. Live at https://ivoryandbloom.shop/

Website 2.0 is an in-progress repositioning from "handmade shop" to a luxury
personalized bridal atelier — see `docs/website-2.0-roadmap.md` for the original
incremental roadmap and the approved Website 2.0 architecture plan for the fuller
scope (new pages, commerce model, phased rollout) this README's Phase A section below
lays the technical foundation for.

## IMPORTANT: this repo now has a build step

**`index.html`, `journal/index.html`, and every `journal/*.html` post are
generated files.** Their source lives in `src/pages/`, assembled from shared
`src/partials/` (header, footer, theme customizer, journal header/footer) by
`scripts/build.ps1`. Generated files carry an `<!-- AUTO-GENERATED ... -->` comment
at the top as a reminder.

**Do not hand-edit the generated HTML files directly** — edits get silently
overwritten the next time someone runs the build. Edit the matching file under
`src/pages/` (or the shared partial under `src/partials/` if the change is
site-wide, like nav or footer), then rebuild:

```
powershell -File scripts/build.ps1
```

This is a **build-time-only** tool — no npm install, no runtime dependency, nothing
changes about hosting. The deployed output is still plain static HTML/CSS/JS; only
*how the HTML gets authored* changed, to stop the header/footer/nav duplication that
previously required hand-editing every page (see former ADR-2/ADR-3, resolved below).

## Folder structure

```
/
├── index.html             GENERATED — do not edit directly, see src/pages/index.html
├── our-craft.html         GENERATED — brand story + process page (Website 2.0 Phase B)
├── faq.html               GENERATED — FAQ with FAQPage schema (Website 2.0 Phase D)
├── 404.html               NOT generated — standalone, absolute-URL page (see Phase F note)
├── robots.txt             Crawler rules → points to sitemap
├── sitemap.xml            All 21 pages, priorities + lastmod set
├── src/                   Build-time source — the real place to make edits
│   ├── partials/          Shared, reusable HTML fragments
│   │   ├── homepage-header.html   Site header + mobile menu (all non-journal pages)
│   │   ├── site-footer.html       Site footer (Instagram strip, nav, baseline)
│   │   ├── journal-header.html    Journal .jheader (uses {{ROOT}} for relative links)
│   │   └── journal-footer.html    Journal .jfooter (uses {{ROOT}} for relative links)
│   └── pages/              One file per deployed page, mirrors the output path
│       ├── index.html              → builds to /index.html
│       ├── our-craft.html          → builds to /our-craft.html
│       ├── faq.html                → builds to /faq.html
│       ├── collections/*.html      → builds to /collections/*.html
│       ├── real-weddings/*.html    → builds to /real-weddings/*.html
│       └── journal/*.html          → builds to /journal/*.html
├── scripts/
│   └── build.ps1           Assembles src/pages/ + src/partials/ into the files above
├── css/                    Stylesheets, loaded in numbered order (order matters)
│   ├── 00-tokens.css       Design tokens (:root) — single source of truth, load first
│   ├── 01-base.css         Resets, typography, shared utilities
│   ├── 02-header-nav.css   Fixed header + mobile menu
│   ├── 03-hero.css         Cinematic hero slider (Ken Burns, reveals, nav) + button classes
│   ├── 04-sections.css     Trust strip, collections, gallery, story, reviews, CTA, journal cards
│   ├── 05-contact.css      Consultation quote-card + form components
│   ├── 06-footer.css       Footer (gallery strip, nav, baseline)
│   ├── 07-responsive.css   Responsive nav/general overrides + focus styles — must load last
│   ├── 08-craft.css        Solid-header variant, page hero, process steps (our-craft + collections)
│   ├── 09-journal.css      Journal-only layout (header/hero/grid/article/footer, breadcrumb)
│   ├── 10-collections.css  Collection pages (price line, shade chips, CTA row, lookbook strip)
│   └── 11-faq.css          FAQ accordion (native details/summary, no JS)
├── js/                     Scripts, loaded in order at end of <body> (shared global scope)
│   ├── ui.js               Header scroll state, mobile menu, scroll reveals, back-to-top
│   ├── hero.js             Hero slider engine (autoplay, swipe, keyboard, progress dots)
│   ├── gallery.js          Gallery category filtering
│   └── inquiry.js          Form validation, honeypot, Formspree submission, ?interest= prefill
├── images/                 Optimized JPGs (max 1920px wide, q≈82)
├── collections/            GENERATED — see src/pages/collections/
│   └── index.html + 7 collection pages (pouches, crowns, flower girl, ring bearer,
│       bridesmaid, bouquets & boutonnieres, keepsakes)
├── real-weddings/          GENERATED — see src/pages/real-weddings/
│   └── index.html + styled editorial features; framed honestly as editorials until
│       real client weddings are submitted (the hub invites past brides to share)
└── journal/                GENERATED — do not edit directly, see src/pages/journal/
    └── index.html, *.html  Journal index + six posts, each with visible breadcrumb
        + BreadcrumbList schema (Phase D)
```

**Website 2.0 Phase B (brand & IA repositioning) is live in this structure:** the
customer-facing Theme Customizer was retired (its four palettes are archived in
`docs/reference-theme-palettes.md`), the two duplicate collection-browsing sections
were merged into one 6-card grid, the Our Story section was promoted to a full
`our-craft.html` page, the consultation form moved to the end of the homepage funnel,
and all primary CTAs now lead to the on-site consultation ("Begin Your Custom Order")
with Etsy demoted to a quiet footer/reviews-strip link. `{{ROOT}}` in partials
resolves to `./` at the site root so shared nav links work as same-page anchors on
the homepage and as canonical-`/` links from every other page.

## Architectural decisions

**ADR-1: Static HTML over React/Next.js.** The site deploys to Apache shared hosting
with no runtime build pipeline. A framework would add ~100KB+ JS, a build step, and
hosting constraints for zero visual gain on a content site this size. All
interactivity is vanilla ES6 (~17KB total, unminified). The `scripts/build.ps1`
templating step (see above) doesn't change this — it runs once at author-time on a
developer's machine, not in the browser or on the server.

**ADR-2: Numbered CSS files, classic scripts in order.** Files concatenate in the same
cascade order as the original single file. Scripts are classic (not modules) sharing
global scope deliberately — `ui.js` declares elements later files may reference. Do
not reorder the `<link>`/`<script>` tags in `src/pages/index.html`.

**ADR-3 (resolved): journal no longer duplicates the design tokens.** The former
`journal/blog.css` redeclared its own `:root` token block, which drifted from
`css/01-base.css` over time. It's been replaced by `css/09-journal.css`, which loads
after `css/00-tokens.css` + `css/01-base.css` and only overrides the handful of
properties the journal intentionally keeps different (`--max-w: 1200px` vs. the
site's 1400px, 32px container padding vs. 48px, no heading letter-spacing). Token
changes now only need to happen in `css/00-tokens.css`.

**ADR-4: Client-side blog pagination.** Six posts don't justify multiple index pages.
Pagination uses `#page-N` hashes (shareable, back-button friendly). If the blog grows
past ~15 posts, split into real paginated pages for SEO.

**ADR-5: Build-time HTML partials, not a runtime framework.** Header, footer, and
theme-customizer markup previously had to be hand-edited in up to 8 files with no
mechanism to keep them in sync (the homepage header and journal header were already
two separately-maintained implementations). `scripts/build.ps1` resolves
`<!-- INCLUDE:partial-name -->` markers in `src/pages/*.html` against
`src/partials/*.html` at author-time, and substitutes `{{ROOT}}` with the correct
relative path prefix (`''` at the site root, `'../'` one level deep, etc.) so the same
partial works from any page depth. This is plain PowerShell (no Node/npm required) so
it runs on the same Windows machine used to edit the site.

## Design tokens (css/00-tokens.css)

| Token             | Value            | Use                        |
|-------------------|------------------|----------------------------|
| --espresso        | #33251E          | Headings, footer, dark UI  |
| --parchment       | #FAF6F3          | Warm page background       |
| --brass           | #C59F8B          | Primary accent, buttons    |
| --terracotta-rose | #9C7360          | Secondary accent, links    |
| --moss            | #8A9A7E          | Success states             |
| --linen           | #F1E5DE          | Soft section backgrounds   |
| --font-display    | Cormorant, serif | Headings, editorial voice  |
| --font-body       | Jost, sans-serif | Body, UI, labels           |
| --max-w           | 1400px           | Page width (journal overrides to 1200px) |
| --space-1…8       | 8px – 130px      | Spacing scale (new in Website 2.0 — not yet required everywhere) |
| --text-xs…2xl     | 11.5px – clamp(34px,4.6vw,56px) | Type scale (same status as spacing scale) |

The Atelier Customizer was retired in Website 2.0 Phase B — the brand palette is now
fixed as a trust signal. The four palettes it offered are archived in
`docs/reference-theme-palettes.md` for future seasonal/mood-board use.

## Common edits

**Anything touching the header, footer, or theme customizer:** edit the matching file
in `src/partials/`, then run `powershell -File scripts/build.ps1`.

**Anything specific to one page:**
- **Add or edit a collection page:** copy an existing file in
  `src/pages/collections/`, update title/meta/canonical/schema/copy, and give its
  primary CTA an `?interest=<value>#consultation` link where `<value>` exactly
  matches an option in the consultation form's dropdown (`src/pages/index.html`) —
  that's what pre-selects the topic when a visitor arrives from the page
  (js/inquiry.js). Add the page to `src/pages/collections/index.html`, sitemap.xml,
  and (if featured) the homepage grid. Rebuild after editing.
- **Change hero slides:** `src/pages/index.html`, `<article class="hero-slide">`
  blocks. Keep exactly one `<h1>` (slide 1); other slides use
  `<p class="hero-title">`. Rebuild after editing.
- **Add a gallery photo:** duplicate a `.gallery-item` anchor in
  `src/pages/index.html`, set `data-category` to one of: pouches | crowns |
  flowergirls | party. Rebuild after editing.
- **Add a blog post:** copy an existing post file in `src/pages/journal/`, update
  title/meta/schema/body, add a card to `src/pages/journal/index.html` (pagination
  adapts automatically), add the URL to sitemap.xml, and link it from the homepage
  cards if desired. Rebuild after editing.
- **Swap a review:** `src/pages/index.html`, `.quote-chip` blocks. Keep quotes
  verbatim from real Etsy reviews with first names only. Rebuild after editing.

After any edit under `src/`, always run `powershell -File scripts/build.ps1` before
committing — the generated files in the repo root and `journal/` need to stay in
sync with their source.

## Performance status (Website 2.0 Phase F)

Done: Google Fonts trimmed to the weights actually used (Cormorant 300/400/500 +
italic 400/500, Jost 300/400/500 — the unused 600s are gone); `images/archive-unused/`
(~2MB of dead assets) deleted for real; LCP hero image preloaded on the homepage;
`<lastmod>` on every sitemap URL; custom `404.html` (standalone with absolute URLs,
since Apache serves it at any failed path — deliberately NOT built from partials,
whose relative links would break there).

**Deferred — needs tooling not present on this machine (no Node/Python/ImageMagick/
cwebp):** WebP/AVIF conversion of the JPEG library, and CSS/JS minification+bundling.
When tooling is available: convert `images/*.jpg` to WebP with JPEG fallback via
`<picture>`, and minify the numbered CSS files in load order into one bundle (same
for JS, preserving the documented script order). Until then the site ships unminified
JPEG-only, exactly as before Phase F.

## Launch checklist

1. Run `powershell -File scripts/build.ps1` to regenerate the deployed HTML from
   `src/`, then upload ALL files/folders to the web root of ivoryandbloom.shop (keep
   existing .htaccess). Do not upload `src/` or `scripts/` — they're author-time only
   and unused by the live site, though harmless if included.
1b. Add `ErrorDocument 404 /404.html` to the server's .htaccess so the custom
   404 page is actually served for broken links.
2. **Contact form:** create a free form at formspree.io using
   michelleinbox99@gmail.com, then in js/contact.js replace
   `https://formspree.io/f/YOUR_FORM_ID` with your real endpoint. Until then the
   form shows a friendly error and inquiries are NOT delivered.
3. Google Search Console → submit https://ivoryandbloom.shop/sitemap.xml
4. Share the homepage URL in a private message to yourself to confirm the social
   preview image renders.

## Testing

Every phase was regression-tested headlessly (Chromium/Playwright): hero navigation
and autoplay, gallery filtering, theme persistence, form validation/honeypot/mock
submission, back-to-top, mobile menu, and zero horizontal overflow at 390/768/1440px.
Re-run equivalent manual checks after significant edits.
