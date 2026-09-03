import type { ImageMetadata } from "astro";

/**
 * Resolves the `/media/...` paths used throughout `src/data` to the actual
 * image modules in `src/assets`, so Astro can process them.
 *
 * The data layer deliberately keeps plain strings rather than imports — that is
 * what lets a Sanity fetch drop in behind it later without touching a single
 * component. This map is the seam between the two.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/media/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);

export function getImage(path: string): ImageMetadata {
  const key = path.replace(/^\/media\//, "/src/assets/media/");
  const found = modules[key];

  if (!found) {
    throw new Error(
      `No image at "${path}" (looked for ${key}). ` +
        `Available: ${Object.keys(modules).length} files in src/assets/media.`,
    );
  }

  return found.default;
}
