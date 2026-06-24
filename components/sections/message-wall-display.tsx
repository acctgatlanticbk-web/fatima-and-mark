"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { Cormorant_Garamond } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

interface Message {
  timestamp: string
  name: string
  message: string
}

interface MessageWallDisplayProps {
  messages: Message[]
  loading: boolean
}

export default function MessageWallDisplay({ messages, loading }: MessageWallDisplayProps) {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setVisibleMessages(messages)
        setIsAnimating(false)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setVisibleMessages([])
    }
  }, [messages])

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl sm:rounded-2xl bg-white/10 p-3 sm:p-4 md:p-5">
            <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-white/20" />
                <div className="space-y-1.5 sm:space-y-2">
                  <Skeleton className="h-3 w-20 sm:w-24 md:w-32 bg-white/20" />
                  <Skeleton className="h-2.5 w-16 sm:w-20 md:w-24 bg-white/15" />
                </div>
              </div>
            </div>
            <Skeleton className="h-12 sm:h-14 md:h-16 w-full bg-white/10 rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-6 sm:py-10 md:py-14 lg:py-16 px-2 sm:px-4">
        <div className="relative inline-block mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-150 animate-pulse-slow" />
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto shadow-lg bg-white/20 border border-white/30">
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white" />
          </div>
        </div>
        <h3
          className={`${cormorant.className} text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-white`}
        >
          No Messages Yet
        </h3>
        <p
          className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg max-w-md mx-auto leading-relaxed mb-4 sm:mb-5 md:mb-6 text-white/90`}
        >
          Be the first to share your heartfelt wishes for the happy couple!
        </p>
        <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 flex justify-center">
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30 bg-white/10">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse text-white/80" />
            <span className={`${cormorant.className} text-[10px] sm:text-xs md:text-sm text-white/90`}>Your message will appear here</span>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse text-white/80" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-5">
      {visibleMessages.map((msg, index) => (
        <div
          key={index}
          className={`relative rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-500 group overflow-hidden transform hover:bg-white/15 hover:scale-[1.01] ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            animation: isAnimating ? "none" : "fadeInUp 0.6s ease-out forwards",
          }}
        >
          <div className="relative p-3 sm:p-4 md:p-5">
            <div className="flex justify-between items-start mb-2 sm:mb-2.5 md:mb-3">
              <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg bg-white/20 border border-white/30">
                    <span className={`${cormorant.className} text-xs sm:text-sm md:text-base font-semibold text-white`}>
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2 gap-y-0.5">
                    <h4 className={`${cormorant.className} text-xs sm:text-sm md:text-base font-semibold text-white`}>
                      {msg.name}
                    </h4>
                    <span className={`${cormorant.className} text-[9px] sm:text-[10px] md:text-xs text-white/70`}>
                      {new Date(msg.timestamp).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 transition-all duration-300 group-hover:scale-110 text-white/70" />
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 text-white/80" />
              </div>
            </div>

            <p className={`${cormorant.className} text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-loose italic text-white/95 pl-1 sm:pl-2`}>
              &ldquo;{msg.message}&rdquo;
            </p>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
