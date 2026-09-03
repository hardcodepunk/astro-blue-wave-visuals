# Bluewave Visuals

Astro rebuild of [bluewavevisuals.com](https://bluewavevisuals.com) — the same
site as a static build with no framework runtime.

## Getting started

```bash
cd web
npm install
npm run dev
```

A fresh clone has the photography but not the camera-original video, which is
too large for git. To get it and build the derivatives the site serves:

```bash
./scripts/fetch-media.sh
./scripts/encode-media.sh
```

| Command           | Does                           |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server on `localhost:4321` |
| `npm run build`   | Static build into `web/dist`   |
| `npm run preview` | Serve the built output         |
| `npm run check`   | Astro + TypeScript diagnostics |

## Layout

```
scripts/
  fetch-media.sh        pull originals from the live site
  encode-media.sh       video → web H.264 + poster frames
  compress-images.mjs   shrink the committed stills
web/
  public/media/video/   encoded video + posters (gitignored, generated)
  src/
    assets/media/       photography, processed by Astro at build time
    data/               every string and asset path on the site
    layouts/            Base.astro — head, fonts, scroll-reveal observer
    components/         Nav, Icon, WaveDivider, gallery + project dialogs
      home/             the home page sections, in page order
    lib/                images.ts (path → asset seam), icons.ts
    pages/              index, analog, portrets, surftrips, 404
    styles/             globals.css — design tokens and utilities
```

## Pages

| Route        | What it is                                              |
| ------------ | ------------------------------------------------------- |
| `/`          | Hero, philosophy, about, services, work grid, contact    |
| `/analog`    | 16-frame 35mm wall with a fullscreen lightbox            |
| `/portrets`  | Portrait wall, same lightbox                            |
| `/surftrips` | Morocco trips landing page — Surfsafari and Surfretreat |

## How it works

**No framework.** The site ships zero framework JavaScript. The two interactive
pieces — the work-grid project viewer and the gallery lightbox — are native
`<dialog>` elements, which give focus trapping, Escape handling and an inert
background for free rather than re-implementing them. What remains is a few
hundred bytes of inline event wiring.

**Scroll reveals** are one `IntersectionObserver` in `Base.astro` toggling a
class on `[data-reveal]`, with a `prefers-reduced-motion` opt-out and a
`<noscript>` block so the content is visible if the script never runs.

**Images** live in `src/assets` and go through `astro:assets`, which emits AVIF
and WebP at several widths with a JPEG fallback, plus intrinsic dimensions on
every tag so nothing reflows as it loads. `src/data` keeps plain `/media/...`
strings and `src/lib/images.ts` resolves them — that seam is what lets a Sanity
fetch drop in later without touching a component.

**Video** cannot go through Astro, so `encode-media.sh` normalises the camera
originals to faststart H.264 (one arrives as HEVC in a QuickTime container that
Firefox will not play) and extracts a poster frame for each. Nothing has
`preload` set: the poster carries the first paint and bytes are only spent when
someone actually plays something.

## Media

The originals are ~440MB and two exceed GitHub's 100MB per-file limit, so video
is gitignored and regenerated from the scripts above. The stills are committed,
compressed with the TinyJPG API when `TINIFY_API_KEY` is set and local
sharp/mozjpeg otherwise:

```bash
TINIFY_API_KEY=xxx node scripts/compress-images.mjs
```

Content is not yet wired to a CMS — `src/data` is the single source of truth.
