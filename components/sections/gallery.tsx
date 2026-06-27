"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const galleryItems = [
  { image: "/mobile-gallery/couple (1).jpeg", text: " " },
  { image: "/mobile-gallery/couple (2).jpeg", text: " " },
  { image: "/mobile-gallery/couple (3).jpeg", text: " " },
  { image: "/mobile-gallery/couple (4).jpeg", text: " " },
  { image: "/mobile-gallery/couple (5).jpeg", text: " " },
  { image: "/mobile-gallery/couple (6).jpeg", text: " " },
  { image: "/mobile-gallery/couple (7).jpeg", text: " " },
  { image: "/mobile-gallery/couple (8).jpeg", text: " " },
  { image: "/mobile-gallery/couple (9).jpeg", text: " " },
  { image: "/mobile-gallery/couple (10).jpeg", text: " " },
  { image: "/mobile-gallery/couple (11).jpeg", text: " " },
  { image: "/newglobe/couple (1).jpeg", text: " " },
  { image: "/newglobe/couple (1).jpg", text: " " },
  { image: "/newglobe/couple (1).PNG", text: " " },
  { image: "/newglobe/couple (2).jpeg", text: " " },
  { image: "/newglobe/couple (2).jpg", text: " " },
  { image: "/newglobe/couple (3).jpeg", text: " " },
  { image: "/newglobe/couple (3).jpg", text: " " },
  { image: "/newglobe/couple (4).jpeg", text: " " },
  { image: "/newglobe/couple (4).JPG", text: " " },
  { image: "/newglobe/couple (5).jpeg", text: " " },
  { image: "/newglobe/couple (5).JPG", text: " " },
  { image: "/newglobe/couple (6).jpeg", text: " " },
  { image: "/newglobe/couple (6).jpg", text: " " },
  { image: "/newglobe/couple (7).jpeg", text: " " },
  { image: "/newglobe/couple (7).jpg", text: " " },
  { image: "/newglobe/couple (8).JPG", text: " " },
  { image: "/newglobe/couple (9).jpg", text: " " },
  { image: "/newglobe/couple (10).JPG", text: " " },
  { image: "/newglobe/couple (11).JPG", text: " " },
  { image: "/newglobe/couple (12).jpg", text: " " },
  { image: "/newglobe/couple (13).jpg", text: " " },
  { image: "/newglobe/couple (14).jpg", text: " " },
  { image: "/newglobe/couple (15).jpg", text: " " },
  { image: "/newglobe/couple (16).jpg", text: " " },
  { image: "/newglobe/couple (17).jpg", text: " " },
  { image: "/newglobe/couple (18).jpg", text: " " },
  { image: "/newglobe/couple (19).jpg", text: " " },
  { image: "/newglobe/couple (20).jpg", text: " " },
  { image: "/newglobe/couple (21).jpg", text: " " },
  { image: "/newglobe/couple (22).jpg", text: " " },
]

type GalleryItem = { image: string; text: string }

function GalleryMobileCarousel({
  items,
  onOpen,
}: {
  items: GalleryItem[]
  onOpen: (item: GalleryItem, index: number) => void
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true, dragFree: false }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {items.map((item, index) => {
            const isActive = index === current
            return (
              <CarouselItem key={item.image + index} className="pl-3 basis-[88%]">
                <button
                  type="button"
                  className={`group relative w-full overflow-hidden rounded-xl transition-all duration-500 ease-out ${
                    isActive
                      ? "shadow-[0_12px_40px_rgba(0,0,0,0.2)] scale-100"
                      : "scale-[0.94] opacity-70"
                  }`}
                  onClick={() => onOpen(item, index)}
                  aria-label={`Open image ${index + 1}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.text || `Gallery image ${index + 1}`}
                      fill
                      sizes="88vw"
                      className={`object-cover transition-transform duration-700 ease-out ${
                        isActive ? "scale-100" : "scale-105"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-40"
                      }`}
                    />
                  </div>

                  <div className="absolute top-2 right-2 backdrop-blur-sm rounded-full px-2.5 py-1 bg-black/50 border border-white/10">
                    <span className="text-xs font-medium text-white">
                      {index + 1}/{items.length}
                    </span>
                  </div>
                </button>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          className="absolute left-0 top-[42%] z-10 -translate-y-1/2 rounded-full p-2 bg-black/35 backdrop-blur-md border border-white/25 text-white transition-all hover:bg-black/50 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          className="absolute right-0 top-[42%] z-10 -translate-y-1/2 rounded-full p-2 bg-black/35 backdrop-blur-md border border-white/25 text-white transition-all hover:bg-black/50 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </Carousel>

      {/* <div className="mt-4 flex items-center justify-center gap-1.5">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "h-2 w-6 bg-white"
                : "h-2 w-2 bg-white/35 hover:bg-white/55"
            }`}
          />
        ))}
      </div> */}

      <p className={`${cormorant.className} mt-2 text-center text-xs tracking-wide text-white/70`}>
        Swipe or tap arrows to explore
      </p>
    </div>
  )
}

export function Gallery() {
  const siteConfig = useSiteConfig()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // reserved for potential skeleton tracking; not used after fade-in simplification
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [zoomScale, setZoomScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [pinchStartDist, setPinchStartDist] = useState<number | null>(null)
  const [pinchStartScale, setPinchStartScale] = useState(1)
  const [lastTap, setLastTap] = useState(0)
  const [panStart, setPanStart] = useState<{ x: number; y: number; panX: number; panY: number } | null>(null)
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    setSlideDirection(direction === 'next' ? 'left' : 'right')
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex
      if (direction === 'next') {
        newIndex = (prevIndex + 1) % galleryItems.length
      } else {
        newIndex = (prevIndex - 1 + galleryItems.length) % galleryItems.length
      }
      setSelectedImage(galleryItems[newIndex])
      return newIndex
    })
    setTimeout(() => setSlideDirection(null), 300)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedImage) return
      if (e.key === 'ArrowLeft') navigateImage('prev')
      if (e.key === 'ArrowRight') navigateImage('next')
      if (e.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentIndex, navigateImage])

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedImage])

  // Preload adjacent images for smoother nav
  useEffect(() => {
    if (selectedImage) {
      const next = new window.Image()
      next.src = galleryItems[(currentIndex + 1) % galleryItems.length].image
      const prev = new window.Image()
      prev.src = galleryItems[(currentIndex - 1 + galleryItems.length) % galleryItems.length].image
    }
  }, [selectedImage, currentIndex])

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val))
  const resetZoom = () => {
    setZoomScale(1)
    setPan({ x: 0, y: 0 })
    setPanStart(null)
  }

  return (
    <div className="relative w-full">
      <section
        ref={sectionRef}
        id="gallery"
        className="relative z-10 py-12 sm:py-16 md:py-20 overflow-hidden"
      >
        {/* Section Header */}
        <div
          className={`relative z-30 flex flex-col items-center gap-4 sm:gap-5 md:gap-6 text-center mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <p
            className={`${cormorant.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white/90 max-w-xs sm:max-w-sm leading-relaxed`}
          >
            {siteConfig.couple.groomNickname} &amp; {siteConfig.couple.brideNickname}
          </p>

          <h2
            className="font-[family-name:var(--font-safira-march)] text-[clamp(1.6rem,5.8vw,2rem)] sm:text-[2.85rem] md:text-[3.55rem] lg:text-[4.1rem] xl:text-[4.6rem] leading-none tracking-[0.015em] sm:tracking-[0.01em] text-white px-2 sm:px-3 my-1 sm:my-1.5 [text-shadow:0_2px_14px_rgba(0,0,0,0.22)]"
          >
            Gallery
          </h2>

          <p
            className={`${cormorant.className} text-xs sm:text-sm md:text-base italic text-white/90 max-w-xl mx-auto leading-relaxed px-2 sm:px-3 mt-0.5 sm:mt-1`}
          >
            From our first chapter to this beautiful season of commitment, every moment has been a testament to love, faith, and grace.
          </p>
        </div>

        {/* Gallery container */}
        <div
          className={`relative z-30 max-w-6xl mx-auto px-3 sm:px-5 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-64 sm:h-80 md:h-96">
              <div className="w-12 h-12 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Mobile: Embla carousel */}
              <div className="sm:hidden">
                <GalleryMobileCarousel
                  items={galleryItems}
                  onOpen={(item, index) => {
                    setSelectedImage(item)
                    setCurrentIndex(index)
                  }}
                />
              </div>

              {/* Tablet/Desktop: grid */}
              <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.image + index}
                    type="button"
                    className="group relative w-full overflow-hidden rounded-xl transition-all duration-300"
                    onClick={() => {
                      setSelectedImage(item)
                      setCurrentIndex(index)
                    }}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <div className="relative aspect-[3/4] md:aspect-square overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.text || `Gallery image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="absolute top-2 right-2 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                      <span className="text-xs font-medium text-white">
                        {index + 1}/{galleryItems.length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => {
            setSelectedImage(null)
            resetZoom()
          }}
        >
            <div
              className="relative max-w-6xl w-full h-full sm:h-auto flex flex-col items-center justify-center"
              onTouchStart={(e) => {
                if (e.touches.length === 1) {
                  const now = Date.now()
                  if (now - lastTap < 300) {
                    setZoomScale((s) => (s > 1 ? 1 : 2))
                    setPan({ x: 0, y: 0 })
                  }
                  setLastTap(now)
                  const t = e.touches[0]
                  setTouchStartX(t.clientX)
                  setTouchDeltaX(0)
                  if (zoomScale > 1) {
                    setPanStart({ x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y })
                  }
                }
                if (e.touches.length === 2) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  setPinchStartDist(dist)
                  setPinchStartScale(zoomScale)
                }
              }}
              onTouchMove={(e) => {
                if (e.touches.length === 2 && pinchStartDist) {
                  const dx = e.touches[0].clientX - e.touches[1].clientX
                  const dy = e.touches[0].clientY - e.touches[1].clientY
                  const dist = Math.hypot(dx, dy)
                  const scale = clamp((dist / pinchStartDist) * pinchStartScale, 1, 3)
                  setZoomScale(scale)
                } else if (e.touches.length === 1) {
                  const t = e.touches[0]
                  if (zoomScale > 1 && panStart) {
                    const dx = t.clientX - panStart.x
                    const dy = t.clientY - panStart.y
                    setPan({ x: panStart.panX + dx, y: panStart.panY + dy })
                  } else if (touchStartX !== null) {
                    setTouchDeltaX(t.clientX - touchStartX)
                  }
                }
              }}
              onTouchEnd={() => {
                setPinchStartDist(null)
                setPanStart(null)
                if (zoomScale === 1 && Math.abs(touchDeltaX) > 50) {
                  navigateImage(touchDeltaX > 0 ? 'prev' : 'next')
                }
                setTouchStartX(null)
                setTouchDeltaX(0)
              }}
            >
            {/* Top bar with counter and close */}
            <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6">
              {/* Image counter */}
              <div className="backdrop-blur-md rounded-full px-4 py-2 border bg-black/40 border-white/20">
                <span className="text-sm sm:text-base font-medium text-white">
                  {currentIndex + 1} / {galleryItems.length}
                </span>
              </div>
              
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                  resetZoom()
                }}
                className="bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-2 sm:p-3 transition-all duration-200 border border-white/20 hover:border-white/40"
                aria-label="Close lightbox"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Navigation buttons */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('prev')
                    resetZoom()
                  }}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage('next')
                    resetZoom()
                  }}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full p-3 sm:p-4 transition-all duration-200 border border-white/20 hover:border-white/40"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="sm:w-7 sm:h-7 text-white" />
                </button>
              </>
            )}

            {/* Image container */}
            <div className="relative w-full h-full flex items-center justify-center pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden">
              <div
                className="relative inline-block max-w-full max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  key={selectedImage.image}
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.text || "Gallery image"}
                  width={1200}
                  height={1600}
                  sizes="100vw"
                  priority
                  style={{
                    transform: `translate3d(${
                      pan.x + (zoomScale === 1 && touchStartX !== null ? touchDeltaX : 0)
                    }px, ${pan.y}px, 0) scale(${zoomScale})`,
                    transition:
                      pinchStartDist || touchStartX !== null
                        ? "none"
                        : slideDirection
                          ? "transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease"
                          : "transform 200ms ease-out",
                    opacity: slideDirection ? 0.85 : 1,
                  }}
                  className={`max-w-full max-h-[75vh] w-auto h-auto sm:max-h-[85vh] object-contain rounded-lg shadow-2xl will-change-transform ${
                    slideDirection
                      ? `animate-in fade-in duration-300 ${
                          slideDirection === "left" ? "slide-in-from-right-8" : "slide-in-from-left-8"
                        }`
                      : ""
                  }`}
                />
                
                {/* Zoom reset button */}
                {zoomScale > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      resetZoom()
                    }}
                    className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-xs font-medium border border-white/20 transition-all duration-200"
                  >
                    Reset Zoom
                  </button>
                )}
              </div>
            </div>

            {/* Bottom hint for mobile */}
            {galleryItems.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:hidden z-20">
                <p className="text-xs text-white/60 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                  Swipe to navigate
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}