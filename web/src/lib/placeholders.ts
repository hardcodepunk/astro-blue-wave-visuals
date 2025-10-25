// src/lib/placeholders.ts
const SURF_IDS = [
  "1507525428034-b723cf961d3e", // Brand Film — Shoreline Coffee
  "1500375592092-40eb2168fd21", // Outdoor — Sri Lanka Surf
  "1501785888041-af3ef285b470", // Lifestyle — Morning Ride
  "1500530855697-b586d89ba3ee", // Brand — Trail Apparel
  "1504609773096-104ff2c73aa0", // Outdoor — Coastal Run
  "1494790108377-be9c29b29330", // Lifestyle — Studio Session
]

export function surfPlaceholder(width = 1600, height = 900, index = 0, quality = 80) {
  const id = SURF_IDS[index % SURF_IDS.length]
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=${quality}&crop=entropy`
}
