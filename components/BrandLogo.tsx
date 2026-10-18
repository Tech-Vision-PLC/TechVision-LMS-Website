import Link from 'next/link'

type BrandLogoProps = {
  href?: string
  className?: string
  priority?: boolean
}

export function BrandLogo({ href = '/', className = '' }: BrandLogoProps) {
  return (
    <Link href={href} className={`tv-brand-logo inline-flex items-center ${className}`} aria-label="Tech Vision home">
      <img className="tv-logo-light block h-full w-auto" src="/brand/techvision-logo-fullcolor.svg" alt="Tech Vision" />
      <img className="tv-logo-dark hidden h-full w-auto" src="/brand/techvision-logo-green.svg" alt="Tech Vision" />
    </Link>
  )
}
