"use client"

import { Section } from "@/components/section"
import { NameConnector } from "@/components/couple-name-text"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import { Heart } from "lucide-react"
import { useSiteConfig } from "@/hooks/use-site-config"

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
  "rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 sm:p-5 md:p-6"

function CoupleNameInline() {
  const { groomNickname, brideNickname } = useSiteConfig().couple

  return (
    <>
      {groomNickname}
      <NameConnector size="sm">&</NameConnector>
      {brideNickname}
    </>
  )
}

export function Registry() {
  const siteConfig = useSiteConfig()

  return (
    <Section
      id="registry"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Corner decorations — reflected to all four corners */}
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
      {/* <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/left-bottom-deco.png"
          alt=""
          width={300}
          height={300}
          className={CORNER_DECO_CLASS}
          priority={false}
          aria-hidden
        />
      </div> */}
      {/* <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <Image
          src="/decoration/left-bottom-deco.png"
          alt=""
          width={300}
          height={300}
          className={`${CORNER_DECO_CLASS} scale-x-[-1]`}
          priority={false}
          aria-hidden
        />
      </div> */}

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-5 md:gap-6 text-center mt-8 sm:mt-10 md:mt-12 mb-10 sm:mb-14 md:mb-16 px-4 sm:px-6">
        <p
          className={`${cormorant.className} inline-flex flex-wrap items-baseline justify-center gap-y-1 text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white/90`}
        >
          <CoupleNameInline />
        </p>

        <h2
          className="font-[family-name:var(--font-safira-march)] flex flex-col items-center gap-2.5 sm:gap-3 text-[1.35rem] sm:text-[1.75rem] md:text-[2.15rem] lg:text-[2.5rem] leading-none tracking-[0.015em] sm:tracking-[0.01em] text-white px-2 sm:px-3 my-1 sm:my-1.5 [text-shadow:0_2px_14px_rgba(0,0,0,0.22)]"
        >
          <span className="block">Gift Guide</span>
        
        </h2>

        <p
          className={`${cormorant.className} text-xs sm:text-sm md:text-base italic text-white/90 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 mt-0.5 sm:mt-1`}
        >
          Your presence is the greatest gift we could ask for.
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className={GLASS_CARD_CLASS}>
          <div className="p-3 sm:p-5 md:p-7 lg:p-9 space-y-4 sm:space-y-6">
            <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed text-center`}>
            Your presence at our wedding is the greatest gift we could ask for. Your love, laughter,{" "}
            <NameConnector size="sm">and</NameConnector>{" "}
            company on our special day are more than enough. Should you wish to honor us with a gift, a monetary contribution toward our future together would be deeply appreciated{" "}
            <NameConnector size="sm">and</NameConnector>{" "}
            gratefully received
            </p>

            {/* {Object.values(siteConfig.giftRegistry ?? {}).length > 0 && (
              <div className="grid gap-3 sm:gap-4">
                {Object.values(siteConfig.giftRegistry ?? {}).map((item) => (
                  <div key={item.id} className={`${GLASS_INNER_CLASS} text-center`}>
                    {item.label && (
                      <p className={`${cinzel.className} mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-white`}>
                        {item.label}
                      </p>
                    )}
                    {item.accountNumber && (
                      <div>
                        <p className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white/70">
                          Account Number
                        </p>
                        <p className={`${cinzel.className} mt-1 text-sm sm:text-base text-white`}>
                          {item.accountNumber}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )} */}

            <div className={`${GLASS_INNER_CLASS} text-center`}>
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 border border-white/25 flex items-center justify-center">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white/80" />
                </div>
              </div>
              <p className={`${cormorant.className} text-sm sm:text-base text-white/90 italic leading-relaxed`}>
                Thank you from the bottom of our hearts.
              </p>
              <p className={`${cinzel.className} text-xs sm:text-sm text-white/80 mt-3 sm:mt-4 tracking-[0.12em] uppercase`}>
                With love,
              </p>
              <p
                className="font-[family-name:var(--font-safira-march)] inline-flex flex-wrap items-baseline justify-center gap-y-1 text-[0.85rem] sm:text-[0.95rem] md:text-[1.05rem] text-white mt-1 sm:mt-1.5 leading-none tracking-[0.03em] [text-shadow:0_2px_10px_rgba(0,0,0,0.2)]"
              >
                {siteConfig.couple.brideNickname}
                <NameConnector size="sm">&</NameConnector>
                {siteConfig.couple.groomNickname}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
