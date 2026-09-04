/**
 * Every piece of copy and every media reference used across the site.
 * Keeping it in one module is what makes the eventual Sanity swap a
 * matter of changing where these objects are fetched from, not a rewrite
 * of the components that render them.
 */

export const site = {
  name: "Bluewave Visuals",
  title: "Bluewave Visuals — Photography & Film rooted in the ocean",
  description:
    "Bluewave Visuals: A creative photography & film portfolio showcasing ocean lifestyle and surf culture.",
  email: "bluewave.visuals@outlook.com",
  phone: "+32 474 26 63 53",
  whatsapp: "https://wa.me/32474266353",
  location: "Belgium · Available worldwide",
} as const;

export const media = {
  heroVideo: "/media/video/banner-video-h264.mp4",
  heroPoster: "/media/video/banner-video-h264-poster.jpg",
  ewoud: "/media/ewoud-camera.jpg",
} as const;

/* ------------------------------------------------------------------ */
/* Home — services                                                     */
/* ------------------------------------------------------------------ */

export type Service = {
  name: string;
  description: string;
  icon: "video" | "camera" | "plane" | "film" | "droplets";
};

export const services: Service[] = [
  {
    name: "Video",
    description: "Cinematic films, brand stories, music videos.",
    icon: "video",
  },
  {
    name: "Photography",
    description: "Editorial, lifestyle, campaign stills.",
    icon: "camera",
  },
  {
    name: "FPV",
    description: "First-person view drone for immersive motion.",
    icon: "plane",
  },
  {
    name: "Drone shots",
    description: "Aerial cinematography along coastlines & beyond.",
    icon: "plane",
  },
  {
    name: "Analog shoots",
    description: "35mm & medium format for slow, lived-in frames.",
    icon: "film",
  },
  {
    name: "Underwater & In-water",
    description: "Housings, fins, breath — shot from inside the wave.",
    icon: "droplets",
  },
];

/* ------------------------------------------------------------------ */
/* Home — trusted by marquee                                           */
/* ------------------------------------------------------------------ */

export const clients: string[] = [
  "Netflix",
  "Tomorrowland",
  "Leverreizen",
  "Ode",
  "Moviefx",
  "Kompass Club",
  "Rampage Open Air",
  "Kurhaus",
  "Bart Peeters",
  "America Today",
  "Suspicious Antwerp",
  "Redbull",
  "Transfo",
  "Kijkuit",
];

/* ------------------------------------------------------------------ */
/* Home — selected work                                                */
/* ------------------------------------------------------------------ */

/**
 * Work-grid entries, as a discriminated union rather than a bag of optionals.
 * Each variant carries exactly the fields it can use, so a video can never be
 * handed a poster that is itself a video file — a bug the previous loose shape
 * allowed and shipped.
 */
export type Project = {
  id: string;
  title: string;
  category: string;
  aspect: string;
  description: string;
} & (
  | {
      kind: "video";
      poster: string;
      /** Full-quality file, played in the dialog. */
      videoSrc: string;
      /** Short silent loop the grid tile plays on hover. */
      previewSrc: string;
    }
  | { kind: "gallery-link"; cover: string; href: string }
  | { kind: "gallery"; cover: string; images: string[] }
);

const portraits = [
  "/media/portraits-1.jpg",
  "/media/portraits-2.jpg",
  "/media/portraits-3.jpg",
];

export const analogueGallery = [
  "/media/analogue-1.jpg",
  "/media/analogue-2.jpg",
  "/media/analog-upload-1.jpg",
  "/media/analog-upload-2.jpg",
  "/media/analog-upload-3.jpg",
  "/media/analog-upload-4.jpg",
  "/media/analog-upload-5.jpg",
  "/media/analog-upload-6.jpg",
  "/media/analog-upload-7.jpg",
  "/media/analog-upload-8.jpg",
];

/** The six extra rolls that only appear on the dedicated /analog page. */
const analogExtras = [
  "/media/000096960006.jpg",
  "/media/000096960007.jpg",
  "/media/000096960013.jpg",
  "/media/000096960016.jpg",
  "/media/000096960026.jpg",
  "/media/000096960030.jpg",
];

export const portraitsGallery = portraits;

/**
 * Deterministic shuffle, seeded so the analog wall keeps the same
 * order on every render (server and client) instead of reflowing.
 */
function seededShuffle<T>(input: readonly T[], seed = 42): T[] {
  const out = [...input];
  let state = seed;
  const next = () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

export const analogWall = seededShuffle([...analogueGallery, ...analogExtras]);

/**
 * The dedicated photo walls, rendered by `src/pages/[gallery].astro`.
 * `label` is singular because it becomes each frame's alt text.
 */
export type Gallery = {
  slug: string;
  title: string;
  label: string;
  description: string;
  images: string[];
};

export const galleries: Gallery[] = [
  {
    slug: "analog",
    title: "Analog",
    label: "Analog",
    description:
      "Sun-bleached 35mm frames shot on film. Grain, warmth, and the patience that analog demands.",
    images: analogWall,
  },
  {
    slug: "portrets",
    title: "Portraits",
    label: "Portrait",
    description:
      "Quiet, honest portraits made in the water, on the road, and in the in-between moments.",
    images: portraitsGallery,
  },
];

export const projects: Project[] = [
  {
    kind: "video",
    id: "v1",
    title: "Nausicaá",
    category: "Film · Architecture",
    poster: "/media/video/nausicaa-poster.jpg",
    videoSrc: "/media/video/nausicaa.mp4",
    previewSrc: "/media/video/nausicaa-preview.mp4",
    aspect: "aspect-video",
    description:
      "A film for Nausicaá, the National Sea Center — architecture meeting the deep blue. Quiet, vast, and reverent.",
  },
  {
    kind: "gallery-link",
    id: "c1",
    title: "Portraits",
    category: "Photography · People",
    cover: portraits[0]!,
    href: "/portrets",
    aspect: "aspect-[2/3]",
    description:
      "Quiet, honest portraits made in the water, on the road, and in the in-between moments.",
  },
  {
    kind: "video",
    id: "v2",
    title: "Transfo Zwevegem",
    category: "Film · Industrial Heritage",
    poster: "/media/video/transfo-poster.jpg",
    videoSrc: "/media/video/transfo.mp4",
    previewSrc: "/media/video/transfo-preview.mp4",
    aspect: "aspect-video",
    description:
      "A portrait of Transfo — concrete, light, and the long memory of industry reclaimed as culture.",
  },
  {
    kind: "gallery-link",
    id: "c3",
    title: "Analogue",
    category: "Photography · 35mm",
    cover: analogueGallery[0]!,
    href: "/analog",
    aspect: "aspect-[2/3]",
    description:
      "Sun-bleached frames shot on film. Grain, warmth, and the patience that analog demands.",
  },
  {
    kind: "video",
    id: "v3",
    title: "Surfers Hell",
    category: "Film · Documentary",
    poster: "/media/video/surfers-hell-poster.jpg",
    videoSrc: "/media/video/surfers-hell.mp4",
    previewSrc: "/media/video/surfers-hell-preview.mp4",
    aspect: "aspect-video",
    description:
      "Documentary work following surfers through cold water, bad weather, and the kind of joy that lives between sets.",
  },
  {
    kind: "gallery",
    id: "c4",
    title: "Winter Sports",
    category: "Photography · Snow",
    cover: "/media/winter-1.jpg",
    images: [
      "/media/winter-1.jpg",
      "/media/winter-2.jpg",
      "/media/winter-3.jpg",
    ],
    aspect: "aspect-[2/3]",
    description:
      "Movement in the snow — the same eye that follows a wave, turned uphill.",
  },
  {
    kind: "video",
    id: "v4",
    title: "Food & Beverage",
    category: "Film · Brand",
    poster: "/media/video/food-beverage-replacement-poster.jpg",
    videoSrc: "/media/video/food-beverage-replacement.mp4",
    previewSrc: "/media/video/food-beverage-replacement-preview.mp4",
    aspect: "aspect-video",
    description:
      "From the boat to the plate. A reel celebrating the chefs, the catch, and the rituals around a coastal table.",
  },
  {
    kind: "gallery",
    id: "c2",
    title: "Food & Beverage",
    category: "Photography · Editorial",
    cover: "/media/food2.jpg",
    images: [
      "/media/food1.jpg",
      "/media/food2.jpg",
      "/media/food3.jpg",
      "/media/food4.jpg",
      "/media/food5.jpg",
    ],
    aspect: "aspect-[2/3]",
    description:
      "From sea to plate — artistic stills made for chefs, restaurants and ocean-rooted producers.",
  },
  {
    kind: "video",
    id: "v5",
    title: "Le Pin Sec",
    category: "Film · Coastal",
    poster: "/media/video/le-pin-sec-support-poster.jpg",
    videoSrc: "/media/video/le-pin-sec-support.mp4",
    previewSrc: "/media/video/le-pin-sec-support-preview.mp4",
    aspect: "aspect-video",
    description:
      "An ongoing coastal project shot at Le Pin Sec — wide skies, empty beach breaks, slow afternoons.",
  },
];
