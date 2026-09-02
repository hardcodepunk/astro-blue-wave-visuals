import { useCallback, useEffect, useState } from "react";

/**
 * Fullscreen viewer for the dedicated photo walls. The wall itself is static
 * Astro markup; each tile dispatches its index and only this overlay hydrates.
 */

export const OPEN_IMAGE_EVENT = "bluewave:open-image";

interface Props {
  images: string[];
  label: string;
}

export default function GalleryLightbox({ images, label }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<number>).detail;
      if (typeof detail === "number") setIndex(detail);
    };

    window.addEventListener(OPEN_IMAGE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_IMAGE_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, next, prev]);

  if (index === null) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} ${index + 1} of ${images.length}`}
      onClick={close}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      <button
        type="button"
        aria-label="Close"
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
        className="absolute right-4 top-4 z-20 rounded-full bg-background/80 p-2 text-primary shadow hover:bg-background"
      >
        <Glyph d={["M18 6 6 18", "m6 6 12 12"]} />
      </button>

      <button
        type="button"
        aria-label="Previous"
        onClick={(event) => {
          event.stopPropagation();
          prev();
        }}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary shadow hover:bg-background md:left-6"
      >
        <Glyph d={["m15 18-6-6 6-6"]} />
      </button>

      <button
        type="button"
        aria-label="Next"
        onClick={(event) => {
          event.stopPropagation();
          next();
        }}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary shadow hover:bg-background md:right-6"
      >
        <Glyph d={["m9 18 6-6-6-6"]} />
      </button>

      <img
        key={index}
        src={images[index]}
        alt={`${label} ${index + 1}`}
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 max-h-[88vh] max-w-[92vw] object-contain shadow-2xl"
      />

      <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

function Glyph({ d }: { d: string[] }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      {d.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
