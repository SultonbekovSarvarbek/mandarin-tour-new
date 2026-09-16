# Mandarin Tour concept

Svelte 5 + SvelteKit, statically rendered with `@sveltejs/adapter-static`.

## Development

```sh
npm ci
npm run dev
npm run check
npm run build
```

Static output is written to `dist/`. Sites identity is in `.openai/hosting.json`.

## Pages

- `/` — travel homepage
- `/tours/` — filterable catalogue; filters are stored in query parameters
- `/tours/turkey/`, `/tours/egypt/`, `/tours/dubai/`, `/tours/malaysia/`, `/tours/georgia/`, `/tours/kazakhstan/` — destination pages
- `/about/`, `/contacts/`
- `/umra/`, `/umra/programs/`, `/umra/preparation/`, `/umra/contacts/`

The shared layout provides client-side navigation and page exit/entry animations through SvelteKit `onNavigate`. Reduced-motion preferences disable motion. Russian/Uzbek selection persists within the browser session. All known routes are prerendered and support direct links and refreshes. No payment or booking backend is connected; contact links lead to the company channels supplied in the brief.

Checks: Svelte diagnostics, production build, local asset/link validation, catalogue/empty-state flows, language across navigation and refresh, browser back, mobile menus, destination details, and the WebMCP filter contract.

Travel guides: `/guide/`, `/guide/packing/`, `/guide/documents/`, `/guide/visa-free/`. Packing marks persist in localStorage. Visa guidance is for ordinary Uzbekistan passport holders, checked 2026-09-16; official source links appear on the page. New destinations are itinerary ideas available for enquiry, not confirmed inventory. Photo credits: `static/assets/credits.txt`.
