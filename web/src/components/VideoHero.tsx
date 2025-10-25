import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  mp4?: string
  webm?: string
  poster?: string
  title: string
  subtitle?: string
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  /** ensure overlay is visible at least this long (ms) for a smooth fade */
  minRevealMs?: number
}

export default function VideoHero({
  mp4,
  webm,
  poster,
  title,
  subtitle,
  primaryHref = "/portfolio",
  primaryLabel = "View Portfolio",
  secondaryHref = "/contact",
  secondaryLabel = "Book a Project",
  minRevealMs = 600,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [mountedAt] = useState(() => Date.now())
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    const q = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(q.matches)
    const onChange = () => setReducedMotion(q.matches)
    q.addEventListener?.("change", onChange)
    return () => q.removeEventListener?.("change", onChange)
  }, [])

  // helper: respect a minimum overlay duration for a visible crossfade
  const reveal = () => {
    const elapsed = Date.now() - mountedAt
    const delay = Math.max(0, minRevealMs - elapsed)
    window.setTimeout(() => setIsPlaying(true), delay)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onPlaying = () => reveal()
    const onLoadedData = () => {
      // if autoplay is blocked or slow network, still reveal after min time
      reveal()
    }
    const onStalled = () => {} // keep overlay if it stalls after reveal

    v.addEventListener("playing", onPlaying)
    v.addEventListener("loadeddata", onLoadedData)
    v.addEventListener("stalled", onStalled)

    // absolute safety net: reveal no matter what after 1.5s
    const hardTimeout = window.setTimeout(reveal, 1500)

    return () => {
      v.removeEventListener("playing", onPlaying)
      v.removeEventListener("loadeddata", onLoadedData)
      v.removeEventListener("stalled", onStalled)
      clearTimeout(hardTimeout)
    }
  }, [mountedAt, minRevealMs])

  const showOverlay = mounted && !isPlaying

  return (
    <section
      className="relative h-[90vh] w-full overflow-hidden"
      style={
        poster
          ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {/* Video */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay={!reducedMotion}
        muted
        loop={!reducedMotion}
        playsInline
        // metadata is enough for start; browser will fetch frames as needed
        preload="metadata"
        poster={poster}
        // iOS/Safari quirks
        disableRemotePlayback
        // crossfade video itself
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {webm && <source src={webm} type="video/webm" />}
        {mp4 && <source src={mp4} type="video/mp4" />}
      </motion.video>

      {/* Gradient for legibility */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Loading overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="loading"
            className="absolute inset-0 z-10 bg-black/50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-6xl items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: isPlaying ? 1 : 0, y: isPlaying ? 0 : 18 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-4xl sm:text-6xl text-white">{title}</h1>
          {subtitle && <p className="mt-4 max-w-xl text-white/90">{subtitle}</p>}
          <div className="mt-8 flex gap-3">
            <a
              href={primaryHref}
              className="rounded-md bg-white px-5 py-2 font-medium text-black hover:bg-neutral-200 transition"
            >
              {primaryLabel}
            </a>
            <a
              href={secondaryHref}
              className="rounded-md border border-white px-5 py-2 font-medium text-white hover:bg-white hover:text-black transition"
            >
              {secondaryLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
