/** Content for the /surftrips landing page. */

export const surftrips = {
  eyebrow: "Bluewave Visuals × Snoopy",
  heroTitle: "SURFTRIPS",
  heroSubtitle: "Join us in Morocco for the ultimate surf experience.",
  heroImage: "/media/surftrips-hero.jpg",
} as const;

export type TripCard = {
  subtitle: string;
  title: string;
  points: string[];
  target: string;
  image: string;
};

export const tripCards: TripCard[] = [
  {
    subtitle: "Surfretreat",
    title: "Beginner · Intermediate",
    target: "retreat",
    image: "/media/surfretreat-card-new.jpg",
    points: [
      "No experience needed",
      "0 – 1.5m waves (hip high)",
      "Up for surfing as a hobby",
      "Plenty of chill time included",
      "From beginner to intermediate",
      "Work on your turns & cutbacks",
    ],
  },
  {
    subtitle: "Surfsafari",
    title: "Intermediate · Advanced · Expert",
    target: "safari",
    image: "/media/surfsafari-sunset.jpg",
    points: [
      "Not afraid of waves over 1.5m",
      "I can already do turns",
      "I surf confidently on my own",
      "I love adventure",
      "Wild roadtrips don't scare me",
      "Stories I want to tell my kids (or pets) one day",
    ],
  },
];

export const safari = {
  eyebrow: "Section C · For advanced surfers",
  title: "SURFSAFARI",
  dates: "9–16 January 2027",
  video: "/media/video/safari.mp4",
  videoPoster: "/media/video/safari-poster.jpg",
  intro:
    "You're picked up at Agadir airport and spend your first night in Imi Ouddar, before the adventure really kicks off the next morning. Snoopy and his crew take us on a surf safari in their 4x4s to the best hidden surf spots along the Moroccan coast. You stay in a series of beautiful boutique villas spread across different locations to minimise drive time and maximise time in the water. All meals are provided so you've always got the energy for an unreal surf session. 🌊🏄‍♂️",
  expect: [
    "All-in treatment",
    "7 days with Snoopy as a guide",
    "Transport to off-road locations",
    "Shared room near secret spots",
    "3 meals per day + snacks",
    "Airport transfers (Agadir)",
    "Sunsets from the dunes",
    "Limited edition t-shirt (Makai.seekerart)",
    "Professional photos by Bluewave Visuals (water & shore)",
    "Video documentary by Kader en Kompass",
    "Villa with swimming pool & halfpipe",
  ],
  gallery: [
    { src: "/media/surfer-barrel.jpeg", alt: "Surfer in the barrel" },
    { src: "/media/room-example.jpeg", alt: "Boutique villa bedroom" },
    {
      src: "/media/safari-roadtrip.jpeg",
      alt: "Surfsafari roadtrip along the Moroccan coast",
    },
  ],
  price: "€1200,-",
  spotsLeft: 5,
  totalSpots: 12,
} as const;

export const retreat = {
  eyebrow: "Section D · For beginners & intermediates",
  title: "SURFRETREAT",
  dates: "16–23 January 2027",
  video: "/media/video/surfretreat-explain.mp4",
  videoPoster: "/media/video/surfretreat-explain-poster.jpg",
  intro:
    "You're picked up at Agadir airport and stay at the Snoopy villa in Imi Ouddar. All boards and wetsuits are available on site. No extra costs beyond your transport to Agadir airport. Private chefs make sure there's always something delicious on the table. Need some time alone? We share our location and you can rejoin the group at your own pace. This trip is built to connect like-minded surfers for life!",
  pricing: [
    {
      label: "Private Double Room",
      price: "€975",
      note: "per person (2 guests)",
    },
    {
      label: "Private Double Room — Single Occupancy",
      price: "€1450",
      note: "per room",
    },
    {
      label: "Private Suite (Only 1 left)",
      price: "€1050",
      note: "per person (2 guests)",
    },
    {
      label: "Private Suite — Single Occupancy (Only 1 left)",
      price: "€1600",
      note: "per room",
    },
  ],
  included: [
    {
      t: "15 hours coaching with Snoopy",
      d: "3 hours per day + free surf time.",
    },
    {
      t: "Surf gear",
      d: "High-quality boards & wetsuits (or free board swap if you bring your own).",
    },
    {
      t: "Daily analysis",
      d: "Photo & video analysis (beach/water) + surf theory.",
    },
    { t: "Luxury surf villa", d: "Beach, pool, hammam, terraces." },
    { t: "Food", d: "3 home-cooked meals per day + snacks." },
    { t: "Day trip", d: "To remote, quiet spots (North or South)." },
    {
      t: "Surf yoga & surf apnea",
      d: "Conditioning, mobility, recovery & breathwork (incl. 4-week plan).",
    },
    {
      t: "Activities",
      d: "Natural pools, surf movies, surfskate, sunsets.",
    },
    { t: "Transfers", d: "Agadir included (Marrakech at extra cost)." },
    {
      t: "Professional media",
      d: "Netflix-style documentary by Kader & Kompass + sick surf photos by Bluewave Visuals included. Locations revealed 7 days in advance.",
    },
  ],
  gallery: [
    {
      src: "/media/breathwork-training.jpeg",
      alt: "Breath work training in the pool",
    },
    { src: "/media/villa-house.jpeg", alt: "Villa with pool" },
    {
      src: "/media/photographer-ocean.jpeg",
      alt: "Photographer shooting the ocean",
    },
  ],
  price: "€975,-",
  spotsLeft: 5,
  totalSpots: 12,
} as const;
