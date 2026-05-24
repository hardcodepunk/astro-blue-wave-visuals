type Props = {
  mp4?: string
  webm?: string
  poster?: string
  title?: string
  subtitle?: string
}

const DEFAULT_MP4 =
  "https://res.cloudinary.com/hardcodepunk/video/upload/q_auto:eco,vc_h264,ac_aac,f_mp4/v1737957147/wsuszohtmu2pks673muc.mp4"
const DEFAULT_WEBM =
  "https://res.cloudinary.com/hardcodepunk/video/upload/q_auto:eco,vc_vp9,f_webm/v1761381373/b8f7chk3u9s6jaqh4bae.webm"
const DEFAULT_POSTER =
  "https://res.cloudinary.com/hardcodepunk/video/upload/q_auto:eco,so_0,f_jpg,w_1600/v1737957147/wsuszohtmu2pks673muc.jpg"

export default function VideoHero({
  mp4 = DEFAULT_MP4,
  webm = DEFAULT_WEBM,
  poster = DEFAULT_POSTER,
  subtitle,
}: Props) {
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
    </section>
  )
}
