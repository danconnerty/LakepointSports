<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# NTangible × LakePoint Sports — Integration Proposal

Interactive demo built with Vite + React + TypeScript + Tailwind.

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies: `npm install`
2. Set `GEMINI_API_KEY` in `.env.local`
3. Run the dev server: `npm run dev`

## Build & Deploy (Vercel)

`npm run build` produces a bundled, code-split build in `dist/`. Vercel
auto-detects this via `vercel.json` (framework: vite). Push to the deployment
branch and Vercel handles the rest.

## Notes for Future Demos

This project was rebuilt to fix a 30-second black screen on mobile. The
contributing causes — and the patterns that prevent recurrence — are:

1. **Never ship an empty `<div id="root">` over a dark body.** `index.html`
   ships a branded loading shell that paints immediately; `index.tsx` removes
   it once React mounts. Without this, users stare at a black screen for the
   entire JS load.
2. **Don't load deps from a CDN importmap (esm.sh) in production.** The
   previous setup waterfalled React, ReactDOM, lucide-react, and @google/genai
   over the network on every cold load. Vite bundles them locally with vendor
   splitting (see `vite.config.ts`).
3. **Don't inline the entire Tailwind stylesheet** into `index.html`. Vite
   emits a hashed, cacheable CSS file via the standard `import './index.css'`
   in `index.tsx`.
4. **Lazy-load post-landing views.** `App.tsx` uses `React.lazy` for every
   component that only renders after the user enters the demo, so the landing
   page bundle stays small.
