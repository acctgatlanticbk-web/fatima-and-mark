"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Instagram, Facebook, Twitter, Share2, Copy, Download, Check } from "lucide-react"
import { Section } from "@/components/section"
import { QRCodeCanvas } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { Cormorant_Garamond, Cinzel } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const GLASS_CARD_CLASS =
  "relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[2rem] border border-white/25 bg-white/15 backdrop-blur-lg shadow-[0_20px_70px_rgba(0,0,0,0.12)]"

const INNER_PANEL_CLASS =
  "rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-7 lg:p-8 bg-white/10 backdrop-blur-sm"

function GlassOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div
        className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2"
        style={{ background: "radial-gradient(circle at center, color-mix(in srgb, white 8%, transparent), transparent 60%)" }}
      />
      <div
        className="absolute bottom-[-6rem] right-[-2rem] h-64 w-64"
        style={{ background: "radial-gradient(circle at center, color-mix(in srgb, white 6%, transparent), transparent 60%)" }}
      />
    </div>
  )
}

function MotifDivider() {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="h-px w-10 rounded-full bg-white/40 sm:w-14" />
      <div className="flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      </div>
      <span className="h-px w-10 rounded-full bg-white/40 sm:w-14" />
    </div>
  )
}

// QRCodeCanvas renders to <canvas> which cannot resolve CSS variables.
const MOTIF_DEEP_HEX = "#3E2914"

export function SnapShare() {
  const siteConfig = useSiteConfig()
  const [copiedHashtagIndex, setCopiedHashtagIndex] = useState<number | null>(null)
  const [copiedAllHashtags, setCopiedAllHashtags] = useState(false)
  const [copiedDriveLink, setCopiedDriveLink] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const websiteUrl = typeof window !== "undefined" ? window.location.href : "https://example.com"
  const uploadLink = siteConfig.snapShare.googleDriveLink
  // const hashtags = [siteConfig.snapShare.hashtag] (multiple hashtags)
  const hashtags = siteConfig.snapShare.hashtag
  const allHashtagsText = hashtags.join(" ")
  const groomNickname = siteConfig.couple.groomNickname
  const brideNickname = siteConfig.couple.brideNickname
  const sanitizedGroomName = groomNickname.replace(/\s+/g, "")
  const sanitizedBrideName = brideNickname.replace(/\s+/g, "")

  const shareText = `Celebrate ${groomNickname} & ${brideNickname}'s wedding! Explore the details and share your special memories: ${websiteUrl} ${allHashtagsText} ✨`

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])


  const shareOnSocial = (platform: "instagram" | "facebook" | "twitter" | "tiktok") => {
    const encodedUrl = encodeURIComponent(websiteUrl)
    const encodedText = encodeURIComponent(shareText)

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    }

    const target = urls[platform]
    if (target) {
      window.open(target, "_blank", "width=600,height=400")
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById("snapshare-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `${sanitizedGroomName.toLowerCase()}-${sanitizedBrideName.toLowerCase()}-wedding-qr.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const downloadAlbumQRCode = () => {
    const canvas = document.getElementById("album-qr") as HTMLCanvasElement | null
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "album-qr.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const copyHashtag = async (hashtag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hashtag)
      setCopiedHashtagIndex(index)
      setTimeout(() => setCopiedHashtagIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyAllHashtags = async () => {
    try {
      await navigator.clipboard.writeText(allHashtagsText)
      setCopiedAllHashtags(true)
      setTimeout(() => setCopiedAllHashtags(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const copyUploadLink = async () => {
    if (uploadLink) {
      try {
        await navigator.clipboard.writeText(uploadLink)
        setCopiedDriveLink(true)
        setTimeout(() => setCopiedDriveLink(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <Section
      id="snap-share"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 md:px-8">
        <motion.div
          className="text-center mb-5 sm:mb-8 md:mb-10"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className={`${cormorant.className} inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[10px] sm:text-xs uppercase text-white/90`}
            style={{ letterSpacing: "0.3em" }}
          >
            Share your memories
          </div>
          <h2
            className={`${cinzel.className} text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mt-2 sm:mt-4`}
            style={{
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textShadow: "0 2px 12px rgba(0,0,0,0.15)",
              fontWeight: 600,
            }}
          >
            Capture & Share the Celebration
          </h2>
          <p
            className={`${cormorant.className} text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto mt-2 sm:mt-4 leading-relaxed px-2`}
          >
            Help us remember the little moments of {groomNickname} & {brideNickname}&apos;s day—every smile, embrace, and candid laugh. Your photos and clips complete our love story.
          </p>
          <div className="mt-3 sm:mt-5">
            <MotifDivider />
          </div>
        </motion.div>

        <div className={`${GLASS_CARD_CLASS} max-w-2xl md:max-w-3xl mx-auto`}>
          <GlassOverlay />
          <div className="relative z-10 p-4 sm:p-5 md:p-6 lg:p-8">
        <motion.div
          className="space-y-3 sm:space-y-5 lg:space-y-6"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <motion.div className="space-y-3 sm:space-y-5 lg:space-y-6 flex flex-col" variants={fadeInUp}>
            <div className="flex-1">
              <div className={`${INNER_PANEL_CLASS} text-center h-full flex flex-col`}>
                <h4
                  className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 uppercase`}
                  style={{ letterSpacing: "0.08em" }}
                >
                  Share Our Wedding Website
                </h4>
                <p
                  className={`${cormorant.className} text-white/90 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed px-1`}
                >
                  Spread the word about {groomNickname} & {brideNickname}&apos;s wedding celebration. Share this QR code with friends and family so they can join the celebration.
                </p>
                <div className="mx-auto inline-flex flex-col items-center bg-white/90 backdrop-blur-sm p-2.5 sm:p-5 md:p-7 rounded-xl sm:rounded-2xl shadow-md border border-white/40 mb-3 sm:mb-4 flex-1 justify-center">
                  <div className="mb-2 sm:mb-3 p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-white/80">
                    <div className="bg-white p-1.5 sm:p-3 rounded-lg shadow-sm border border-white/80">
                      <QRCodeCanvas 
                        id="snapshare-qr" 
                        value={websiteUrl} 
                        size={isMobile ? 140 : 220} 
                        includeMargin 
                        className="bg-white" 
                        fgColor={MOTIF_DEEP_HEX}
                      />
                    </div>
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-1.5 sm:gap-2 mx-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white text-[#7D7F2E] border border-white/80 shadow-[0_10px_28px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_38px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all duration-200 text-xs sm:text-sm font-semibold"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span
                      className={`${cormorant.className} uppercase font-semibold`}
                      style={{ letterSpacing: "0.15em" }}
                    >
                      Download QR
                    </span>
                  </button>
                </div>
                <p
                  className={`${cormorant.className} text-white/85 text-xs sm:text-sm mt-auto leading-relaxed`}
                >
                  Scan with any camera app to open the full invitation and schedule.
                </p>
              </div>
            </div>

            {hashtags.length > 0 && (
            <div className={`${INNER_PANEL_CLASS} text-center`}>
              {/* Compact header */}
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3 text-center">
                <h5
                  className={`${cinzel.className} text-xs sm:text-xs md:text-sm font-semibold text-white uppercase text-center mx-auto`}
                  style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  Wedding Hashtags
                </h5>

              </div>

              {/* Hashtag rows — full-width tap targets */}
              <div className="space-y-1.5 mb-2.5 sm:mb-3">
                {hashtags.map((hashtag, index) => (
                  <motion.button
                    key={index}
                    onClick={() => copyHashtag(hashtag, index)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 sm:py-2.5 rounded-lg border transition-all duration-200 active:scale-[0.98] ${
                      copiedHashtagIndex === index
                        ? "bg-white/20 border-white/50"
                        : "bg-white/10 border-white/25 hover:border-white/40 hover:bg-white/15"
                    }`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span
                      className={`${cormorant.className} font-semibold text-sm sm:text-base text-left truncate flex-1 ${
                        copiedHashtagIndex === index ? "text-white" : "text-white/95"
                      }`}
                    >
                      {hashtag}
                    </span>
                    <span
                      className={`flex items-center gap-1 flex-shrink-0 text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                        copiedHashtagIndex === index ? "text-white" : "text-white/70"
                      }`}
                    >
                      {copiedHashtagIndex === index
                        ? <><Check className="w-3 h-3" /> Copied</>
                        : <><Copy className="w-3 h-3" /> Copy</>}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Copy All — compact outline */}
              <button
                onClick={copyAllHashtags}
                className={`w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-lg border transition-all duration-200 active:scale-[0.98] ${
                  copiedAllHashtags
                    ? "bg-white/20 border-white/50 text-white"
                    : "bg-white/10 border-white/30 text-white/95 hover:bg-white/20 hover:border-white/45"
                }`}
              >
                {copiedAllHashtags ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span
                  className={`${cormorant.className} text-xs sm:text-sm font-semibold uppercase`}
                  style={{ letterSpacing: "0.12em" }}
                >
                  {copiedAllHashtags ? "All Copied!" : "Copy All"}
                </span>
              </button>
            </div>
            )}

            <div className={INNER_PANEL_CLASS}>
              <h5
                className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3 text-center uppercase`}
                style={{ letterSpacing: "0.08em" }}
              >
                Share on Social Media
              </h5>
              <p
                className={`${cormorant.className} text-white/90 text-xs sm:text-sm text-center mb-3 sm:mb-4 leading-relaxed`}
              >
                Help spread the word about {groomNickname} & {brideNickname}&apos;s wedding celebration. Share the event across your favorite platforms.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => shareOnSocial("instagram")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/30 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-white/25 transition-all duration-200 shadow-md hover:shadow-lg hover:border-white/45"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span
                    className={`${cormorant.className} font-semibold text-xs sm:text-sm uppercase`}
                    style={{ letterSpacing: "0.18em" }}
                  >
                    Instagram
                  </span>
                </button>
                <button
                  onClick={() => shareOnSocial("facebook")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/30 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-white/25 transition-all duration-200 shadow-md hover:shadow-lg hover:border-white/45"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span
                    className={`${cormorant.className} font-semibold text-xs sm:text-sm uppercase`}
                    style={{ letterSpacing: "0.18em" }}
                  >
                    Facebook
                  </span>
                </button>
                <button
                  onClick={() => shareOnSocial("tiktok")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/30 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-white/25 transition-all duration-200 shadow-md hover:shadow-lg hover:border-white/45"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span
                    className={`${cormorant.className} font-semibold text-xs sm:text-sm uppercase`}
                    style={{ letterSpacing: "0.18em" }}
                  >
                    TikTok
                  </span>
                </button>
                <button
                  onClick={() => shareOnSocial("twitter")}
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-white/15 border border-white/30 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-white/25 transition-all duration-200 shadow-md hover:shadow-lg hover:border-white/45"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span
                    className={`${cormorant.className} font-semibold text-xs sm:text-sm uppercase`}
                    style={{ letterSpacing: "0.18em" }}
                  >
                    Twitter
                  </span>
                </button>
              </div>
            </div>

            {uploadLink && (
              <div>
                <div className={`${INNER_PANEL_CLASS} text-center`}>
                  <div
                    className={`${cormorant.className} inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] sm:text-xs uppercase text-white/90 mb-2 sm:mb-3`}
                    style={{ letterSpacing: "0.28em" }}
                  >
                    Upload Your Photos & Videos
                  </div>
                  <p
                    className={`${cormorant.className} text-white/90 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 px-1`}
                  >
                    Help us capture our special day! Scan the QR or use the actions below to upload your photos and videos.
                  </p>
                  <div className="mx-auto inline-flex flex-col items-center bg-white/90 backdrop-blur-sm p-2.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md border border-white/40 mb-3 sm:mb-4">
                    <div className="mb-2 sm:mb-3 p-1.5 sm:p-3 rounded-lg sm:rounded-xl bg-white border border-white/80">
                      <div className="bg-white p-1.5 sm:p-3 rounded-lg shadow-sm border border-white/80">
                        <QRCodeCanvas
                          id="album-qr"
                          value={uploadLink}
                          size={isMobile ? 150 : 220}
                          level="H"
                          includeMargin
                          className="bg-white"
                          fgColor="#000000"
                        />
                      </div>
                    </div>
                    <p className={`${cormorant.className} text-[#7D7F2E] text-xs sm:text-sm`}>Scan with your camera app</p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
                    <button
                      onClick={copyUploadLink}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border shadow-sm hover:shadow-md text-xs sm:text-sm transition-all ${
                        copiedDriveLink
                          ? "bg-white/25 border-white/50 text-white"
                          : "bg-white text-[#7D7F2E] border-white/80"
                      }`}
                    >
                      {copiedDriveLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span
                            className={`${cormorant.className} uppercase font-semibold`}
                            style={{ letterSpacing: "0.18em" }}
                          >
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span
                            className={`${cormorant.className} uppercase font-semibold`}
                            style={{ letterSpacing: "0.18em" }}
                          >
                            Copy Link
                          </span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadAlbumQRCode}
                      className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white text-[#7D7F2E] border border-white/80 shadow-sm hover:shadow-md text-xs sm:text-sm transition-all font-semibold"
                    >
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span
                        className={`${cormorant.className} uppercase font-semibold`}
                        style={{ letterSpacing: "0.18em" }}
                      >
                        Download QR
                      </span>
                    </button>
                    <a
                      href={uploadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/15 border border-white/30 text-white shadow-sm hover:shadow-md hover:bg-white/25 text-xs sm:text-sm transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span
                        className={`${cormorant.className} tracking-[0.15em] sm:tracking-[0.18em] uppercase font-semibold`}
                      >
                        Upload Photos
                      </span>
                    </a>
                  </div>
                  <p className={`${cormorant.className} text-white/85 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed`}>or tap &quot;Upload Photos&quot; below.</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div className="text-center mt-5 sm:mt-8" variants={fadeInUp}>
          <div className={`${INNER_PANEL_CLASS} max-w-3xl mx-auto`}>
            <p
              className={`${cormorant.className} text-white/95 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 px-2`}
            >
              Thank you for helping make {groomNickname} & {brideNickname}&apos;s wedding celebration memorable. Your photos and messages create beautiful memories
              that we will treasure for a lifetime.
            </p>
            <div
                className={`${cormorant.className} flex items-center justify-center gap-2 text-white/90 text-xs sm:text-sm uppercase`}
              style={{ letterSpacing: "0.25em" }}
            >
              <span>Thank you for sharing the joy</span>
            </div>
          </div>
        </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}