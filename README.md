# Ivory & Bloom Atelier — Website 2.0

Handmade luxury bridal accessories. Static site, zero dependencies, deployable to any
Apache/shared host. Live at https://ivoryandbloom.shop/

## Folder structure

```
/
├── index.html            Homepage (structure + content only — no inline CSS/JS)
├── robots.txt            Crawler rules → points to sitemap
├── sitemap.xml           All 8 pages, priorities set
├── css/                  Stylesheets, loaded in numbered order (order matters)
│   ├── 01-base.css       Design tokens (:root), resets, typography, shared utilities
│   ├── 02-header-nav.css Fixed header + mobile menu
│   ├── 03-hero.css       Cinematic hero slider (Ken Burns, reveals, nav)
│   ├── 04-sections.css   Trust strip, collections, gallery, story, reviews, CTA, journal cards
│   ├── 05-contact.css    Consultation quote-card + form components
│   ├── 06-footer.css     Footer (gallery strip, nav, baseline)
│   └── 07-customizer.css Theme customizer panel + responsive nav rules
├── js/                   Scripts, loaded in order at end of <body> (shared global scope)
│   ├── ui.js             Header scroll state, mobile menu, scroll reveals, back-to-top
│   ├── hero.js           Hero slider engine (autoplay, swipe, keyboard, progress dots)
│   ├── gallery.js        Gallery category filtering
│   ├── contact.js        Form validation, honeypot, Formspree submission
│   └── customizer.js     Accent theme switching + localStorage persistence
├── images/               Optimized JPGs (max 1920px wide, q≈82)
└── journal/              Blog (self-contained)
    ├── index.html        Journal index with client-side pagination (#page-N deep links)
    ├── blog.css          Blog-only styles (duplicates tokens intentionally — see ADR-3)
    └── *.html            Six posts, each with BlogPosting schema
```

## Architectural decisions

**ADR-1: Static HTML over React/Next.js.** The site deploys to Apache shared hosting
with no build pipeline. A framework would add ~100KB+ JS, a build step, and hosting
constraints for zero visual gain on a content site this size. All interactivity is
vanilla ES6 (~17KB total, unminified).

**ADR-2: Numbered CSS files, classic scripts in order.** Files concatenate in the same
cascade order as the original single file, so behavior is byte-identical to the
monolith. Scripts are classic (not modules) sharing global scope deliberately —
`ui.js` declares elements later files may reference. Do not reorder the tags in
index.html.

**ADR-3: journal/blog.css duplicates the design tokens.** Blog pages stay
self-contained so a post can be edited/added without touching homepage CSS. If tokens
change (rebrand), update both `css/01-base.css` and `journal/blog.css`.

**ADR-4: Client-side blog pagination.** Six posts don't justify multiple index pages.
Pagination uses `#page-N` hashes (shareable, back-button friendly). If the blog grows
past ~15 posts, split into real paginated pages for SEO.

## Design tokens (css/01-base.css)

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

The Atelier Customizer (js/customizer.js) overrides these tokens at runtime; the four
theme palettes are defined in that file.

## Common edits

- **Change hero slides:** index.html, `<article class="hero-slide">` blocks. Keep
  exactly one `<h1>` (slide 1); other slides use `<p class="hero-title">`.
- **Add a gallery photo:** duplicate a `.gallery-item` anchor, set `data-category` to
  one of: pouches | crowns | flowergirls | party.
- **Add a blog post:** copy an existing post file in journal/, update title/meta/
  schema/body, add a card to journal/index.html (pagination adapts automatically),
  add the URL to sitemap.xml, and link it from the homepage cards if desired.
- **Swap a review:** index.html, `.quote-chip` blocks. Keep quotes verbatim from real
  Etsy reviews with first names only.

## Launch checklist

1. Upload ALL files/folders to the web root of ivoryandbloom.shop (keep existing
   .htaccess).
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
