"use client"

import { useMemo, useState, type ReactNode } from "react"
import type { SiteConfig } from "@/lib/site-config"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/section"
import Image from "next/image"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
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
  "rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300"

const LINK_CLASS =
  "underline font-semibold text-white transition-colors hover:text-white/75"

interface FAQItem {
  question: string
  answer: string | ReactNode
}

function getFaqItems(siteConfig: SiteConfig): FAQItem[] {
  return [
    {
      question: "When is the wedding?",
      answer: `Our wedding will be held on ${siteConfig.ceremony.date} (${siteConfig.ceremony.day})`,
    },
    {
      question: "What time should I arrive for the ceremony?",
      answer: `Our ceremony will begin promptly at ${siteConfig.ceremony.time}. We kindly ask guests to arrive 30–45 minutes earlier to allow enough time for parking, walking to the ceremony area, and finding your seats so we can begin on time.`,
    },
    {
      question: "Where will the ceremony and reception take place?",
      answer: `The ceremony and reception will be held at ${siteConfig.ceremony.location}, ${siteConfig.ceremony.venue}. You can find detailed directions, addresses, and maps in the Details Section above`,
    },
    {
      question: "How do I RSVP?",
      answer: (
        <>
          Please RSVP using the{" "}
          <a
            href="#guest-list"
            className={LINK_CLASS}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            guest list
          </a>{" "}
          on this invitation: search for your name and confirm your attendance.
          {"\n"}
          Please respond by {siteConfig.details.rsvp.deadline.replace(/\.\s*$/, "")}.
          {"\n"}
          If you have questions, message{" "}
          <a
            href={`https://www.facebook.com/${siteConfig.couple.groom}`}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            {siteConfig.details.rsvp.contact}
          </a>{" "}
          or{" "}
          <a
            href={`https://www.facebook.com/${siteConfig.couple.groom}`}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            {siteConfig.couple.groom}
          </a>{" "}
          on Messenger.
        </>
      ),
    },
    {
      question: "Can I sit anywhere at the reception?",
      answer:
        "Please don't. We kindly ask our guests to follow the seating arrangement prepared for the reception.\n\nA great deal of thought and care went into planning the seating so that everyone will feel comfortable and be seated with friends, family, or guests who share similar connections. Each seat was thoughtfully arranged with every guest in mind. Our reception team will gladly assist you in finding your assigned table.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, parking is available at the venue, and parking attendants, along with our coordinators, will assist you on the day",
    },
    {
      question: "Will there be a wedding gift registry?",
      answer:
        "With all that we have, we are truly blessed. Your presence and prayers are what we request most. However, if you desire to give nonetheless, a monetary gift to help us begin our new life together would be humbly appreciated. You can find our gift registry information in the Gift Guide section.",
    },
    {
      question: "Unplugged Ceremony",
      answer:
        "We warmly invite you to capture special moments of our wedding. As the ceremony begins, we kindly ask that phones and cameras remain out of the aisle. Feel free to take photos discreetly from your seat, allowing our photographers to capture each moment without obstruction.",
    },
    {
      question: "Can I take photos or videos during the reception?",
      answer:
        "Yes! While our I DO's will be unplugged, our reception will not be. As a couple who loves photos and memories, we would love for you to capture the fun moments throughout the evening. We prepared this celebration wholeheartedly and we want everyone to enjoy it fully.",
    },
    {
      question: "What should I do if I can't make it?",
      answer:
        "Your presence will truly be missed, but we completely understand.\n\nPlease kindly let us know through RSVP as soon as possible so we may adjust arrangements accordingly.",
    },
    {
      question: 'I said "No" to RSVP but my plans changed. Can I still attend?',
      answer:
        "Please check with us first before making arrangements. Due to limited seating and a carefully planned guest list, attendance cannot be guaranteed without prior confirmation.",
    },
    {
      question: "When is the appropriate time to leave?",
      answer:
        "It took us some time to plan for a heartfelt wedding that everyone would hopefully enjoy. We humbly request that you celebrate with us until the program ends. Please don't eat and run! Let's laugh, take pictures, sing, and have fun!",
    },
    {
      question: "Can I bring my children to the wedding?",
      answer:
        "We adore your little ones — truly. However, we have lovingly planned this as an adults-only celebration so that every guest, including you, can fully relax, enjoy the program, and be present in the moment.\n\nWe kindly ask that you make childcare arrangements for the day. We hope you understand, and we are so grateful that you are celebrating this milestone with us.",
    },
    {
      question: "What if I have dietary restrictions or allergies?",
      answer:
        "Please let us know about any dietary restrictions or allergies when you RSVP. We want to ensure everyone can enjoy the celebration comfortably.",
    },
    {
      question: "How can I help the couple have a great time during their wedding?",
      answer:
        "• Pray with us for favorable weather and the continuous blessings of our Lord as we enter this new chapter of our lives as husband and wife.\n\n• RSVP as soon as your schedule is cleared.\n\n• Dress appropriately and follow our wedding motif.\n\n• Be on time.\n\n• Follow the seating arrangement in the reception.\n\n• Stay until the end of the program.\n\n• Join the activities and enjoy!",
    },
  ]
}

function FAQAnswer({ answer }: { answer: string | ReactNode }) {
  if (typeof answer === "string" && answer.includes("[RSVP_LINK]")) {
    return (
      <p className={`${cormorant.className} text-sm sm:text-base text-white/90 leading-relaxed sm:leading-loose whitespace-pre-line`}>
        {answer.split("[RSVP_LINK]")[0]}
        <a
          href="#guest-list"
          className={LINK_CLASS}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("guest-list")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          {answer.match(/\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/)?.[1]}
        </a>
        {answer.split("[/RSVP_LINK]")[1]}
      </p>
    )
  }

  if (typeof answer === "string") {
    return (
      <p className={`${cormorant.className} text-sm sm:text-base text-white/90 leading-relaxed sm:leading-loose whitespace-pre-line`}>
        {answer}
      </p>
    )
  }

  return (
    <div className={`${cormorant.className} text-sm sm:text-base text-white/90 leading-relaxed sm:leading-loose whitespace-pre-line`}>
      {answer}
    </div>
  )
}

export function FAQ() {
  const siteConfig = useSiteConfig()
  const faqItems = useMemo(() => getFaqItems(siteConfig), [siteConfig])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section
      id="faq"
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
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
          <div className="h-px w-16 sm:w-24 bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
          <div className="h-px w-16 sm:w-24 bg-white/40" />
        </div>
        <h2
          className="leading-none text-white"
          style={{
            fontFamily: "var(--font-brittany), cursive",
            fontSize: "clamp(2rem, 9vw, 4.5rem)",
            letterSpacing: "0.01em",
            textShadow: "0 3px 16px rgba(0,0,0,0.25)",
          }}
        >
          Frequently Asked Questions
        </h2>
        <p
          className={`${cinzel.className} text-sm sm:text-base md:text-lg text-white/90 font-normal max-w-xl mx-auto leading-relaxed tracking-[0.14em] px-4 mt-2`}
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
        >
          Helpful notes so you can simply arrive, celebrate, and enjoy this new chapter with us.
        </p>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className={GLASS_CARD_CLASS}>
          <div className="p-3 sm:p-5 md:p-7 lg:p-9 space-y-2 sm:space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index
              const contentId = `faq-item-${index}`

              return (
                <div
                  key={index}
                  className={`${GLASS_INNER_CLASS} ${isOpen ? "border-white/35 bg-white/15" : "hover:border-white/30 hover:bg-white/12"}`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="group w-full px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <span
                      className={`${cinzel.className} font-semibold pr-3 sm:pr-4 text-xs sm:text-sm md:text-base lg:text-lg leading-snug sm:leading-relaxed transition-colors duration-200 ${
                        isOpen ? "text-white" : "text-white/95 group-hover:text-white"
                      }`}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-white/80 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-white" : "group-hover:text-white"
                      }`}
                      aria-hidden
                    />
                  </button>

                  <div
                    id={contentId}
                    role="region"
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 pt-0 border-t border-white/15">
                        <FAQAnswer answer={item.answer} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
