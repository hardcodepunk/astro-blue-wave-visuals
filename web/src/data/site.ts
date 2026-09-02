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
  heroVideo: "/media/banner-video-h264.mp4",
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

export type Project = {
  id: string;
  title: string;
  category: string;
  type: "video" | "gallery";
  /** Poster frame for videos, cover image for galleries. */
  src: string;
  videoSrc?: string;
  /** Gallery tiles that open in the in-page slider. */
  images?: string[];
  /** Gallery tiles that navigate to a dedicated page instead. */
  href?: string;
  aspect: string;
  description: string;
};

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

export const projects: Project[] = [
  {
    id: "v1",
    title: "Nausicaá",
    category: "Film · Architecture",
    type: "video",
    src: "/media/thumbnail-nausicaa.jpg",
    videoSrc: "/media/nausicaa.mov",
    aspect: "aspect-video",
    description:
      "A film for Nausicaá, the National Sea Center — architecture meeting the deep blue. Quiet, vast, and reverent.",
  },
  {
    id: "c1",
    title: "Portraits",
    category: "Photography · People",
    type: "gallery",
    src: portraits[0]!,
    href: "/portrets",
    aspect: "aspect-[2/3]",
    description:
      "Quiet, honest portraits made in the water, on the road, and in the in-between moments.",
  },
  {
    id: "v2",
    title: "Transfo Zwevegem",
    category: "Film · Industrial Heritage",
    type: "video",
    src: "/media/transfo.mp4",
    videoSrc: "/media/transfo.mp4",
    aspect: "aspect-video",
    description:
      "A portrait of Transfo — concrete, light, and the long memory of industry reclaimed as culture.",
  },
  {
    id: "c3",
    title: "Analogue",
    category: "Photography · 35mm",
    type: "gallery",
    src: analogueGallery[0]!,
    href: "/analog",
    aspect: "aspect-[2/3]",
    description:
      "Sun-bleached frames shot on film. Grain, warmth, and the patience that analog demands.",
  },
  {
    id: "v3",
    title: "Surfers Hell",
    category: "Film · Documentary",
    type: "video",
    src: "/media/thumbnail-surfers-hell.jpg",
    videoSrc: "/media/surfers-hell.mov",
    aspect: "aspect-video",
    description:
      "Documentary work following surfers through cold water, bad weather, and the kind of joy that lives between sets.",
  },
  {
    id: "c4",
    title: "Winter Sports",
    category: "Photography · Snow",
    type: "gallery",
    src: "/media/winter-1.jpg",
    images: ["/media/winter-1.jpg", "/media/winter-2.jpg", "/media/winter-3.jpg"],
    aspect: "aspect-[2/3]",
    description:
      "Movement in the snow — the same eye that follows a wave, turned uphill.",
  },
  {
    id: "v4",
    title: "Food & Beverage",
    category: "Film · Brand",
    type: "video",
    src: "/media/food-beverage-replacement.mp4",
    videoSrc: "/media/food-beverage-replacement.mp4",
    aspect: "aspect-video",
    description:
      "From the boat to the plate. A reel celebrating the chefs, the catch, and the rituals around a coastal table.",
  },
  {
    id: "c2",
    title: "Food & Beverage",
    category: "Photography · Editorial",
    type: "gallery",
    src: "/media/food2.jpg",
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
    id: "v5",
    title: "Le Pin Sec",
    category: "Film · Coastal",
    type: "video",
    src: "/media/le-pin-sec-support.mp4",
    videoSrc: "/media/le-pin-sec-support.mp4",
    aspect: "aspect-video",
    description:
      "An ongoing coastal project shot at Le Pin Sec — wide skies, empty beach breaks, slow afternoons.",
  },
];
