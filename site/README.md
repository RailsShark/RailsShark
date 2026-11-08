# RailsShark website

Static site built with [Astro](https://astro.build). No server, almost no JavaScript (about 8 KB on the home page), deployed to Cloudflare Pages.

## Run it locally

```bash
cd site
npm install
npm run dev        # http://localhost:4321
npm run build      # output in site/dist
npm run preview    # serve the built site
```

## Change contact details, links and numbers

Everything editable lives in `src/config/site.ts`:

| Setting | What it does |
| --- | --- |
| `contact.email` | Shown everywhere; placeholder is railsshark@gmail.com |
| `contact.whatsapp` | Digits only, international format (e.g. `923001234567`). Empty = WhatsApp links fall back to email |
| `contact.calendly` | Full Calendly URL. Empty = "Book a call" falls back to email. When set, the contact page loads the calendar only when clicked |
| `contact.web3formsKey` | Free key from web3forms.com. Empty = the contact form opens the visitor's mail app instead |
| `url` | Update when a custom domain is attached (used for canonical URLs, sitemap and social previews). Also update `public/robots.txt` |
| `lab` | Design lab on/off for the whole build |
| `stats` | The four numbers in the hero and on About |

Content:

- Services: `src/data/services.ts`
- Track record: `src/data/work.ts`
- Process, engagement models, principles: `src/data/process.ts`

## Design lab

Open any page with `?lab=1` to show the lab button (bottom right). It switches palette, dark/light, accent colour, typefaces, type scale, corners, spacing, motion and the hero contours. Choices persist in that browser only.

- **Copy settings** copies the chosen tokens so they can be made the default in `src/styles/global.css`.
- **Exit lab** or `?lab=0` hides it again and resets.
- To remove it from production entirely, set `lab: false` in `src/config/site.ts`.

The lab code is a separate file that only downloads when the lab is open, so visitors never pay for it.

## Deploy to Cloudflare Pages

1. Push this branch to GitHub.
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git > pick `RailsShark/RailsShark`.
3. Settings:
   - Production branch: `cloudflare`
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `site`
   - Environment variable: `NODE_VERSION` = `22`
4. Deploy. The site appears at `<project>.pages.dev`; add a custom domain later under the project's Custom domains tab.

`public/_headers` sets long-term caching for hashed assets and basic security headers. `public/_redirects` maps the old `/privacy.html` URL to `/privacy/`.

## Note on the app privacy policy

The Charliee Technologies app privacy policy is at `/privacy/` (content unchanged). The old GitHub Pages site on `main` keeps serving `/privacy.html` until it is retired, so existing Play Store links stay valid. Update the Play Console link before turning GitHub Pages off.
