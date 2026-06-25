"use client"

import { Section } from "@/components/section"
import { CoupleNames, NameConnector } from "@/components/couple-name-text"
import { useSiteConfig } from "@/hooks/use-site-config"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

// Palette lives in globals.css → @theme inline → --color-motif-*
// Edit there once to update every component.

export function Welcome() {
  const siteConfig = useSiteConfig()
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom
  return (
    <Section
      id="welcome"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] border border-white/25 bg-white/15 backdrop-blur-lg shadow-[0_20px_70px_rgba(0,0,0,0.12)] px-4 sm:px-5 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
          {/* Subtle accent overlay */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80" style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, white 8%, transparent), transparent 60%)' }} />
            <div className="absolute bottom-[-6rem] right-[-2rem] w-64 h-64" style={{ background: 'radial-gradient(circle at center, color-mix(in srgb, white 6%, transparent), transparent 60%)' }} />
          </div>

          <div className="relative text-center text-white space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
          {/* Main heading */}
          <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
            <p
              className={`${cormorant.className} inline-flex flex-wrap items-baseline justify-center gap-y-1 text-[0.65rem] sm:text-[0.7rem] md:text-xs lg:text-sm uppercase tracking-[0.24em] sm:tracking-[0.28em] text-white/90 px-2 sm:px-3`}
            >
              {siteConfig.couple.groomNickname}
              <NameConnector size="sm">&</NameConnector>
              {siteConfig.couple.brideNickname}
            </p>

            <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
              <div
                className="flex items-center justify-center gap-2 w-full max-w-[12rem] sm:max-w-[14rem] md:max-w-[16rem]"
                aria-hidden="true"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-white/45" />
                <div className="w-1 h-1 rounded-full bg-white/75 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/30 to-white/45" />
              </div>

              <h2
                className="font-[family-name:var(--font-safira-march)] flex flex-col items-center gap-3 sm:gap-2 md:gap-2.5 text-[1.05rem] sm:text-[1.85rem] md:text-[2.65rem] lg:text-[3.35rem] xl:text-[4rem] leading-none tracking-[0.015em] sm:tracking-[0.01em] text-white max-w-[14rem] sm:max-w-[22rem] md:max-w-none mx-auto px-1 sm:px-0 [text-shadow:0_2px_14px_rgba(0,0,0,0.22)]"
              >
                <span className="block">Welcome to our</span>
                <span className="block">forever</span>
              </h2>
            </div>


            {/* Verse */}
            <div className="space-y-0.5 sm:space-y-1">
              <p
                className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base italic leading-relaxed text-white/90`}
              >
                &quot;I have found the one whom my soul loves.&quot;
              </p>
              <p className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm lg:text-base italic leading-relaxed text-white/90`}>Song of Solomon 3:4</p>

            </div>

          </div>

          {/* Body text */}
          <div
            className={`${cormorant.className} text-[0.75rem] sm:text-[0.85rem] md:text-sm lg:text-base leading-relaxed sm:leading-6 md:leading-7 space-y-2.5 sm:space-y-3 md:space-y-4 text-white/95`}
          >
            <p>
              By the grace of God and with the blessings of our parents, we joyfully invite you to the celebration of our love and marriage.
            </p>
            <p>
              Kindly explore this invitation for event details and RSVP information.
            </p>
            {/* Closing — sign-off */}
            <div className="pt-4 sm:pt-5 md:pt-6 space-y-4 sm:space-y-5 md:space-y-6">
              <div className="space-y-2 sm:space-y-2.5">
                <p
                  className={`${cormorant.className} italic text-[0.8rem] sm:text-sm md:text-base text-white/90`}
                >
                  With all our love,
                </p>
                <CoupleNames groomName={groomName} brideName={brideName} connector="and" />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


