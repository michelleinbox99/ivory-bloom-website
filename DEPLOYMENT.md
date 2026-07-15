# Ivory & Bloom — Deployment & QA Checklist

**Website 2.0 Final Deployment Guide**

This document provides step-by-step instructions for deploying the Website 2.0 redesign to production, along with a comprehensive QA checklist to verify everything works end-to-end.

---

## Pre-Deployment Checklist

### 1. Git Status
- [ ] All changes committed to `website-2.0-redesign` branch
- [ ] No uncommitted files: `git status` shows clean working tree
- [ ] Latest commit message is descriptive: `git log -1`
- [ ] Branch is up-to-date with remote: `git fetch && git status`

### 2. Build & Asset Generation
- [ ] Run build script: `scripts/build.ps1` (or equivalent)
- [ ] Verify all `.html` files are generated in project root
- [ ] Check `.htaccess` exists in project root (cache headers)
- [ ] Check `404.html` exists in project root
- [ ] Verify `sitemap.xml` includes all 26 key pages

### 3. File Integrity
- [ ] All CSS files load (no 404s in browser console)
- [ ] All JS files load (no 404s in browser console)
- [ ] All images load (no missing image tags in console)
- [ ] No hardcoded URLs to staging/development domains

### 4. Security
- [ ] Remove any test/debug code from JS
- [ ] Verify `Contact form endpoint` is production Formspree ID (`xzdnpdab`)
- [ ] Check no API keys or credentials are visible in code
- [ ] Review `.htaccess` for proper cache-control headers

---

## Deployment Steps

### Step 1: Prepare Remote
- [ ] SSH into hosting server
- [ ] Backup existing live files: `cp -r public_html public_html.backup.$(date +%Y%m%d)`
- [ ] Verify disk space available: `df -h`

### Step 2: Upload Files
```bash
# Option A: FTP/SFTP
# Use FileZilla or equivalent to upload all files to `public_html/`
# Make sure to include hidden files (`.htaccess`)

# Option B: Git (if server has git)
cd public_html
git fetch origin
git checkout website-2.0-redesign
# or git pull origin website-2.0-redesign
```

### Step 3: Set Permissions
```bash
# Make sure files are readable
chmod 644 *.html *.xml .htaccess
chmod 644 css/* js/*
chmod 755 images archive journal collections real-weddings
```

### Step 4: Clear Cache
- [ ] Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
- [ ] If using CDN, purge cache for all files
- [ ] If using Cloudflare, do full cache purge
- [ ] Wait 5 minutes for DNS/cache propagation

---

## Post-Deployment QA Checklist

### Phase 1: Functional Testing

#### Homepage (/)
- [ ] Page loads without errors (console clear)
- [ ] Hero carousel displays all 7 slides
- [ ] Slide transitions work (arrows + dot pagination)
- [ ] Button hover states work (brass → terracotta)
- [ ] "Begin Your Custom Order" CTA links to consultation
- [ ] Trust strip displays 4 icons + text
- [ ] Collections grid displays 7 cards
- [ ] Reviews section shows 4.9 rating + 3 testimonial chips
- [ ] Journal section shows 6 posts
- [ ] Footer displays correctly (Instagram strip, newsletter, nav)
- [ ] Mobile: hamburger menu opens/closes
- [ ] Responsive: layout reflows correctly at 375px, 768px, 1920px

#### Collections Pages (/collections/*)
- [ ] All 7 collection pages load: bridal-pouches, bouquets-boutonnieres, etc.
- [ ] Page hero displays correct title and description
- [ ] Split sections display with image on left/right
- [ ] FAQ accordion opens/closes smoothly
- [ ] CTA buttons link to consultation form
- [ ] "Also available on Etsy" link opens Etsy shop (new tab)
- [ ] Responsive: images stack vertically on mobile

#### About Page (/about.html)
- [ ] Page hero displays "Our Story"
- [ ] Founder credentials show: 13+ years, Decades of Design, Hundreds of Weddings
- [ ] Split sections display in alternating layout (image left/right)
- [ ] Images load correctly
- [ ] Craft process steps (1-4) display in grid
- [ ] "Begin Your Custom Order" CTA links to consultation

#### Journal Pages (/journal/*)
- [ ] Journal hub displays 6 posts
- [ ] Each post page loads without errors
- [ ] Breadcrumb navigation displays (Home > Journal > Post Title)
- [ ] Article body text is readable
- [ ] Post metadata displays correctly (author, date, read time)
- [ ] Navigation links work (next/prev posts if available)

#### Consultation Form (homepage #consultation)
- [ ] Form inputs are visible and clickable
- [ ] Labels display above inputs (not placeholders)
- [ ] Required fields show validation messages when empty
- [ ] Submit button says "Request a Custom Quote" or "Begin Your Custom Order"
- [ ] Form submission loading state shows spinner + "Sending..."
- [ ] Success message displays after submission
- [ ] Network tab shows POST to `formspree.io/f/xzdnpdab`

#### Newsletter Signup (footer)
- [ ] Email input displays
- [ ] Submit button displays
- [ ] Email validation works (reject invalid emails)
- [ ] Success message displays ("Check your inbox...")
- [ ] Network tab shows POST to newsletter endpoint

#### Love Notes Page (/love-notes.html)
- [ ] Page hero displays "Love Notes"
- [ ] Aggregate rating band shows 4.9 stars + 246 reviews
- [ ] Review cards display in grid (3 columns on desktop)
- [ ] Review text is readable
- [ ] Review hover state lifts card slightly
- [ ] Customer gallery displays 6 images
- [ ] Gallery images have hover zoom effect

---

### Phase 2: Performance Testing

#### Lighthouse Audit
- [ ] Run Chrome DevTools > Lighthouse (desktop)
  - [ ] Performance: >= 80
  - [ ] Accessibility: >= 90
  - [ ] Best Practices: >= 90
  - [ ] SEO: >= 90
- [ ] Run Lighthouse (mobile)
  - [ ] Performance: >= 70 (Core Web Vitals focus)
  - [ ] Accessibility: >= 90
  - [ ] SEO: >= 90

#### Core Web Vitals
- [ ] **Largest Contentful Paint (LCP):** < 2.5s (aim for < 2.0s)
  - Use Chrome DevTools Performance tab
  - Identify which element is LCP (hero image, typically)
  - Verify `fetchpriority="high"` and `preload` tags are working
- [ ] **First Input Delay (FID):** < 100ms
  - Typically not an issue for static sites; JS should not block input
  - Check DevTools Performance tab for long tasks
- [ ] **Cumulative Layout Shift (CLS):** < 0.1
  - Visually verify page doesn't jump as it loads
  - Hero carousel should not shift after load
  - Images should have width/height attributes

#### Image Optimization
- [ ] Hero image loads with `srcset` and `sizes` attributes
- [ ] Network tab shows appropriately-sized image for device
- [ ] Images load via HTTPS (no mixed content warnings)
- [ ] SVG icons are inline (not fetched as separate requests)

#### CSS & JS Optimization
- [ ] CSS files load (all 14 files, 88K total)
- [ ] JS files load (4 files, 28K total)
- [ ] No console warnings about missing resources
- [ ] Minified: check if CSS/JS are minified (optional; currently human-readable for development)

#### Caching
- [ ] `.htaccess` is present in project root
- [ ] Response headers show Cache-Control (Network tab)
  - `Cache-Control: public, max-age=3600` for HTML (1 hour)
  - `Cache-Control: public, max-age=86400` for CSS/JS (1 day)
  - `Cache-Control: public, max-age=2592000` for images (30 days)
  - `Cache-Control: public, max-age=31536000` for fonts (1 year)

---

### Phase 3: SEO & Schema Testing

#### Meta Tags
- [ ] Homepage has `<title>` tag
- [ ] All pages have `<meta name="description">` tag (< 160 characters)
- [ ] Canonical URLs are correct on all pages (e.g., `https://ivoryandbloom.shop/about.html`)
- [ ] Open Graph tags are present (og:title, og:description, og:image)
- [ ] Twitter Card tags are present (twitter:card, twitter:title, twitter:image)

#### Structured Data (Schema.org)
- [ ] Use [Google Rich Results Test](https://search.google.com/test/rich-results) to validate:
  - [ ] Homepage: LocalBusiness schema with AggregateRating (4.9/246)
  - [ ] Collection pages: Product schema + BreadcrumbList
  - [ ] Journal pages: BlogPosting schema + BreadcrumbList
  - [ ] About page: ProfilePage schema
  - [ ] Love Notes page: Review schema
  - [ ] FAQ sections: FAQPage schema
- [ ] No schema validation errors in console

#### Breadcrumbs
- [ ] Use [Google Search Console](https://search.google.com/search-console) to verify:
  - [ ] Breadcrumbs render in search results preview
  - [ ] BreadcrumbList schema is recognized
  - [ ] Navigation path is correct (Home > Collections > [Product])

#### Sitemap
- [ ] Load `https://ivoryandbloom.shop/sitemap.xml` in browser
- [ ] Verify it returns valid XML (no 404)
- [ ] Count URLs (should be ~26)
- [ ] Submit to Google Search Console (Search Console > Sitemaps > Add/test sitemap)

---

### Phase 4: Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements (buttons, links, form inputs)
- [ ] Tab order is logical (left-to-right, top-to-bottom)
- [ ] No keyboard traps (can always tab away from interactive elements)
- [ ] Buttons and links respond to Enter key
- [ ] Form inputs respond to Tab, arrow keys, and text input

#### Color Contrast
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) on key text:
  - [ ] Body copy on white: 4.5:1 minimum (WCAG AA)
  - [ ] Headings on white: 4.5:1 minimum
  - [ ] Light text on dark backgrounds: 4.5:1 minimum
  - [ ] Button text: 4.5:1 minimum

#### Screen Reader (NVDA/JAWS/VoiceOver)
- [ ] Headings are semantic (H1, H2, H3, not div + CSS)
- [ ] Form labels are associated with inputs (not placeholders)
- [ ] Images have descriptive alt text
- [ ] Links have descriptive text (not "click here")
- [ ] Navigation structure is clear
- [ ] Page title is descriptive

#### Mobile Accessibility
- [ ] Tap targets are at least 44×44px (buttons, links)
- [ ] Text is readable without zooming
- [ ] Horizontal scrolling does not occur
- [ ] Touch interactions work (no hover-only interfaces)

---

### Phase 5: Browser & Device Compatibility

#### Desktop Browsers
- [ ] Chrome (latest): all pages load, no console errors
- [ ] Firefox (latest): all pages load, no console errors
- [ ] Safari (latest): all pages load, no console errors
- [ ] Edge (latest): all pages load, no console errors

#### Mobile Devices
- [ ] iPhone 12/14 (Safari): responsive layout, touch interactions work
- [ ] Android device (Chrome): responsive layout, touch interactions work
- [ ] iPad (Safari): layout adapts to tablet, touch interactions work
- [ ] Tablet device (Chrome): layout adapts, no issues

#### Responsive Breakpoints
- [ ] 375px (mobile): single column, hamburger menu
- [ ] 768px (tablet): 2-column where applicable, nav shows
- [ ] 1024px (desktop): 3+ columns, full nav
- [ ] 1920px (large desktop): optimal spacing, content doesn't stretch

---

### Phase 6: Forms & User Interactions

#### Consultation Form
- [ ] Submit empty: shows validation errors on all 4 required fields
- [ ] Submit with invalid email: shows "Invalid email" error
- [ ] Submit with missing Message: shows error for required field
- [ ] Submit valid form: shows "Sending..." state, then success message
- [ ] Error fallback works: if submission fails, shows error message
- [ ] Success message is readable and shows "Thank you..."

#### Newsletter Signup
- [ ] Submit empty: shows validation error
- [ ] Submit with invalid email: shows validation error
- [ ] Submit valid email: shows success message
- [ ] Honeypot field works: auto-bots filling it are silently rejected

#### Mobile Form Interactions
- [ ] Form labels are readable on mobile
- [ ] Input fields are large enough to tap
- [ ] Keyboard doesn't cover form (form scrolls into view on mobile)
- [ ] Submit button doesn't have hover-only states

---

### Phase 7: Social & External Links

#### Social Links
- [ ] Instagram link opens in new tab (`target="_blank"`)
- [ ] Pinterest link opens in new tab
- [ ] Facebook link opens in new tab
- [ ] Etsy shop link opens in new tab

#### Social Sharing
- [ ] Twitter share links work (e.g., journal posts)
- [ ] Pinterest save button works (e.g., for product images)
- [ ] Facebook Open Graph preview renders correctly (test via [Facebook Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Twitter Card preview renders correctly

#### External Forms
- [ ] Formspree endpoint is live (test form submission)
- [ ] Newsletter endpoint is live (test signup)
- [ ] Etsy shop is accessible

---

### Phase 8: 404 Error Page
- [ ] Navigate to `/this-page-does-not-exist`
- [ ] Custom 404 page displays (not generic server error)
- [ ] 404.html contains:
  - [ ] Large "404" number
  - [ ] "This Page Isn't Here" heading
  - [ ] "Return Home" button (links to /)
  - [ ] "Browse Collections" button
  - [ ] Footer navigation
- [ ] Buttons are clickable and link correctly
- [ ] Page uses brand colors and fonts

---

### Phase 9: Monitoring & Analytics

#### Uptime Monitoring
- [ ] Set up uptime monitoring (e.g., [Pingdom](https://www.pingdom.com/))
- [ ] Alert emails send if site is down
- [ ] Response time is logged

#### Analytics Setup
- [ ] Google Analytics is installed (if desired)
- [ ] Google Search Console is connected
- [ ] Formspree submissions are being logged (check form endpoint)
- [ ] Newsletter signups are being tracked (if applicable)

---

## Performance Optimization Tips

If Lighthouse scores are low:

### Performance (LCP/FID/CLS)
1. **Reduce image sizes:**
   - Use WebP format with JPEG fallback
   - Optimize responsive `srcset` to serve smallest image for device
   - Remove unused images from `/images/archive`

2. **Reduce CSS/JS:**
   - Critical CSS (hero, above-the-fold) can be inlined in `<head>`
   - Defer non-critical JS: add `defer` attribute to scripts
   - Remove unused CSS (currently all CSS is used, but re-check if you add new styles)

3. **Fonts:**
   - Google Fonts already optimized
   - Verify `font-display: swap` is set (fallback while loading)

### Accessibility
1. **Color contrast:**
   - Check dark backgrounds with light text
   - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) if scores are low

2. **Form labels:**
   - Ensure all form inputs have visible `<label>` elements
   - Don't rely on placeholders

### SEO
1. **Structured data:**
   - Verify all schema markup via [Google Rich Results Test](https://search.google.com/test/rich-results)
   - No errors should appear

2. **Robots.txt:**
   - Create `/robots.txt` if site should be fully crawlable
   - Basic version:
     ```
     User-agent: *
     Allow: /
     Sitemap: https://ivoryandbloom.shop/sitemap.xml
     ```

---

## Rollback Plan

If issues are discovered in production:

1. **Stop traffic** (if possible, put site in maintenance mode)
2. **Restore backup:** `mv public_html public_html.broken && mv public_html.backup.YYYYMMDD public_html`
3. **Notify stakeholders** of rollback and ETA for fix
4. **Fix issues** on `website-2.0-redesign` branch locally
5. **Test thoroughly** before re-deploying
6. **Deploy again** once fix is verified

---

## Sign-Off

Once all sections above are checked, the Website 2.0 deployment is complete and verified.

**Deployed by:** ___________________  
**Date:** ___________________  
**Notes:** ___________________________________________________________
