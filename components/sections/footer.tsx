"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2 } from "lucide-react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import Image from "next/image"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const CORNER_DECO_CLASS =
  "w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] opacity-80 drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)]"

const GLASS_CARD_CLASS =
  "relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.22),0_4px_14px_rgba(0,0,0,0.14)] transition-all duration-300 hover:border-white/40"

const GLASS_INNER_CLASS =
  "rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-3 sm:p-4 md:p-5 transition-all duration-300 hover:border-white/30 hover:bg-white/12"

const ICON_WRAP_CLASS =
  "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0"

const toTitleCase = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

export function Footer() {
  const siteConfig = useSiteConfig()
  const year = new Date().getFullYear()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTime = siteConfig.ceremony.time
  const receptionTime = siteConfig.reception.time
  const ceremonyVenue = siteConfig.ceremony.location
  const receptionVenue = siteConfig.reception.location
  const isSameVenue = ceremonyVenue === receptionVenue
  const combinedVenue = isSameVenue ? ceremonyVenue : null

  const quotes = useMemo(
    () => [
      `"I have found the one whom my soul loves." – Song of Solomon 3:4`,
      "Welcome to our wedding website! We've found a love that's a true blessing, and we give thanks to God for writing the beautiful story of our journey together.",
      "Thank you for your love, prayers, and support. We can't wait to celebrate this joyful day together!",
    ],
    []
  )

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => setIsPaused(false), 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      }
      setIsDeleting(false)
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      }
      setIsPaused(true)
      setIsDeleting(true)
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Events", href: "#details" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#guest-list" },
  ] as const

  const brideNickname = siteConfig.couple.brideNickname
  const groomNickname = siteConfig.couple.groomNickname

  return (
    <footer className="relative mt-12 sm:mt-16 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Corner decorations */}
      {/* <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/right-top-deco.png"
          alt=""
          width={300}
          height={300}
          className={CORNER_DECO_CLASS}
          priority={false}
          aria-hidden
        />
      </div> */}
      {/* <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <Image
          src="/decoration/right-top-deco.png"
          alt=""
          width={300}
          height={300}
          className={`${CORNER_DECO_CLASS} scale-x-[-1]`}
          priority={false}
          aria-hidden
        />
      </div> */}
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/left-bottom-deco.png"
          alt=""
          width={300}
          height={300}
          className={CORNER_DECO_CLASS}
          priority={false}
          aria-hidden
        />
      </div>
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/left-bottom-deco.png"
          alt=""
          width={300}
          height={300}
          className={`${CORNER_DECO_CLASS} scale-x-[-1]`}
          priority={false}
          aria-hidden
        />
      </div>

      {/* Monogram & couple header */}
      <div className="relative z-10 flex flex-col items-center mb-10 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 opacity-95 drop-shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
        >
          <Image
            src={siteConfig.couple.monogram}
            alt={`${groomNickname} & ${brideNickname} monogram`}
            fill
            className="object-contain brightness-0 invert opacity-90"
            priority={false}
          />
        </motion.div>

        <div className="mt-4 sm:mt-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="h-px w-12 sm:w-16 bg-white/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
            <div className="h-px w-12 sm:w-16 bg-white/40" />
          </div>
          <h2
            className="leading-none text-white"
            style={{
              fontFamily: "var(--font-brittany), cursive",
              fontSize: "clamp(1.75rem, 7vw, 3.5rem)",
              letterSpacing: "0.01em",
              textShadow: "0 3px 16px rgba(0,0,0,0.25)",
            }}
          >
            {groomNickname} & {brideNickname}
          </h2>
          <p className={`${cinzel.className} text-sm sm:text-base md:text-lg text-white/90 mt-2 tracking-[0.12em]`}>
            {ceremonyDate}
          </p>
          <p className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/75 mt-1`}>
            {combinedVenue ?? ceremonyVenue}
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-10">
        <div className={GLASS_CARD_CLASS}>
          <div className="p-3 sm:p-5 md:p-7 lg:p-9">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {/* Couple info + quote */}
              <motion.div className="lg:col-span-2" variants={fadeInUp}>
                <div className="mb-4 sm:mb-5">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className={`${ICON_WRAP_CLASS} w-10 h-10 sm:w-11 sm:h-11`}>
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white/80" />
                    </div>
                    <h3 className={`${cinzel.className} text-lg sm:text-xl md:text-2xl text-white`}>
                      {groomNickname} & {brideNickname}
                    </h3>
                  </div>
                  <div className="space-y-2 sm:space-y-2.5">
                    <div className={`flex items-center gap-2 sm:gap-3 ${cormorant.className} text-white/85`}>
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white/70" />
                      <span className="text-sm sm:text-base">{ceremonyDate}</span>
                    </div>
                    <div className={`flex items-center gap-2 sm:gap-3 ${cormorant.className} text-white/85`}>
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-white/70" />
                      <span className="text-xs sm:text-sm leading-relaxed">{toTitleCase(ceremonyVenue)}</span>
                    </div>
                  </div>
                </div>

                <motion.div className={GLASS_INNER_CLASS} whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
                  <blockquote className={`${cormorant.className} italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] text-white/90`}>
                    &quot;{displayedText}
                    <span className="inline-block w-0.5 h-4 sm:h-5 bg-white/70 ml-1 animate-pulse">|</span>&quot;
                  </blockquote>
                  <div className="flex items-center gap-1.5 mt-3 sm:mt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Event details */}
              <motion.div className="space-y-3 sm:space-y-4" variants={fadeInUp}>
                {isSameVenue ? (
                  <motion.div className={GLASS_INNER_CLASS} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                      <div className={ICON_WRAP_CLASS}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <h4 className={`${cinzel.className} font-semibold text-sm sm:text-base md:text-lg text-white`}>
                        Ceremony & Reception
                      </h4>
                    </div>
                    <div className={`space-y-2 ${cormorant.className} text-xs sm:text-sm text-white/85 leading-relaxed`}>
                      <div className="flex items-start gap-2 sm:gap-3">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/70" />
                        <span>{toTitleCase(combinedVenue ?? ceremonyVenue)}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0 text-white/70" />
                        <span>Ceremony {ceremonyTime} · Reception {receptionTime}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <motion.div className={GLASS_INNER_CLASS} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                        <div className={ICON_WRAP_CLASS}>
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <h4 className={`${cinzel.className} font-semibold text-sm sm:text-base md:text-lg text-white`}>
                          Ceremony
                        </h4>
                      </div>
                      <div className={`space-y-2 ${cormorant.className} text-xs sm:text-sm text-white/85 leading-relaxed`}>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/70" />
                          <span>{toTitleCase(ceremonyVenue)}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0 text-white/70" />
                          <span>{ceremonyTime}</span>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div className={GLASS_INNER_CLASS} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                        <div className={ICON_WRAP_CLASS}>
                          <Heart className="w-4 h-4 text-white fill-white/80" />
                        </div>
                        <h4 className={`${cinzel.className} font-semibold text-sm sm:text-base md:text-lg text-white`}>
                          Reception
                        </h4>
                      </div>
                      <div className={`space-y-2 ${cormorant.className} text-xs sm:text-sm text-white/85 leading-relaxed`}>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/70" />
                          <span>{toTitleCase(receptionVenue)}</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0 text-white/70" />
                          <span>{receptionTime}</span>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}

                <motion.div className={GLASS_INNER_CLASS} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                    <div className={ICON_WRAP_CLASS}>
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <h4 className={`${cinzel.className} font-semibold text-sm sm:text-base md:text-lg text-white`}>
                      RSVP Deadline
                    </h4>
                  </div>
                  <div className={`space-y-2 ${cormorant.className} text-xs sm:text-sm text-white/85 leading-relaxed`}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0 text-white/70" />
                      <span>{siteConfig.details.rsvp.deadline}</span>
                    </div>
                    <p className="text-white/70">Please confirm your attendance by this date.</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Social + quick links */}
              <motion.div className="space-y-5 sm:space-y-6" variants={fadeInUp}>
                <div>
                  <h4 className={`${cinzel.className} font-semibold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 flex items-center gap-2 text-white`}>
                    <span className="h-5 w-1 rounded-full bg-white/50 sm:h-6" />
                    Follow Us
                  </h4>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    {[
                      { href: "https://www.facebook.com", label: "Facebook", Icon: Facebook },
                      { href: "https://www.instagram.com/", label: "Instagram", Icon: Instagram },
                      { href: "https://www.youtube.com", label: "YouTube", Icon: Music2 },
                      { href: "https://x.com/", label: "Twitter", Icon: Twitter },
                    ].map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/15 border border-white/25 text-white transition-all duration-200 hover:bg-white/25 hover:scale-110"
                        aria-label={label}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className={GLASS_INNER_CLASS}>
                  <h5 className={`${cinzel.className} font-semibold text-sm sm:text-base mb-2.5 sm:mb-3 text-white`}>
                    Quick Links
                  </h5>
                  <div className="space-y-1.5 sm:space-y-2">
                    {nav.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`block transition-colors duration-200 ${cormorant.className} text-xs sm:text-sm text-white/80 hover:text-white`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Bottom row */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <div className="pt-5 sm:pt-6 border-t border-white/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5">
                  <div className="text-center md:text-left">
                    <p className={`${cormorant.className} text-xs sm:text-sm text-white/80 leading-relaxed`}>
                      © {year} {groomNickname} & {brideNickname} — crafted with love, prayers, and gratitude.
                    </p>
                    <p className={`${cormorant.className} text-xs sm:text-sm mt-1 text-white/70 leading-relaxed`}>
                      This celebration site was designed to share our story and joy with you.
                    </p>
                  </div>
                  <div className="text-center md:text-right space-y-1">
                    <p className={`${cormorant.className} text-xs sm:text-sm text-white/70`}>
                      Developed by{" "}
                      <a
                        href="https://lance28-beep.github.io/portfolio-website/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-white hover:text-white/80 transition-colors"
                      >
                        Lance Valle
                      </a>
                    </p>
                    <p className={`${cormorant.className} text-xs sm:text-sm text-white/70`}>
                      Want a website like this? Visit{" "}
                      <a
                        href="https://www.facebook.com/WeddingInvitationNaga"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-white hover:text-white/80 transition-colors"
                      >
                        Wedding Invitation Naga
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
