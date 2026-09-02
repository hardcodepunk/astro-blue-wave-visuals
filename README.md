# Bluewave Visuals

Astro rebuild of [bluewavevisuals.com](https://bluewavevisuals.com), reproducing
the original React/Lovable SPA as a static, mostly-JS-free site.

## Getting started

```bash
cd web
npm install
npm run dev
```

| Command           | Does                                       |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Dev server on `localhost:4321`              |
| `npm run build`   | Static build into `web/dist`                |
| `npm run preview` | Serve the built output                      |
| `npm run check`   | Astro + TypeScript diagnostics              |

## Layout

```
web/
  public/
    logo.svg
    media/            all photography & film assets
  src/
    data/             every string and asset path on the site
    layouts/          Base.astro — head, fonts, scroll-reveal observer
    components/       Nav, Icon, WaveDivider, gallery + modal islands
      home/           the home page sections, in page order
    pages/            index, analog, portrets, surftrips, 404
    styles/           globals.css — design tokens and utilities
```

## Pages

| Route        | What it is                                                |
| ------------ | --------------------------------------------------------- |
| `/`          | Hero, philosophy, about, services, work grid, contact      |
| `/analog`    | 16-frame 35mm wall with a fullscreen lightbox              |
| `/portrets`  | Portrait wall, same lightbox                               |
| `/surftrips` | Morocco trips landing page — Surfsafari and Surfretreat    |

## How it differs from the original

The original ships the whole site as a client-rendered React bundle. Here every
page is static HTML, and only two things hydrate:

- `ProjectModal` — the work-grid dialog on the home page
- `GalleryLightbox` — the fullscreen viewer on `/analog` and `/portrets`

Both are `client:idle` and are driven by custom events dispatched from static
markup, so the tiles themselves cost nothing. The original's per-element
`whileInView` motion is replaced by a single `IntersectionObserver` in
`Base.astro` that toggles a class on `[data-reveal]` elements, with a
`prefers-reduced-motion` opt-out.

Content is not yet wired to a CMS — `src/data` is the single source of truth and
is shaped so a Sanity fetch can drop in behind it later.
