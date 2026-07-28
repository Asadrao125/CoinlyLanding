# Coinly — Landing Page

Marketing landing page for **Coinly**, an Android personal expense &amp; income tracker.
Plain HTML/CSS/JS — no build step, no dependencies.

## Structure

```
index.html       Main landing page
privacy.html      Privacy policy (draft — review before launch)
terms.html        Terms of service (draft — review before launch)
css/style.css     All styles (brand colors match the Coinly Android app palette)
js/script.js      Nav toggle, FAQ accordion, scroll reveal, waitlist form
assets/           Icons, images, generated app-icon PNGs, social preview image
assets/screenshots/  Real app screenshots used in the hero and feature phone mockups
robots.txt        Points crawlers at sitemap.xml
sitemap.xml       Lists index.html, privacy.html, terms.html
```

## Running locally

No build tools needed — open `index.html` directly in a browser, or serve it:

```
npx serve .
```

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **Add New Project** → import the repo → framework preset **Other** (static site) →
   Deploy. No build command or output directory needed.

## Before launch

- Canonical/OG/Twitter URLs currently point at `https://coinly-web.vercel.app` (in `index.html`,
  `privacy.html`, `terms.html`, `robots.txt`, `sitemap.xml`). If a custom domain is added later,
  update all five files to match — a stale `og:image` URL is why link previews (WhatsApp, etc.)
  can silently show no preview at all.
- Phone mockups use real screenshots from `assets/screenshots/` — swap them for fresh ones as the
  app's UI evolves. Each `.shot img` sizes itself from the image's own natural dimensions (no
  cropping), so a differently-sized replacement just reflows cleanly instead of clipping.
- Wire the waitlist form (`js/script.js`) to a real email service (Formspree, Mailchimp,
  ConvertKit, etc.) instead of the `mailto:` fallback.
- Add the real Google Play link once Coinly is published, and swap the "Coming soon" badge in
  the hero for a live store badge.
- Have `privacy.html` and `terms.html` reviewed before launch — both are drafts.
- Finalize pricing in the `#pricing` section to match the live RevenueCat offering.
- Regenerate `assets/icons/*.png` and `assets/og-image.jpg` if the app icon ever changes (the
  source shapes are documented in the commit that added them).
