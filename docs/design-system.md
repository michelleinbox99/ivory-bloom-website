# Ivory & Bloom Atelier — Website 2.0 Luxury Design System

The creative-direction reference for the site. This formalizes the system already
implemented across Phases A–F and the homepage transformation, so every rule below is
live and verifiable in the codebase (design tokens in `css/00-tokens.css`, components
across the numbered stylesheets). Companion docs: `homepage-wireframe.md` (journey &
section strategy) and `reference-theme-palettes.md` (retired customizer palettes).

---

## 1. Brand Direction

**Position:** A luxury personalized bridal atelier creating timeless wedding keepsakes.

- **Brand personality — the trusted artisan confidante.** Not a store, not a
  marketplace seller: a maker a bride corresponds with. Speaks in the first person,
  names its materials, and admits how long things take because the wait is part of the
  value. Quietly confident, never salesy; it invites rather than urges.
- **Emotional tone — romance held in restraint.** Golden-hour light, pressed satin, a
  handwritten note in a gift box. Sentiment expressed through specific detail ("strung
  pearl by pearl on doubled, waxed cord"), never superlatives. The customer should feel
  *seen*, not sold to.
- **Customer perception — the three beliefs.** Within two minutes a bride should
  believe: (1) *this is made by real hands, one at a time*; (2) *this will be made for
  me specifically* — my colors, my party, my quantities; (3) *this will outlast the
  wedding*. Target perception: "private atelier I discovered," never "shop I scrolled
  past."
- **Luxury positioning — scarcity of attention, not price theater.** One maker, ~two
  weeks per order, cut after purchase. Signals: a fixed palette never modifiable by the
  visitor (why the Theme Customizer was retired); generous white space; prices stated
  calmly or by consultation, never discounted; Etsy demoted to a quiet footnote; the
  consultation — a conversation — as the primary act of purchase. **Craftsmanship
  before price, emotion before features.**

---

## 2. Visual System

### Colors — "Blush Pearl & Cocoa" (fixed; never per-visitor, never seasonal on core site)

| Role | Token | Hex | Use |
|---|---|---|---|
| Primary | `--espresso` | `#33251E` | Headings, dark UI, footer band, inverse buttons — the brand's "ink." |
| Primary text | `--ink-soft` | `#4A3B33` | Body copy — softened espresso, never pure black. |
| Secondary | `--terracotta-rose` | `#9C7360` | Links, sub-copy, price lines, secondary emphasis. |
| Accent | `--brass` | `#C59F8B` | The jewelry of the system: eyebrows, icons, button fill, stars, hover. Sparingly. |
| Accent (reserve) | `--moss` | `#8A9A7E` | Success states only. |
| Background 1 | `--white` | `#FFFFFF` | Default field. |
| Background 2 | `--parchment` | `#FAF6F3` | Page heroes, warm bands, email-capture. |
| Background 3 | `--linen` | `#F1E5DE` | Alternating soft sections, borders, chips. |

**Rhythm rule:** sections alternate white / linen / parchment; never two identical
adjacent. **Forbidden:** neon, cold grays, pure black, digital-looking gradients,
discount-red.

### Typography

| Layer | Face | Weights | Voice |
|---|---|---|---|
| Headings | Cormorant (serif) | 400–500, italic 400–500 | Editorial bridal-magazine display; large, light, generous leading. |
| Body | Jost (geometric sans) | 300 body, 400–500 UI | Premium simplicity; 15–16.5px. |
| Accent | Cormorant *italic* | 400 | The "handwritten" register: emphasized headline words, pull quotes, signature, tag-pills. |
| Whisper | Jost uppercase | 500, 0.15–0.26em tracking, 11–12.5px | Eyebrows, buttons, labels, breadcrumbs. |

Scale: `--text-xs` → `--text-2xl` (11.5px → clamp 34–56px). Hierarchy formula on every
section: tracked-uppercase eyebrow → large Cormorant statement → one short warm
paragraph. Only used weights load (Cormorant 300/400/500 + italic 400/500, Jost
300/400/500).

### UI Elements

- **Buttons** — four registers, one shape (2px radius, uppercase Jost, 15×34px):
  `btn-primary` (brass fill, shine-sweep on hover — the one permitted flourish);
  `btn-ghost` (white outline, for photo backgrounds); `btn-outline-dark` (espresso
  outline, secondary); `etsy-quiet` (plain underlined text — the demotion tier). Copy
  is always an invitation ("Begin Your Custom Order"), never "Buy Now."
- **Cards** — image-led, text-light. Category cards: 4:5 image, 0.9s scale-on-hover,
  name + calm price + brass arrow slide-in. Journal/story cards: bordered white, −8px
  lift + soft espresso shadow. Reveal on scroll with a 0.7s fade-up.
- **Product (collection) layout** — parchment page-hero (eyebrow / H1 / italic price
  line) → split-section (image + tag-pill, check-listed craft details, shade chips, CTA
  row + lead-time note) → linen lookbook strip → cross-sell trio → consultation. Every
  product page ends in the consultation, not a cart.
- **Navigation** — fixed, transparent-over-hero, frosting to white on scroll
  (`solid-header` on light pages). Five links max + one CTA. Footer is the full index:
  Instagram strip, newsletter, complete nav, quiet Etsy link.
- **Forms** — underline-only inputs (stationery feel), small tracked-uppercase labels
  above each field, placeholders as examples only, honeypot + live validation,
  moss/clay success/error states, 44×44px tap targets, lead-time note beside submit.
- **Testimonials** — real, named, schema-backed only. Cormorant italic quote,
  tracked-uppercase attribution, brass stars; 4.9/246 aggregate adjacent. Never
  invented or paraphrased.
- **CTA sections** — full-bleed photo, left-weighted espresso scrim, champagne eyebrow
  (`#E9C9AE`), emotional headline, primary + ghost pair. One per page, before the
  footer or consultation.

---

## 3. Photography Style

- **Hero** — cinematic, full-bleed, golden-hour/soft-overcast; a bride mid-moment,
  never posed at camera. Slow Ken Burns only, respecting `prefers-reduced-motion`. Warm
  grade matched to parchment — never cool/blue.
- **Bridal editorial** — fine-art wedding-magazine direction: movement, environmental
  depth, 4:5 portrait crops; emotion over symmetry, candid over stiff.
- **Product standards** — natural window light, no lightbox sterility. Two mandatory
  views per piece: the *detail* (pearl knots, gather folds) and the *styled flat lay*.
  Color-accurate above all, shot against neutral linen.
- **Lifestyle** — the piece in use on the day (pouch on a reception chair, in a flower
  girl's grip, the unboxing). Sells the memory, not the object.
- **Process** — the biggest current gap and top acquisition priority: hands at work —
  satin under the scissors, the half-gathered ruffle, pearls on waxed cord, the
  workroom table by the window. Honest, warm, slightly imperfect.

**Forbidden across all categories:** stock imagery, flash-lit product shots, cluttered
backgrounds, heavy filters.

---

**The approval test for any new page or section:** *"Does this feel like a luxury
bridal boutique or a generic online store?"* — and the five-word brief: **elegant,
romantic, timeless, handcrafted, premium.**
