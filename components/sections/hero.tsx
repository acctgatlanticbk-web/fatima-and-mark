import Image from "next/image"

export function Hero() {
  return (
    <section id="home" className="relative flex w-full justify-center px-4 sm:px-6">
      <Image
        src="/Details/Gemini_Generated_Image_i3b31ii3b31ii3b3-removebg-preview.png"
        alt="Wedding invitation hero"
        width={409}
        height={566}
        className="h-auto w-full max-w-[409px] md:max-w-[480px] lg:max-w-[520px]"
        priority
      />
    </section>
  )
}
