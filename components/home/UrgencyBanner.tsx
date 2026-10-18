'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export function UrgencyBanner() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="bg-[#050B08] py-12 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          {/* Intense animated glow behind the banner */}
          <div className="absolute inset-0 bg-[#00C853] opacity-20 blur-2xl rounded-3xl group-hover:opacity-30 transition-opacity duration-500 animate-pulse" />
          
          <div className="relative bg-gradient-to-r from-[#0C1812] via-[#0E2018] to-[#0C1812] border border-[#00C853]/40 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,200,83,0.15)] overflow-hidden">
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite] -skew-x-12 pointer-events-none" />

            <div className="flex items-center gap-5 z-10">
              <div className="w-12 h-12 rounded-full bg-[#00C853]/20 flex items-center justify-center flex-shrink-0 relative">
                <div className="absolute inset-0 rounded-full border-2 border-[#00C853]/50 animate-[spin_4s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
                <AlertCircle size={24} className="text-[#00C853]" />
              </div>
              <div>
                <h3 className="text-white font-black text-xl md:text-2xl mb-1 tracking-tight">
                  Strictly <span className="text-[#00C853]">20 Students</span> Per Batch
                </h3>
                <p className="text-[#8FA99A] text-sm md:text-base font-medium">
                  We cap enrollment to ensure 1-on-1 mentorship. Seats fill up fast.
                </p>
              </div>
            </div>

            <div className="z-10 flex-shrink-0 w-full sm:w-auto">
              <div className="inline-flex flex-col items-center justify-center bg-[#050B08]/50 border border-white/10 rounded-xl px-6 py-3 min-w-[140px]">
                <span className="text-[#B2FF59] font-black text-2xl tabular-nums drop-shadow-[0_0_10px_rgba(178,255,89,0.5)] animate-pulse">
                  5
                </span>
                <span className="text-[#8FA99A] text-[10px] font-bold uppercase tracking-widest mt-0.5">
                  Seats Left
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
