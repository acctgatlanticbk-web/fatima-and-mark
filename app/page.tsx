"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { Hero as MainHero } from "@/components/sections/hero"
import { Welcome } from "@/components/sections/welcome"
import { Countdown } from "@/components/sections/countdown"
import { Gallery } from "@/components/sections/gallery"
import { Messages } from "@/components/sections/messages"
import { Details } from "@/components/sections/details"
import { Entourage } from "@/components/sections/entourage"
import { PrincipalSponsors } from "@/components/sections/principal-sponsors"
import { BookOfGuests } from "@/components/sections/book-of-guests"
import { Registry } from "@/components/sections/registry"
import { FAQ } from "@/components/sections/faq"
import { GuestInformation } from "@/components/sections/guest-information"
import { Footer } from "@/components/sections/footer"
import { LoveStory } from "@/components/sections/love-story"
import { WeddingPlaylist } from "@/components/sections/wedding-playlist"
import { Navbar } from "@/components/navbar"
import { SnapShare } from "@/components/sections/snap-share"
import { CoupleVideo } from "@/components/sections/couple-video"

const GuestList = dynamic(() => import("@/components/sections/guest-list").then(mod => ({ default: mod.GuestList })), { ssr: false })

export default function Home() {
  // When returning from /gallery, scroll to the hash in the URL
  useEffect(() => {
    const returning = sessionStorage.getItem("returnFromGallery")
    if (returning === "true") {
      sessionStorage.removeItem("returnFromGallery")
    }
    const hash = window.location.hash
    if (!hash) return
    const id = setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }, 100)
    return () => clearTimeout(id)
  }, [])

  return (
      <div className="relative min-h-screen overflow-hidden bg-[#A02C1D] font-sans text-charcoal selection:bg-birch selection:text-nut">
        <main className="relative w-full h-full">
          <div className="relative z-10">
            <Navbar />
            {/* Spacer so content starts below fixed navbar (h-12 sm:h-14 md:h-16) */}
            <div className="h-12 sm:h-14 md:h-16" aria-hidden />
            <MainHero />
            <Welcome />             
               {/* <CoupleVideo />  */}
              {/* <LoveStory /> */}
            <Countdown />
            <Entourage />
            <Details />
            <Messages />
            <GuestList />
            <BookOfGuests />
            {/* <PrincipalSponsors /> */}
            <FAQ />
            <Registry />
            <SnapShare />
            <Footer />
          </div>
        </main>
      </div>
  )
}
