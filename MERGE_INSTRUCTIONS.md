# Website 2.0 — Merge to Master & Deployment Instructions

Since this repository doesn't have a remote configured, here are instructions to set up GitHub and create the PR.

---

## Step 1: Set Up GitHub Remote

### Option A: Using SSH (Recommended)
```bash
git remote add origin git@github.com:YOUR_USERNAME/ivory-bloom-website.git
git push -u origin website-2.0-redesign
```

### Option B: Using HTTPS
```bash
git remote add origin https://github.com/YOUR_USERNAME/ivory-bloom-website.git
git push -u origin website-2.0-redesign
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

---

## Step 2: Create Pull Request on GitHub

### Via GitHub Web UI (Easiest)

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/ivory-bloom-website`
2. You should see a prompt: **"Compare & pull request"** for the `website-2.0-redesign` branch
3. Click **"Compare & pull request"**
4. Fill in the PR form:

**Title:**
```
Website 2.0: Complete Redesign Implementation (6 Phases)
```

**Description:** Copy/paste the content from `PR_DESCRIPTION.md` in the project root

**Base branch:** `master`  
**Compare branch:** `website-2.0-redesign`

5. Click **"Create pull request"**

### Via Command Line (Using GitHub CLI)

If you have `gh` CLI installed:

```bash
# First, ensure you're on the website-2.0-redesign branch
git checkout website-2.0-redesign

# Create PR using the template
gh pr create --title "Website 2.0: Complete Redesign Implementation (6 Phases)" \
  --body "$(cat PR_DESCRIPTION.md)" \
  --base master \
  --head website-2.0-redesign
```

---

## Step 3: Code Review & Approval

Once PR is created on GitHub:

1. **Assign reviewers:**
   - Product Owner (features, messaging)
   - Design Lead (visual consistency)
   - QA Lead (testing)
   - Engineering Lead (code quality)

2. **Required checks:**
   - [ ] All CI/CD tests pass (if configured)
   - [ ] Code review approved
   - [ ] No merge conflicts
   - [ ] DEPLOYMENT.md checklist reviewed

3. **Address any comments** and push additional commits if needed

---

## Step 4: Merge to Master

### Via GitHub Web UI

1. On the PR page, scroll to the bottom
2. Click **"Merge pull request"**
3. Select merge strategy:
   - **Create a merge commit** (recommended for history tracking)
   - Squash and merge (for cleaner history)
4. Click **"Confirm merge"**
5. Optionally delete the `website-2.0-redesign` branch

### Via Command Line

```bash
# Switch to master
git checkout master

# Merge the website-2.0-redesign branch
git merge --no-ff website-2.0-redesign

# Push to GitHub
git push origin master

# Optionally delete the feature branch
git push origin --delete website-2.0-redesign
git branch -d website-2.0-redesign
```

---

## Step 5: Deployment to Production

### Local Testing (Before Live)

```bash
# Ensure you're on master with latest code
git checkout master
git pull origin master

# Build the site
scripts/build.ps1

# Test locally
# Start local server and verify:
# - Homepage loads
# - Forms submit
# - 404 page displays at /404
```

### Upload to Production Server

#### Option A: FTP/SFTP (Using FileZilla or equivalent)

1. Open FileZilla/SFTP client
2. Connect to hosting server
3. Navigate to `public_html/` directory
4. Upload these files/directories:
   - All `.html` files (index.html, about.html, collections/*, etc.)
   - `.htaccess` (make sure "Show hidden files" is enabled)
   - `css/` directory
   - `js/` directory
   - `images/` directory
   - `sitemap.xml`

#### Option B: Git (If Server Has Git Installed)

```bash
ssh your_user@your_server.com
cd public_html

# If repo already exists
git fetch origin
git checkout master
git pull origin master

# If first time
git clone https://github.com/YOUR_USERNAME/ivory-bloom-website.git .
git checkout master
```

#### Option C: Build Script on Server

If you have build automation:

```bash
ssh your_user@your_server.com
cd public_html
git pull origin master
./scripts/build.ps1  # or ./scripts/build.sh
```

### Verify Deployment

1. **Check file permissions:**
   ```bash
   chmod 644 *.html *.xml .htaccess
   chmod 644 css/* js/*
   chmod 755 images
   ```

2. **Clear browser cache:**
   - Ctrl+Shift+Delete (Chrome/Firefox/Edge)
   - Cmd+Shift+Delete (macOS)

3. **Clear CDN cache (if applicable):**
   - If using Cloudflare: Dashboard → Purge Cache → Purge All
   - If using other CDN: Follow their cache purge instructions

4. **Verify on live domain:**
   - [ ] Homepage loads: `https://ivoryandbloom.shop/`
   - [ ] Hero carousel works
   - [ ] Collections pages load
   - [ ] Forms submit
   - [ ] 404 page displays: `https://ivoryandbloom.shop/nonexistent`
   - [ ] Cache headers present (DevTools Network tab)

---

## Step 6: Post-Deployment Verification (24 Hours)

### Immediate (First Hour)

- [ ] Monitor error logs for 404s or missing assets
- [ ] Test Formspree form submission → confirm email received
- [ ] Test newsletter signup → confirm signup processed
- [ ] Check browser DevTools for console errors (none should appear)
- [ ] Verify cache headers (Network tab should show `Cache-Control` headers)

### Within 24 Hours

- [ ] Run Lighthouse audit:
  ```
  Chrome DevTools > Lighthouse
  Target scores: Performance ≥85, SEO ≥95, Accessibility ≥95
  ```

- [ ] Check Core Web Vitals:
  ```
  Web Vitals scores: LCP <2.5s, FID <100ms, CLS <0.1
  ```

- [ ] Verify schema markup:
  - Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
  - Paste `https://ivoryandbloom.shop/`
  - Verify: No schema errors, rich snippets detected

- [ ] Submit sitemap to Google Search Console:
  - Login to GSC > Sitemaps > Add/Test Sitemap
  - Submit: `https://ivoryandbloom.shop/sitemap.xml`
  - This forces Google to re-crawl all 26 pages

### Within 1 Week

- [ ] Monitor Google Search Console for crawl errors
- [ ] Check if breadcrumbs appear in Google search results preview
- [ ] Track organic traffic in Google Analytics (establish baseline)
- [ ] Monitor uptime monitoring service (if configured)

---

## Rollback Plan (If Issues Arise)

If something goes wrong after deployment:

### Quick Rollback (Immediate)

```bash
# On production server
cd public_html

# Restore backup
mv public_html public_html.broken
mv public_html.backup.YYYYMMDD public_html

# Clear cache (if CDN)
# Cloudflare: Dashboard → Purge Cache → Purge All
```

### Full Rollback (To Previous Commit)

```bash
# On production server
git revert HEAD  # Creates a new commit that undoes Website 2.0
git push origin master
```

Then re-deploy by pulling latest master.

---

## Common Issues & Solutions

### "Cache not clearing"
- **Solution:** Clear browser cache (Ctrl+Shift+Delete)
- If using CDN: Manually purge cache in CDN admin
- Wait 5 minutes for propagation

### "Forms not submitting"
- **Check:** Formspree endpoint is `xzdnpdab` (verify in form HTML)
- **Test:** Direct submission to `https://formspree.io/f/xzdnpdab`
- **Note:** First submission requires confirmation email to `michelleinbox99@gmail.com`

### "404 page not displaying"
- **Check:** `.htaccess` is uploaded to root directory (hidden file)
- **Test:** Navigate to `/nonexistent` → should show custom 404.html
- **Solution:** Re-upload `.htaccess` with FTP (show hidden files enabled)

### "Schema errors in Rich Results Test"
- **Check:** JSON-LD blocks are valid (no typos)
- **Test:** Paste schema directly into [JSON-LD Validator](https://jsonschema.dev/)
- **Verify:** All required fields present per schema.org specification

### "Lighthouse score low"
- **Performance:** Check image sizes, run Chrome DevTools Performance tab
- **SEO:** Verify meta tags and schema markup
- **Accessibility:** Check color contrast and form labels

---

## Support & Documentation

**Key Documents in Project Root:**
- `DEPLOYMENT.md` — Comprehensive QA and testing checklist
- `PR_DESCRIPTION.md` — Full PR details and commit history
- `MERGE_INSTRUCTIONS.md` — This file

**Configuration Files:**
- `.htaccess` — Cache headers, gzip, security, error routing
- `404.html` — Custom error page
- `sitemap.xml` — All 26 indexed pages

**Documentation:**
- `docs/design-system.md` — Luxury design system reference
- `docs/component-reference.md` — Component patterns and token usage
- `docs/homepage-wireframe.md` — Homepage journey and sections

---

## Summary

| Step | Action | Time | Status |
|------|--------|------|--------|
| 1 | Set up GitHub remote | 5 min | Ready |
| 2 | Create PR on GitHub | 10 min | Ready |
| 3 | Code review & approval | 24 hrs | Pending |
| 4 | Merge to master | 5 min | Pending |
| 5 | Deploy to production | 30 min | Pending |
| 6 | Post-deploy verification | 2 hrs | Pending |

**Total estimated time from merge to live:** 2.5–3 hours

---

**Everything is ready. You're one PR away from launch! 🚀**
