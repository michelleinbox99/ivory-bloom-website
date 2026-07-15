# Ivory & Bloom — Component Reference Guide

A living document of component standards, patterns, and token usage. This formalizes the design system already implemented across the website and serves as the reference for any new components.

**Location:** `css/00-tokens.css` is the single source of truth for all design tokens. Use these tokens exclusively in all component CSS.

---

## Design Tokens

### Color Tokens

All colors are defined in `:root` and organized by purpose:

**Primary Palette (Blush Pearl & Cocoa)**
- `--espresso` `#33251E` — Primary text, headings, dark UI
- `--ink-soft` `#4A3B33` — Body copy (default text)
- `--terracotta-rose` `#9C7360` — Links, secondary emphasis
- `--brass` `#C59F8B` — Accent highlights, icons, hover states
- `--moss` `#8A9A7E` — Success states only

**Backgrounds**
- `--white` `#FFFFFF` — Default backgrounds
- `--parchment` `#FAF6F3` — Page heroes, warm bands, email capture
- `--linen` `#F1E5DE` — Alternating sections, borders, chips

**Semantic Colors (derived from primary palette)**
- `--text-muted` `#8A7E74` — Secondary text, captions, less emphasis
- `--text-lighter` `#A8988B` — Disabled states, inactive elements
- `--border-light` `#CBBBA9` — Input borders, dividers, subtle separators
- `--placeholder` `#9A8F82` — Form placeholder text
- `--champagne` `#E9C9AE` — Golden eyebrow accent (from design doc)
- `--bg-soft` `#DCCDBF` — Card backgrounds, soft containers
- `--bg-faint` `#FBEEEC` — Very light backgrounds for subtle sections
- `--error` `#8A4137` — Error states, warnings, validation failures
- `--success` `#465B3C` — Success states, confirmations, checkmarks

**Usage rule:** Never use hardcoded hex values in component CSS. Always use a token. If a color doesn't have a token, add it to `00-tokens.css` first, then use it.

### Typography Tokens

- `--font-display` `'Cormorant', serif` — Headings, editorial display
- `--font-body` `'Jost', sans-serif` — Body text, UI labels

**Type Scale** (always use these, never hardcoded px)
- `--text-xs` `11.5px` — Smallest (labels, captions)
- `--text-sm` `13px` — Small
- `--text-base` `16px` — Default
- `--text-md` `19px` — Medium emphasis
- `--text-lg` `26px` — Large
- `--text-xl` `clamp(28px, 3.6vw, 44px)` — Responsive, medium heading
- `--text-2xl` `clamp(34px, 4.6vw, 56px)` — Responsive, main heading

### Spacing Tokens

Use these for all padding, margin, and gap values:
- `--space-1` `8px`
- `--space-2` `16px`
- `--space-3` `24px`
- `--space-4` `32px`
- `--space-5` `48px`
- `--space-6` `64px`
- `--space-7` `96px`
- `--space-8` `130px`

### Effect Tokens

**Shadows**
- `--shadow-light` `0 2px 8px rgba(51, 37, 30, 0.08)` — Subtle cards
- `--shadow-medium` `0 8px 24px rgba(51, 37, 30, 0.12)` — Medium lift
- `--shadow-deep` `0 40px 80px rgba(51, 37, 30, 0.14)` — Hero shadows

**Transitions**
- `--transition-fast` `0.2s ease` — Quick feedback
- `--transition-normal` `0.3s ease` — Default (hover, focus)
- `--transition-slow` `0.6s ease` — Entrance animations

---

## Component Patterns

### Forms

**Input Fields**
- Style: Underline-only (border-bottom)
- Border color: `var(--border-light)`
- Text color: `var(--espresso)`
- Placeholder color: `var(--placeholder)`
- Focus state: Border changes to `var(--terracotta-rose)`
- Error state: Border changes to `var(--error)`
- Tap target: Minimum 44×44px

**Form Labels**
- Font: Jost uppercase, 11–12px
- Color: `var(--terracotta-rose)`
- Position: Above the input field
- Always visible (never placeholder-as-label)

**Buttons**
- Four registers, same shape (2px radius, uppercase):
  1. `btn-primary` — Brass fill, rotate-y shine on hover (the one permitted flourish)
  2. `btn-ghost` — White outline (use on photo backgrounds)
  3. `btn-outline-dark` — Espresso outline (secondary action)
  4. `etsy-quiet` — Plain underlined text (lowest priority)
- Padding: `14–16px` h × `34px` w
- Font: Jost uppercase, 11.5–12.5px
- Copy: Always an invitation ("Begin Your Custom Order"), never "Buy Now"
- Hover transition: Use `var(--transition-normal)`

**Form Status Messages**
- Success: Background `#EEF3EA`, text `var(--success)`, border `#CFDDC5`
- Error: Background `var(--bg-faint)`, text `var(--error)`, border `#F0CFC8`
- Font size: 14px
- Display: Initially hidden, show with `.form-status.show` class

### Cards

**Product/Category Cards**
- Image ratio: 4:5
- Image hover: Scale 1.07 over 0.9s
- Background: `var(--linen)`
- Shadow: None (images only)
- Text-light: Name + calm price + brass arrow

**Journal/Story Cards**
- Border: 1px solid `var(--linen)`
- Background: `var(--white)`
- Shadow: `var(--shadow-medium)`
- Border radius: 4px
- Entrance: Fade-up reveal on scroll, 0.7s

**Quote Card (Consultation)**
- Grid: 1fr 1.15fr (image + form)
- Shadow: `var(--shadow-deep)`
- Responsive: Single column below 900px

### Sections

**Section Container**
- Max width: `var(--max-w)` (1400px)
- Padding: `0 48px` (horizontal)
- Vertical padding: Default `130px`, adjustable per section

**Section Header**
- Eyebrow: Jost uppercase, `var(--brass)`, tracked 0.26em
- Heading: Cormorant, size `clamp(32px, 4vw, 50px)`, weight 400
- Subheading: 16px, `var(--terracotta-rose)`, weight 300

**Background Variations**
- `.bg-white` — `var(--white)`
- `.bg-parchment` — `var(--parchment)`
- `.bg-linen` — `var(--linen)`

**Rhythm rule:** Sections alternate white / linen / parchment; never two identical adjacent.

### Navigation

**Header**
- Fixed position, transparent over hero
- On scroll: Transitions to white background (`.solid-header` class)
- Links: Maximum 5 items
- CTA: One primary button
- Font: Jost body weight

**Footer**
- Full index of all navigation
- Instagram strip
- Newsletter capture
- Quiet Etsy link (demotion tier)

### Typography Hierarchy

**Every section follows this pattern:**
1. Eyebrow (tracked-uppercase, `var(--brass)`)
2. Heading (Cormorant, large, light leading)
3. One short warm paragraph

**Forbidden:** Neon, cold grays, pure black, digital gradients, discount-red.

---

## CSS Architecture

The stylesheet is organized in numbered layers, each building on the previous:

| File | Purpose |
|------|---------|
| `00-tokens.css` | Design tokens (colors, type, spacing, effects) |
| `01-base.css` | Global resets, typography defaults, accessibility |
| `02-header-nav.css` | Header, navigation, sticky behavior |
| `03-hero.css` | Hero section, carousels, full-bleed imagery |
| `04-sections.css` | General section layout, grids, content patterns |
| `05-contact.css` | Contact form, quote cards, form validation |
| `06-footer.css` | Footer layout, newsletter, social |
| `07-responsive.css` | Media queries, mobile breakpoints |
| `08-craft.css` | Craftsmanship display, product details, custom elements |
| `09-journal.css` | Blog/journal styles (narrower measure, article typography) |
| `10-collections.css` | Product collection pages |
| `11-faq.css` | FAQ accordion patterns |
| `12-about.css` | About/founder page styles |
| `13-reviews.css` | Testimonials, reviews, social proof |

**Load order in HTML:** Always load `00-tokens.css` first, then the others in order.

---

## Testing for Consistency

After any component change:

1. **Visual regression:** Browse affected pages in desktop and mobile viewports
2. **Token compliance:** Grep component CSS for hardcoded hex values — should find zero
3. **Color contrast:** Run affected sections through WCAG contrast checker (4.5:1 for text)
4. **Interaction:** Test hover, focus, and disabled states on buttons/inputs
5. **Responsive:** Verify the component works from 375px (mobile) to 1920px (desktop)

---

## Adding New Components

When adding a new component:

1. **Check tokens first:** Can it use existing tokens?
2. **If not:** Add the token(s) to `00-tokens.css` with clear semantic naming
3. **Create the component CSS** in the appropriate layer file
4. **Use tokens exclusively** — no hardcoded values
5. **Document the pattern** in this file under **Component Patterns**
6. **Test for consistency** — visual, contrast, interaction

---

## Approval Test

**For any new page or section:** *"Does this feel like a luxury bridal boutique or a generic online store?"*

Five-word brief: **Elegant, Romantic, Timeless, Handcrafted, Premium.**

If it doesn't feel like those five words, redesign it.
