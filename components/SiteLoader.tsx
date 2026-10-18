'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function SiteLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
    const timer = window.setTimeout(() => setVisible(false), 420)
    return () => window.clearTimeout(timer)
  }, [pathname])

  if (!visible) return null

  return (
    <div className="tv-loading-screen tv-route-loader" role="status" aria-live="polite" aria-label="Loading TechVision">
      <div className="tv-loading-card">
        <div className="tv-loading-mark" aria-hidden="true"><img src="/brand/techvision-mark.svg" alt="" /></div>
        <div className="tv-loading-brand">Tech Vision</div>
        <p className="tv-loading-copy">Preparing your experience</p>
        <div className="tv-loading-track" aria-hidden="true"><span className="tv-loading-progress" /></div>
      </div>
    </div>
  )
}
