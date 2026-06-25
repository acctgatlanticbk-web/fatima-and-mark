import type { ReactNode } from "react"

const connectorSizeClass = {
  sm: "text-[1.3em] sm:text-[1.4em] mx-[0.4em] sm:mx-[0.5em] -translate-y-[0.06em] sm:-translate-y-[0.08em]",
  md: "text-[1.55em] sm:text-[1.7em] md:text-[1.85em] mx-[0.55em] sm:mx-[0.7em] md:mx-[0.85em] -translate-y-[0.1em] sm:-translate-y-[0.12em]",
} as const

export const coupleNameTextClass =
  "font-[family-name:var(--font-safira-march)] text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem] leading-none tracking-[0.04em] sm:tracking-[0.05em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.2)]"

export function StyledName({ name }: { name: string }) {
  const trimmed = name.trim()
  if (!trimmed) return null

  const firstLetter = trimmed.charAt(0)
  const remainder = trimmed.slice(1)

  return (
    <>
      <span className="inline-block font-[family-name:var(--font-andasia)] text-[2.15em] sm:text-[2.35em] leading-none align-baseline -translate-y-[0.12em] sm:-translate-y-[0.14em] mr-[0.16em] sm:mr-[0.2em]">
        {firstLetter}
      </span>
      {remainder}
    </>
  )
}

export function NameConnector({
  children,
  size = "md",
}: {
  children: ReactNode
  size?: keyof typeof connectorSizeClass
}) {
  return (
    <span
      className={`inline-block font-[family-name:var(--font-andasia)] leading-none align-baseline ${connectorSizeClass[size]}`}
    >
      {children}
    </span>
  )
}

export function CoupleNames({
  groomName,
  brideName,
  connector = "&",
  className = coupleNameTextClass,
}: {
  groomName: string
  brideName: string
  connector?: string
  className?: string
}) {
  return (
    <p className={`inline-flex flex-wrap items-baseline justify-center gap-y-1 px-2 sm:px-3 ${className}`}>
      <StyledName name={groomName} />
      <NameConnector>{connector}</NameConnector>
      <StyledName name={brideName} />
    </p>
  )
}
