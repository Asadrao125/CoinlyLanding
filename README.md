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
assets/           Icons, images
assets/screenshots/  Real app screenshots used in the hero and feature phone mockups
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

- Phone mockups use real screenshots from `assets/screenshots/` — swap them for fresh ones as the
  app's UI evolves (same filenames, same 720x1600 aspect ratio so nothing reflows).
- Wire the waitlist form (`js/script.js`) to a real email service (Formspree, Mailchimp,
  ConvertKit, etc.) instead of the `mailto:` fallback.
- Add the real Google Play link once Coinly is published, and swap the "Coming soon" badge in
  the hero for a live store badge.
- Have `privacy.html` and `terms.html` reviewed before launch — both are drafts.
- Finalize pricing in the `#pricing` section to match the live RevenueCat offering.
