# Phase 1 Verification Checklist

Use this after the Phase 1 commit (`Complete Phase 1 website improvements`, `79e9770`) to confirm all three fixes actually work before moving to Phase 2. Nothing here changes code — it's a test pass only.

---

## 1. Test the contact form locally

A static site can't be opened via `file://` for this test — Formspree submissions and some form behavior need a real HTTP origin. Serve the folder locally first, with whichever of these you have available:

```bash
# Python 3
python -m http.server 8000

# Node (no install needed)
npx serve .

# VS Code
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000` (or whatever port/tool you used).

**Steps:**

- [ ] Scroll to the **Consultation** section and open DevTools → Console + Network tabs.
- [ ] Try submitting the form **empty** — confirm all 4 required fields (Name, Email, Service, Message) show inline red error text and the submit is blocked.
- [ ] Type an invalid email (e.g. `test`) — confirm the email field specifically flags as invalid.
- [ ] Fix each field one at a time — confirm each error clears as soon as that field becomes valid (live validation).
- [ ] Fill out the form completely with real test data and submit.
- [ ] Confirm the button shows the loading spinner + "Sending..." label while the request is in flight.
- [ ] In the **Network** tab, confirm a `POST` request fires to `https://formspree.io/f/xzdnpdab`.
- [ ] Confirm the green success message appears ("Thank you! Your message has been sent...") and the form resets.
- [ ] Check the **Console** — confirm the old warning `Contact form: set FORM_ENDPOINT to your real Formspree endpoint...` no longer appears (it should be gone now that the real endpoint is set).

**Formspree first-submission gotcha:** if this is the very first submission this endpoint has ever received, Formspree sends a one-time confirmation email to `michelleinbox99@gmail.com` that must be clicked to activate the form. Until that's confirmed, submissions will still return success in the browser but won't be delivered — so don't be alarmed if the first test doesn't show up in your inbox immediately. Check for that confirmation email first.

---

## 2. Verify the Formspree endpoint after deployment

Local testing confirms the code is wired correctly; this step confirms it actually works from the live domain (Formspree ties an endpoint to the referring origin in some plans/spam checks).

- [ ] Deploy the current branch to `ivoryandbloom.shop` (or a staging copy of it).
- [ ] From the **live URL**, submit one real test inquiry through the consultation form.
- [ ] Confirm the on-page success message appears (not the red error fallback).
- [ ] Log in to [formspree.io](https://formspree.io) → your form → confirm the submission count increased and the test entry appears with the correct name/email/service/message.
- [ ] Check the `michelleinbox99@gmail.com` inbox (and spam folder) for a notification email with the subject **"New Wedding Inquiry from Ivory & Bloom Atelier Website"**.
- [ ] Open DevTools Network tab on the live page and confirm the `POST` to `formspree.io/f/xzdnpdab` returns `200 OK`.
- [ ] Submit one deliberately spammy test (fill the hidden honeypot field via DevTools, or automate it) to confirm spam is still silently accepted client-side without reaching your inbox — this behavior shouldn't have changed, just re-confirm it.

---

## 3. Check Open Graph preview images

Social crawlers can't reach `localhost`, so the real check needs the live deployed URLs. There's a quick local sanity check first, then the real validator pass.

**Quick local sanity check (no deployment needed):**

- [ ] For each of the 6 journal posts, view page source and confirm `<meta property="og:image">` and `<meta name="twitter:image">` both point to an image file that actually exists in `/images/` and matches that post's own hero photo:

  | Post | Expected image |
  |---|---|
  | how-to-choose-bridal-accessories.html | bride-garden-ribbon.jpg |
  | coordinating-your-bridal-party.html | bridesmaids-pastel.jpg |
  | flower-girl-style-guide.html | flowergirls-bench.jpg |
  | choosing-your-shade.html | insta-1.jpg |
  | how-a-pouch-is-made.html | hero-pouch-florals.jpg |
  | what-brides-carry.html | insta-3.jpg |

**After deployment, run each of the 6 journal URLs (and the homepage) through:**

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — confirm the image, title, and description all render, then click **"Scrape Again"** to force a fresh crawl (Facebook/Instagram cache aggressively).
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) — same check.
- [ ] [Pinterest URL Debugger](https://developers.pinterest.com/tools/url-debugger/) — worth prioritizing given the brand's Pinterest presence; confirm the Rich Pin preview shows the correct image and text.
- [ ] Do one real test: share a journal post link in a private message to yourself on each platform you actually use, and confirm the preview card looks right end-to-end.

---

## 4. Verify the sitemap canonical fix

- [ ] Open `sitemap.xml` and confirm the journal entry now reads exactly `https://ivoryandbloom.shop/journal/index.html` (not the old `https://ivoryandbloom.shop/journal/`).
- [ ] Open `journal/index.html` and confirm its `<link rel="canonical">` tag matches that same URL exactly — protocol, host, and path all identical.
- [ ] Grep the codebase for any remaining internal link to the old trailing-slash-only form to confirm nothing else still points at it:
  ```bash
  grep -rn "journal/\"" --include="*.html" .
  ```
  (Every internal link should already use `journal/index.html` or a same-directory `index.html` — this just confirms nothing was missed.)
- [ ] After deployment, load `https://ivoryandbloom.shop/sitemap.xml` directly in a browser and confirm it returns valid XML with no 404s.
- [ ] Run the live sitemap URL through an XML sitemap validator (e.g. [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)) to confirm it's well-formed.
- [ ] In Google Search Console → Sitemaps, resubmit `sitemap.xml` if it was previously submitted, so Google recrawls with the corrected URL.
- [ ] Follow-up (days later, not immediate): check Search Console → Pages report for the journal URL to confirm no "Duplicate, Google chose different canonical" warning persists.

---

## Sign-off

Once every box above is checked and the contact form has delivered at least one confirmed real inquiry, Phase 1 is verified end-to-end and Phase 2 (performance foundation) can begin.
