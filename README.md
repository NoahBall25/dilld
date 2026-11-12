# ⚡ DILL'D — Pickle-Powered Energy

Interactive 3D one-page site for DILL'D brine energy drinks. The menu has 7 items (Home, Science, Story, Facts, Shop, Drop, TikTok), and each one matches a labeled section on the page, in the same order.

Drop the logo exported from Google Stitch at `public/brand/logo.png` and it shows up in the nav and on the 3D can label.

Built with React, TypeScript, React Three Fiber, GSAP and Lenis.

## Features

- **Procedural 3D can**: built in code (no model file), with a hand-painted label for each flavor
- **Electric brine shader**: animated arcs and a fresnel rim that fire on scroll moments, flavor swaps and fast scrolling
- **Bloom + chromatic aberration** that react to scroll speed
- **Pinned scroll sequence**: sliding headlines, a circular mask reveal and staggered tooltips
- **Horizontal flavor run**: the background color shifts and the can spins to a new label for each flavor
- Velocity-reactive marquee, scrub-lit manifesto, counting stats, a circle-wipe outro and a can that launches off at the footer
- Custom cursor, magnetic buttons, jelly hero letters, nav text scramble and an animated loader

## Run it

```bash
npm install
npm run dev
```

## Edit the copy

All text, flavors and colors live in [`src/content.ts`](src/content.ts).

## Credits

Inspired by [Sam-Aklan/energy-drink-landing-page](https://github.com/Sam-Aklan/energy-drink-landing-page) (MIT).

## Blog, SEO and docs

- **Brine Blog**: articles live in [`content/posts.mjs`](content/posts.mjs). `npm run pages` turns them into static, crawlable pages under `/blog/`, plus `/privacy/`, `/terms/`, `/accessibility/`, `sitemap.xml`, `robots.txt`, an RSS feed and the web manifest. `npm run dev` and `npm run build` run it automatically.
- **Domain**: set `SITE_URL` in [`site.config.mjs`](site.config.mjs) before launch. Canonical URLs, Open Graph tags, JSON-LD and the sitemap all read from it.
- **Brand assets**: the logo, mascot and product photos exported from Google Stitch are in `public/brand/` and `public/images/`.
- **Docs**: [`docs/DILLD_BrandBook.pptx`](docs/DILLD_BrandBook.pptx) (class brand book), [`docs/DILLD_Website_Brand_Guide.pptx`](docs/DILLD_Website_Brand_Guide.pptx), the SEO title/meta sheet [`docs/DILLD_SEO_Title_et_Meta.xlsx`](docs/DILLD_SEO_Title_et_Meta.xlsx) and the Stitch design system [`docs/STITCH_DESIGN_SYSTEM.md`](docs/STITCH_DESIGN_SYSTEM.md).
