import { useEffect, useMemo, useRef, useState } from "react"
import "plyr/dist/plyr.css"
import HeroButton from "./ui/HeroButton"

type Props = {
  mp4?: string
  webm?: string
  poster?: string
  title?: string
  subtitle?: string
  showreelUrl?: string
  showreelLabel?: string
}

const DEFAULT_MP4 =
  "https://res.cloudinary.com/hardcodepunk/video/upload/q_auto:eco,vc_h264,ac_aac,f_mp4/v1737957147/wsuszohtmu2pks673muc.mp4"
const DEFAULT_WEBM =
  "https://res.cloudinary.com/hardcodepunk/video/upload/q_auto:eco,vc_vp9,f_webm/v1761381373/b8f7chk3u9s6jaqh4bae.webm"
const DEFAULT_POSTER =
  "https://res.cloudinary.com/hardcodepunk/video/upload/q_auto:eco,so_0,f_jpg,w_1600/v1737957147/wsuszohtmu2pks673muc.jpg"
const DEFAULT_SHOWREEL_URL = "https://www.youtube.com/watch?v=cIFqyLFVG4g"

function getYouTubeId(input?: string | null): string | null {
  if (!input) return null
  const s = String(input).trim()
  if (!s) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{6,})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{6,})/,
    /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/,
    /[?&]v=([A-Za-z0-9_-]{6,})/,
  ]
  for (const p of patterns) {
    const m = s.match(p)
    if (m?.[1]) return m[1]
  }
  return null
}

function getVimeoId(input?: string | null): string | null {
  if (!input) return null
  const m = String(input).match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return m?.[1] ?? null
}

export default function VideoHero({
  mp4 = DEFAULT_MP4,
  webm = DEFAULT_WEBM,
  poster = DEFAULT_POSTER,
  subtitle,
  showreelUrl = DEFAULT_SHOWREEL_URL,
  showreelLabel = "Watch showreel",
}: Props) {
  const playerTargetRef = useRef<HTMLDivElement | null>(null)
  const playerInstanceRef = useRef<any>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { provider, embedId } = useMemo(() => {
    const vimeo = getVimeoId(showreelUrl)
    if (vimeo) return { provider: "vimeo" as const, embedId: vimeo }
    return { provider: "youtube" as const, embedId: getYouTubeId(showreelUrl) ?? "cIFqyLFVG4g" }
  }, [showreelUrl])

  useEffect(() => {
    if (!isModalOpen) {
      document.documentElement.classList.remove("overflow-hidden")
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.pause?.()
        } catch {}
      }
      return
    }

    document.documentElement.classList.add("overflow-hidden")

    let cancelled = false

    const setupPlayer = async () => {
      if (!playerTargetRef.current) return
      if (!playerInstanceRef.current) {
        const mod = await import("plyr")
        if (cancelled) return
        const Plyr = (mod as any).default
        playerInstanceRef.current = new Plyr(playerTargetRef.current, {
          controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"],
          youtube: { noCookie: true, rel: 0, modestbranding: 1 },
          autoplay: true,
        })
      }
      try {
        await playerInstanceRef.current.play?.()
      } catch {}
    }

    setupPlayer()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      cancelled = true
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isModalOpen])

  useEffect(() => {
    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy?.()
        } catch {}
        playerInstanceRef.current = null
      }
      document.documentElement.classList.remove("overflow-hidden")
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        muted
        playsInline
        preload="metadata"
        poster={poster}
        autoPlay
        loop
        disableRemotePlayback
        aria-hidden="true"
      >
        {webm ? <source src={webm} type="video/webm" /> : null}
        {mp4 ? <source src={mp4} type="video/mp4" /> : null}
      </video>

      <div className="pointer-events-none absolute inset-0 z-[5] bg-black/50" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

      {subtitle ? (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
            <p className="max-w-none whitespace-pre-line text-left font-display text-6xl uppercase leading-[0.82] tracking-wide text-paper sm:text-8xl md:text-[9rem] lg:text-[12rem]">
              {subtitle}
            </p>
          </div>
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-30 pb-10 sm:pb-14">
        <div className="mx-auto flex w-full max-w-6xl px-6 sm:px-10 lg:px-12">
          <HeroButton onClick={() => setIsModalOpen(true)} aria-haspopup="dialog" aria-controls="showreel-dialog">
            {showreelLabel}
          </HeroButton>
        </div>
      </div>

      {isModalOpen && (
        <div
          id="showreel-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Showreel"
          className="fixed inset-0 z-[120] grid place-items-center bg-black/85 backdrop-blur-md"
          onClick={e => {
            if (e.target === e.currentTarget) setIsModalOpen(false)
          }}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close showreel"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition hover:bg-paper/20 sm:right-6 sm:top-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>

          <div className="w-full max-w-[1200px] px-4 sm:px-8">
            <div className="overflow-hidden bg-black">
              <div
                ref={playerTargetRef}
                data-plyr-provider={provider}
                data-plyr-embed-id={embedId}
                className="plyr__video-embed"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
