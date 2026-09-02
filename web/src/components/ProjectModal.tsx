import { useCallback, useEffect, useState } from "react";
import type { Project } from "~/data/site";

/**
 * The project overlay for the home page work grid. The tiles themselves are
 * static Astro markup — they announce a click through a custom event, so the
 * only thing that has to hydrate is the dialog.
 */

export const OPEN_PROJECT_EVENT = "bluewave:open-project";

interface Props {
  projects: Project[];
}

export default function ProjectModal({ projects }: Props) {
  const [active, setActive] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);

  const images = active?.images ?? (active ? [active.src] : []);
  const isSlider = active?.type === "gallery" && images.length > 1;

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const match = projects.find((project) => project.id === id);
      if (match) {
        setActive(match);
        setIndex(0);
      }
    };

    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, [projects]);

  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight" && isSlider) next();
      if (event.key === "ArrowLeft" && isSlider) prev();
    };

    // Freeze the page behind the dialog while it is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, isSlider, close, next, prev]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={active.title}
      onClick={close}
    >
      <div className="absolute inset-0 bg-primary-deep/70 backdrop-blur-md" />

      <div
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-4 top-4 z-20 rounded-full bg-background/80 p-2 text-primary shadow hover:bg-background"
        >
          <CloseIcon />
        </button>

        <div className="grid md:grid-cols-[1.6fr_1fr]">
          <div className="relative bg-primary-deep">
            {active.videoSrc ? (
              <video
                src={active.videoSrc}
                poster={active.src}
                controls
                autoPlay
                playsInline
                className="h-[40vh] w-full bg-black object-contain md:h-[70vh]"
              />
            ) : (
              <img
                key={index}
                src={images[index]}
                alt={active.title}
                className="h-[40vh] w-full bg-primary-deep object-contain md:h-[70vh]"
              />
            )}

            {isSlider && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary shadow hover:bg-background"
                >
                  <ChevronIcon direction="left" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-primary shadow hover:bg-background"
                >
                  <ChevronIcon direction="right" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary">
                  {index + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-4 p-6 md:p-8">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {active.category} · {active.type}
            </span>
            <h3 className="text-3xl text-primary md:text-4xl">{active.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              {active.description}
            </p>
            <div className="mt-auto pt-6 text-xs text-muted-foreground">
              Bluewave Visuals · {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
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
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}
