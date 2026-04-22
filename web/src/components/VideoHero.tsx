import { useEffect, useMemo, useRef, useState } from "react"
import "plyr/dist/plyr.css"
import HeroButton from "./ui/HeroButton"

type Props = {
  mp4?: string
  webm?: string
  poster?: string
  title: string
  subtitle?: string
  showreelUrl?: string
  showreelLabel?: string
  minRevealMs?: number
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

  const m1 = s.match(/(?:youtube\.com\/watch\?v=)([A-Za-z0-9_-]{6,})/)
  if (m1?.[1]) return m1[1]

  const m2 = s.match(/(?:youtu\.be\/)([A-Za-z0-9_-]{6,})/)
  if (m2?.[1]) return m2[1]

  const m3 = s.match(/(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/)
  if (m3?.[1]) return m3[1]

  const m4 = s.match(/[?&]v=([A-Za-z0-9_-]{6,})/)
  if (m4?.[1]) return m4[1]

  return null
}

export default function VideoHero({
  mp4 = DEFAULT_MP4,
  webm = DEFAULT_WEBM,
  poster = DEFAULT_POSTER,
  title,
  subtitle,
  showreelUrl = DEFAULT_SHOWREEL_URL,
  showreelLabel = "Watch showreel",
  minRevealMs = 600,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playerTargetRef = useRef<HTMLDivElement | null>(null)
  const playerInstanceRef = useRef<any>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mountedAt] = useState(() => Date.now())

  const showreelId = useMemo(() => {
    return getYouTubeId(showreelUrl) ?? "cIFqyLFVG4g"
  }, [showreelUrl])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    let revealed = false

    const reveal = () => {
      if (revealed) return
      revealed = true
      setIsPlaying(true)
    }

    const revealWithMin = () => {
      const elapsed = Date.now() - mountedAt
      const delay = Math.max(0, minRevealMs - elapsed)
      window.setTimeout(reveal, delay)
    }

    const onPlaying = () => revealWithMin()
    const onLoadedData = () => revealWithMin()

    v.addEventListener("playing", onPlaying)
    v.addEventListener("loadeddata", onLoadedData)

    const hardTimeout = window.setTimeout(revealWithMin, 1500)

    return () => {
      v.removeEventListener("playing", onPlaying)
      v.removeEventListener("loadeddata", onLoadedData)
      window.clearTimeout(hardTimeout)
    }
  }, [mountedAt, minRevealMs])

  useEffect(() => {
    if (!isModalOpen) {
      document.documentElement.classList.remove("has-showreel-open")
      if (playerInstanceRef.current) {
        playerInstanceRef.current.pause?.()
      }
      return
    }

    document.documentElement.classList.add("has-showreel-open")

    let cancelled = false

    const setupPlayer = async () => {
      if (!playerTargetRef.current) return

      if (!playerInstanceRef.current) {
        const PlyrModule = await import("plyr")
        if (cancelled) return

        const Plyr = PlyrModule.default

        playerInstanceRef.current = new Plyr(playerTargetRef.current, {
          controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"],
          youtube: {
            noCookie: true,
            rel: 0,
            modestbranding: 1,
          },
        })
      }

      try {
        await playerInstanceRef.current.play?.()
      } catch {}
    }

    setupPlayer()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      cancelled = true
      window.removeEventListener("keydown", onKeyDown)
      document.documentElement.classList.remove("has-showreel-open")
    }
  }, [isModalOpen])

  useEffect(() => {
    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy?.()
        playerInstanceRef.current = null
      }
      document.documentElement.classList.remove("has-showreel-open")
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
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
      <div
        className={`absolute inset-0 z-10 bg-black/40 transition-opacity duration-700 ease-out ${
          isPlaying ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 z-30 pb-8 sm:pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-700 ease-out ${
              isPlaying ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {subtitle ? <h2 className="max-w-4xl text-3xl text-paper">{subtitle}</h2> : null}

            <div className="mt-6 flex">
              <HeroButton onClick={() => setIsModalOpen(true)} aria-haspopup="dialog" aria-controls="showreel-dialog">
                {showreelLabel}
              </HeroButton>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] grid place-items-center p-8 max-sm:p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-[6px]"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          <div
            id="showreel-dialog"
            className="relative z-[1] w-full max-w-[1100px]"
            role="dialog"
            aria-modal="true"
            aria-label="Showreel video"
          >
            <div className="absolute left-1/2 top-4 z-[3] -translate-x-1/2">
              <HeroButton onClick={() => setIsModalOpen(false)}>Close showreel</HeroButton>
            </div>

            <div className="overflow-hidden bg-black">
              <div
                ref={playerTargetRef}
                data-plyr-provider="youtube"
                data-plyr-embed-id={showreelId}
                className="plyr__video-embed"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
