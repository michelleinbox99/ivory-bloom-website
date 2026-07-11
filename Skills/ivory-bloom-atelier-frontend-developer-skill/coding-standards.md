# Ivory & Bloom Atelier Coding Standards

## General Rules

Write production-quality code.

Prioritize:

* Readability
* Scalability
* Performance

---

# HTML Standards

Use semantic elements:

Preferred:

* header
* nav
* main
* section
* article
* footer

Avoid unnecessary:

* div wrappers
* duplicate structures

---

# CSS Standards

Use:

* CSS variables
* Responsive units
* Mobile-first approach

Example:

```css
:root {
 --ivory: #faf7f2;
 --gold: #c9a45c;
 --text: #3a332d;
}
```

---

# JavaScript Standards

Prioritize:

* Performance
* Simplicity
* Maintainability

Avoid:

* Heavy unnecessary libraries
* Blocking scripts
* Poor event handling

---

# React / Next.js Standards

Use:

* Component-based architecture
* Reusable components
* Clean folder structure

Preferred:

```
src/

components/

pages/

assets/

styles/

utils/
```

---

# Image Handling

Always optimize:

* File size
* Format
* Dimensions

Preferred:

* WebP
* AVIF

Avoid:

* Huge PNG files
* Uncompressed images

---

# Accessibility

Always include:

* Alt text
* Keyboard navigation
* Proper contrast
* ARIA labels when needed
