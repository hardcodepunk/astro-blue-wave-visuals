import { motion } from "framer-motion"

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
}: Props) {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={poster}>
        {/* {webm && <source src={webm} type="video/webm" />} */}
        {mp4 && <source src={mp4} type="video/mp4" />}
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="font-display text-4xl sm:text-6xl text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.6 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="mt-4 max-w-xl text-white/90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            className="mt-8 flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
