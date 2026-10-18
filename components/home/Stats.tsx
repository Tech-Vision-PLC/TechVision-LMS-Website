'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'

const stats = [
  { end: 350, suffix: '+', label: 'Students', color: '#00C853' },
  { end: 50, suffix: '+', label: 'Projects', color: '#B2FF59' },
  { end: 20, suffix: '+', label: 'Batches', color: '#00C853' },
  { end: 90, suffix: '%', label: 'Satisfaction', color: '#B2FF59' },
]

function Counter({ end, suffix, color }: { end: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = Math.max(1, Math.ceil(end / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span ref={ref} style={{ color }} className="text-5xl sm:text-6xl md:text-7xl font-black tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(currentColor,0.5)]">
      {count}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 })

  return (
    <section ref={ref} className="bg-[#050B08] py-28 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00C853]/[0.04] blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div style={{ y }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative group flex flex-col items-center justify-center text-center bg-[#0C1812]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 hover:border-[#00C853]/40 hover:bg-[#0C1812] transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)` }}
                />
                
                <Counter end={stat.end} suffix={stat.suffix} color={stat.color} />
                
                <p className="text-[#8FA99A] text-sm sm:text-base mt-3 font-semibold uppercase tracking-widest relative z-10 group-hover:text-white transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

