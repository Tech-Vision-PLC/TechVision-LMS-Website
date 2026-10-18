'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const universities = [
  { name: 'Addis Ababa University', short: 'AAU' },
  { name: 'Addis Ababa Sci & Tech', short: 'AAASTU' },
  { name: 'Adama Sci & Tech', short: 'ASTU' },
  { name: 'Bahir Dar University', short: 'BDU' },
  { name: 'Haramaya University', short: 'Haramaya' },
  { name: 'Jimma University', short: 'Jimma' },
  { name: 'Hawassa University', short: 'Hawassa' },
  { name: 'University of Gondar', short: 'UoG' },
]

// Duplicate twice to create two equal halves for a perfect seamless 50% scroll loop
const marqueeItems = [...universities, ...universities, ...universities, ...universities]

export function TrustBar() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const y = useSpring(rawY, { stiffness: 50, damping: 18 })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#050B08] py-24"
    >
      {/* Background Texture & Glow */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,200,83,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,83,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,200,83,0.04),transparent)] pointer-events-none" />

      {/* Section Top Border Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <motion.div style={{ y }} className="relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 px-6 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-3 text-[#00C853] text-sm font-bold tracking-[0.2em] uppercase mb-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00C853]/50" />
            Trusted By Students From
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00C853]/50" />
          </div>
          <p className="text-[#9FB3A8] text-sm font-medium tracking-widest">
            ከተለያዩ ዩኒቨርሲቲዎች የመጡ ተማሪዎች
          </p>
        </motion.div>

        {/* ── Infinite Marquee Track ── */}
        <div className="relative w-full overflow-hidden">
          
          {/* Edge fade masks - Using exact background color to blend perfectly */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#050B08] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#050B08] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 md:gap-6 w-max px-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          >
            {marqueeItems.map((uni, i) => (
              <div
                key={`${uni.short}-${i}`}
                className="group flex-shrink-0 flex items-center gap-4 bg-[#0B1110] border border-white/[0.06] px-6 py-4 rounded-2xl hover:border-[#00C853]/40 hover:bg-[#0C1511] transition-all duration-300 cursor-default shadow-lg hover:shadow-[0_10px_30px_rgba(0,200,83,0.15)]"
              >
                {/* Icon Wrapper */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C853]/20 to-transparent border border-[#00C853]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={20} className="text-[#00C853]" />
                </div>
                
                {/* Text Layout */}
                <div className="flex flex-col pr-4">
                  <span className="text-white font-bold text-base leading-tight group-hover:text-[#00C853] transition-colors">
                    {uni.short}
                  </span>
                  <span className="text-[#8FA99A] text-xs font-medium mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {uni.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}