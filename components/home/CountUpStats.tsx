'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { target: 350, suffix: '+', label: 'GRADUATES' },
  { target: 50, suffix: '+', label: 'HIRING PARTNERS' },
  { target: 20, suffix: '+', label: 'MENTORS' },
  { target: 90, suffix: '%', label: 'PLACEMENT RATE' },
]

export function CountUpStats() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [values, setValues] = useState(stats.map(() => 0))

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    const duration = 1400
    const start = performance.now()
    let frame = 0

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setValues(stats.map(stat => Math.round(stat.target * eased)))

      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [started])

  return (
    <div ref={ref} className="mt-24 grid grid-cols-2 border-t border-[#edf1ee] pt-10 md:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={stat.label} className="py-6">
          <div className="text-4xl font-black sm:text-5xl">
            {values[index]}{stat.suffix}
          </div>
          <div className="tv-mono mt-2 text-[10px] font-bold">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
