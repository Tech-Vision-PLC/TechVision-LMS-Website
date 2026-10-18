'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export function Cta() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), { stiffness: 60, damping: 20 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  }

  return (
    <section ref={ref} className="bg-[#050B08] py-20 px-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.03)_0%,transparent_70%)] pointer-events-none" />

      <motion.div style={{ y }} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0C1812] via-[#0E2018] to-[#0C1812]/90 border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        >
          {/* Decorative background visual orbs */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_top_right,rgba(0,200,83,0.15)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,rgba(178,255,89,0.1)_0%,transparent_60%)] pointer-events-none" />

          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ 
              backgroundImage: 'linear-gradient(rgba(0,200,83,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,83,1) 1px, transparent 1px)', 
              backgroundSize: '48px 48px' 
            }}
          />

          {/* Inner container */}
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 md:p-16 lg:p-20">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Copy & Actions */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="lg:col-span-7 flex flex-col items-start text-left"
              >
                {/* Accent Tag */}
                <motion.div 
                  variants={childVariants}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00C853]/10 border border-[#00C853]/25 text-[#B2FF59] text-[11px] font-bold uppercase tracking-wider mb-6"
                >
                  <Sparkles size={12} className="text-[#00C853]" />
                  Join the next batch
                </motion.div>

                {/* Main Headline */}
                <motion.h2 
                  variants={childVariants}
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-5"
                >
                  Your Future Tech Career{' '}
                  <span className="bg-gradient-to-r from-[#00C853] via-[#69FF99] to-[#B2FF59] bg-clip-text text-transparent">
                    Starts Today
                  </span>
                </motion.h2>
                
                {/* Subtitle */}
                <motion.p 
                  variants={childVariants}
                  className="text-[#9FB3A8] text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
                >
                  Join 350+ successful graduates who transitioned into tech careers. Don&apos;t wait for the right opportunity—build it with direct guidance and project-based experience.
                </motion.p>
                
                {/* CTA Action Buttons */}
                <motion.div 
                  variants={childVariants}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  <Link
                    href="https://learn.techvision.edu.et/login?redirect-to=/lms/courses/#login"
                    className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#00C853] to-[#00A844] text-black font-black text-sm px-8 py-4 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,200,83,0.25)] hover:shadow-[0_0_50px_rgba(0,200,83,0.45)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                    <span>Start Free Learning</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <Link
                    href="https://learn.techvision.edu.et/batch-application/new"
                    className="group flex items-center justify-center gap-2.5 bg-white/[0.04] border border-white/[0.12] hover:border-[#00C853]/40 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-white/[0.08] backdrop-blur-md transition-all duration-300"
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#00C853]/10 border border-[#00C853]/20 group-hover:bg-[#00C853]/20 transition-colors">
                      <Play size={10} className="text-[#00C853] ml-0.5" fill="currentColor" />
                    </span>
                    <span>Apply For Next Batch</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Column: Sleek Marketing Image */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5 relative w-full hidden sm:block"
              >
                {/* Glow ring around the image container */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00C853]/20 to-transparent rounded-[24px] blur-lg pointer-events-none" />
                <div className="absolute -inset-[1px] bg-gradient-to-br from-white/[0.08] to-transparent rounded-[24px] pointer-events-none -z-10" />

                {/* Sleek Visual Frame */}
                <div className="relative rounded-[24px] overflow-hidden border border-white/[0.1] shadow-2xl aspect-[4/3] lg:aspect-square bg-[#08110D]">
                  <img 
                    src="/cta_workspace.png" 
                    alt="Sleek coding workspace setup" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1812] via-transparent to-transparent opacity-60" />
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
