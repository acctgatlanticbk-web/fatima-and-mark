"use client"

import { Section } from "@/components/section"
import { NameConnector } from "@/components/couple-name-text"
import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"
import { Cinzel, Cormorant_Garamond } from "next/font/google"
import {
  Shirt,
  Clock,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"


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
  "rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-3 sm:p-4 md:p-5"

const BTN_PRIMARY =
  "flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-white hover:bg-white/90 text-[#7D7F2E] rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"

const BTN_SECONDARY =
  "flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-white/15 border border-white/30 hover:border-white/45 hover:bg-white/25 text-white rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"

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

export function Details() {
  const siteConfig = useSiteConfig()
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [currentReceptionImageIndex, setCurrentReceptionImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotationOffset, setRotationOffset] = useState(0)
  
  const coupleImages = [
    "/frontboxes/box_1.webp",
    "/frontboxes/box_2.webp",
    "/frontboxes/box_3.webp",
    "/frontboxes/hero.webp",
  ]

  const receptionImages = siteConfig.reception.image

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReceptionImageIndex((prev) => (prev + 1) % receptionImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Gentle reminders couple photos — subtle carousel + wobble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % coupleImages.length)
      setRotationOffset((prev) => (prev + 10) % 360)
    }, 2600)

    return () => clearInterval(interval)
  }, [coupleImages.length])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information from site config
  const ceremonyVenueName = siteConfig.ceremony.location
  const ceremonyVenueDetail = ""
  const ceremonyAddress = siteConfig.ceremony.venue
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = siteConfig.ceremony.map

  const receptionVenueName = siteConfig.reception.location
  const receptionVenueDetail = ""
  const receptionAddress = siteConfig.reception.venue
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  // Aliases used in the image modal
  const ceremonyLocationFormatted = ceremonyVenueName
  const receptionLocationFormatted = receptionVenueName
  const ceremonyLocation = ceremonyVenue
  const receptionLocation = receptionVenue
  const formattedCeremonyDate = siteConfig.ceremony.date
  const formattedReceptionDate = siteConfig.ceremony.date // reception follows ceremony on same day

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section
      id="details"
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
          className="font-[family-name:var(--font-safira-march)] text-[clamp(1.6rem,5.8vw,2rem)] sm:text-[2.85rem] md:text-[3.55rem] lg:text-[4.1rem] xl:text-[4.6rem] leading-none tracking-[0.015em] sm:tracking-[0.01em] text-white px-2 sm:px-3 my-1 sm:my-1.5 [text-shadow:0_2px_14px_rgba(0,0,0,0.22)]"
        >
          Event Details
        </h2>

        <p
          className={`${cormorant.className} text-xs sm:text-sm md:text-base italic text-white/90 max-w-xl mx-auto leading-relaxed px-2 sm:px-3 mt-0.5 sm:mt-1`}
        >
          Everything you need to know about our special day.
        </p>
      </div>

      {/* Venue and Event Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 space-y-6 sm:space-y-10 md:space-y-14">
        
        {/* Ceremony Card */}
        <div className="relative group">
          <div className={GLASS_CARD_CLASS}>
            {/* Venue Image */}
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
              <Image
                src={siteConfig.ceremony.image}
                alt={siteConfig.ceremony.location}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Venue name overlay with warm gold accent */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <h3 className={`${cinzel.className} text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight`}>
                  {siteConfig.ceremony.location}
                </h3>
                <p className={`${cinzel.className} text-xs sm:text-sm md:text-base text-white/95 drop-shadow-md tracking-wide`}>
                  {siteConfig.ceremony.venue}
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
              {/* Date Section */}
              <div className="text-center mb-5 sm:mb-8 md:mb-10">
                {/* Day name */}
                <p className={`${cinzel.className} text-[10px] sm:text-xs md:text-sm font-semibold text-white/90 uppercase tracking-[0.2em] mb-2 sm:mb-3`}>
                  {siteConfig.ceremony.day}
                </p>
                
                {/* Month - Script style with warm gold */}
                <div className="mb-2 sm:mb-4">
                  <p className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/90 leading-none`}>
                  {new Date(siteConfig.ceremony.date).toLocaleString('default', { month: 'long' })}
                  </p>
                </div>
                
                {/* Day and Year */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-7">
                  <p className={`${cinzel.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-none`}>
                  {new Date(siteConfig.ceremony.date).getDate()}
                  </p>
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-white/30 via-white/70 to-white/30" />
                  <p className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white leading-none`}>
                  {new Date(siteConfig.ceremony.date).getFullYear()}
                  </p>
                </div>

                {/* Time */}
                <p className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white tracking-wide`}>
                  {siteConfig.ceremony.time}
                </p>
              </div>

              {/* Location Details */}
              <div className={`${GLASS_INNER_CLASS} mb-4 sm:mb-6`}>
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-white mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className={`${cinzel.className} text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-white leading-relaxed`}>
                      {ceremonyVenueName}
                    </p>
                    {ceremonyVenueDetail && (
                      <p className={`${cinzel.className} text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-white/75 leading-relaxed mt-1`}>
                        {ceremonyVenueDetail}
                      </p>
                    )}
                    <p className={`${cinzel.className} text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-white/70 leading-relaxed`}>
                      {ceremonyAddress}
                    </p>
                  </div>
                  {/* QR Code for Ceremony - Right side */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-white/90 p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-white/40 shadow-sm">
                      <QRCodeSVG
                        value={ceremonyMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#3E2914"
                        bgColor="#FFFFFF"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-white/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className={BTN_PRIMARY}
                  aria-label="Get directions to ceremony venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(ceremonyVenue, 'ceremony')}
                  className={BTN_SECONDARY}
                  aria-label="Copy ceremony venue address"
                >
                  {copiedItems.has('ceremony') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('ceremony') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reception Card */}
        <div className="relative group">
          <div className={GLASS_CARD_CLASS}>
       
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
              {receptionImages.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentReceptionImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={siteConfig.reception.venue}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={index === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
              
          
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6 z-20">
                <h3 className={`${cinzel.className} text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight`}>
                  {siteConfig.reception.location}
                </h3>
                <p className={`${cinzel.className} text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-white/95 drop-shadow-md tracking-wide`}>
                  {siteConfig.reception.venue}
                </p>
              </div>
            </div>
            

            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
         
              <div className="text-center mb-5 sm:mb-8">
                {siteConfig.reception.time === "To follow after the ceremony" ? (
                  <p className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)]  font-semibold text-white tracking-wide`}>
                    To follow after the ceremony
                  </p>
                ) : (
                  <>
                    <p className={`${cinzel.className} text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-white/90 uppercase tracking-[0.2em] mb-2 sm:mb-3`}>
                      {siteConfig.reception.time === "After ceremony" ? "Starts" : "Starts at"}
                    </p>
                    <p className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-white tracking-wide`}>
                      {siteConfig.reception.time}
                    </p>
                  </>
                )}
              </div>

        
              <div className={`${GLASS_INNER_CLASS} mb-4 sm:mb-6`}>
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-white mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className={`${cinzel.className} text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-white leading-relaxed`}>
                      {receptionVenueName}
                    </p>
                    {receptionVenueDetail && (
                    <p className={`${cinzel.className} text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-white/70 leading-relaxed mt-1`}>
                        {receptionVenueDetail}
                      </p>
                    )}
                    <p className={`${cinzel.className} text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-white/70 leading-relaxed`}>
                      {receptionAddress}
                    </p>
                  </div>
              
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-white/90 p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-white/40 shadow-sm">
                      <QRCodeSVG
                        value={receptionMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#3E2914"
                        bgColor="#FFFFFF"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-white/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

     
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(receptionMapsLink)}
                  className={BTN_PRIMARY}
                  aria-label="Get directions to reception venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(receptionVenue, 'reception')}
                  className={BTN_SECONDARY}
                  aria-label="Copy reception venue address"
                >
                  {copiedItems.has('reception') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-white" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('reception') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attire Guide */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6">
        <div className="flex items-center justify-center mb-4 sm:mb-5">
          <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" aria-hidden />
        </div>
        <h3 className="font-[family-name:var(--font-safira-march)] text-[1.2rem] sm:text-[1.45rem] md:text-[1.65rem] leading-none tracking-[0.01em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.2)]">
          Attire Guide
        </h3>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 md:mb-10">
        <div className={GLASS_CARD_CLASS}>
          <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-7">
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] max-w-2xl mx-auto rounded-lg sm:rounded-xl overflow-hidden border border-white/25">
              <Image
                src="/Details/new-guestAttire.png"
                alt="Attire guide"
                fill
                className="object-contain bg-[#FFF7F6]/50 p-2 sm:p-3"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 672px"
              />
            </div>

            <div className={`${GLASS_INNER_CLASS} mt-5 sm:mt-6 px-3 py-3 sm:px-4 sm:py-3.5`}>
              <p className={`${cormorant.className} text-left text-sm sm:text-base text-white leading-snug sm:leading-relaxed`}>
                We humbly request the honor of our Ninangs&apos; presence in elegant beige or champagne-colored dresses,{" "}
                <NameConnector size="sm">and</NameConnector>{" "}
                our Ninongs&apos; presence in a classic Barong Tagalog with a white undershirt paired with black slacks.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/20">
              <div className="flex flex-col items-center mb-4 sm:mb-5">
                <p className="font-[family-name:var(--font-safira-march)] text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] leading-none tracking-[0.01em] text-white text-center mb-3 sm:mb-4 [text-shadow:0_2px_10px_rgba(0,0,0,0.2)]">
                  Friendly Reminder
                </p>
                <Image
                  src="/Details/camera.png"
                  alt=""
                  width={288}
                  height={288}
                  className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 object-contain brightness-0 invert opacity-90"
                  aria-hidden
                />
              </div>
              <div className={`${GLASS_INNER_CLASS} px-3 py-3 sm:px-4 sm:py-3.5`}>
                <p className={`${cormorant.className} text-left text-sm sm:text-base text-white leading-snug sm:leading-relaxed`}>
                  We warmly invite you to capture special moments of our wedding. As the ceremony begins, we kindly ask that phones{" "}
                  <NameConnector size="sm">and</NameConnector>{" "}
                  cameras remain out of the aisle. Feel free to take photos discreetly from your seat, allowing our photographers to capture each moment without obstruction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(91,102,85,0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-motif-deep rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "var(--color-motif-cream)" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, var(--color-motif-cream), var(--color-motif-cream), var(--color-motif-deep))" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-motif-accent backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)", color: "var(--color-motif-cream)" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#E1D5C7] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="var(--color-motif-cream)" style={{ color: "var(--color-motif-cream)" }} />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-motif-cream" />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "var(--color-motif-deep)" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src={showImageModal === "ceremony" ? "/Details/ceremony&location.jpg" : "/Details/Kayama Mountain Resort And Events Place, Sitio Kaytuyang, Brgy. Aga Nasugbu, Batangas.png"}
                alt={showImageModal === "ceremony" ? ceremonyLocationFormatted : receptionLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className={`${cormorant.className} p-5 sm:p-6 md:p-8 bg-motif-deep backdrop-blur-sm border-t-2 relative`}
              style={{ borderColor: "var(--color-motif-cream)" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-motif-cream/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3`}
                      style={{ color: "var(--color-motif-cream)" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6 text-motif-cream" fill="var(--color-motif-cream)" />
                      ) : (
                        <Utensils className="w-6 h-6 text-motif-cream" />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70 text-motif-cream">
                      <MapPin className="w-4 h-4 text-motif-cream" />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "var(--color-motif-cream)",
                          backgroundColor: "var(--color-motif-deep)",
                          opacity: 0.9,
                          borderColor: "var(--color-motif-cream)",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream" />
                        <span>
                          {formattedCeremonyDate} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "var(--color-motif-cream)",
                          backgroundColor: "var(--color-motif-deep)",
                          opacity: 0.9,
                          borderColor: "var(--color-motif-cream)",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream" />
                        <span>
                          {formattedReceptionDate} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-motif-deep border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-motif-accent whitespace-nowrap text-motif-cream"
                      title="Copy address"
                      style={{ borderColor: "var(--color-motif-cream)" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap bg-motif-cream text-white"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                  <div className="flex items-center gap-2 text-xs opacity-65 text-motif-cream">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
