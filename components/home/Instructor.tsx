'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Award, Code2, Compass, MessageSquareCode, Users } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'Experienced Developers',
    desc: 'Learn from instructors with active industry experience building web applications.'
  },
  {
    icon: MessageSquareCode,
    title: 'Regular Code Reviews',
    desc: 'Get feedback on your projects to learn clean coding habits and best practices.'
  },
  {
    icon: Users,
    title: 'Personalized Support',
    desc: 'Interact with mentors during Q&A sessions and active Telegram chat groups.'
  },
  {
    icon: Compass,
    title: 'Career Preparation',
    desc: 'Receive guidance on preparing your CV, polishing your portfolio, and job applications.'
  }
]

export function Instructor() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const }
    }
  }

  return (
    <section ref={ref} className="bg-[#08110D] py-20 px-6 relative overflow-hidden section-bridge-top section-bridge-bottom">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C853]/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <motion.div style={{ y }} className="max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Sleek Graphic Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Ambient Background Glow for the Card */}
            <div className="absolute inset-0 bg-[#00C853]/10 rounded-[20px] blur-xl pointer-events-none" />
            
            {/* The Glassmorphic Visual Box */}
            <div className="relative bg-[#0C1812]/90 border border-white/[0.08] rounded-[20px] p-6 shadow-2xl z-10 flex flex-col justify-between aspect-[1.1/1] sm:aspect-[4/3] lg:aspect-[4/4.5] overflow-hidden">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
                    <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">Mentor Dashboard</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#B2FF59] bg-[#00C853]/10 px-2 py-0.5 rounded-full">
                    Active Support
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2">
                  Guidance that keeps you on track
                </h4>
                <p className="text-[#8FA99A] text-[12px] leading-relaxed">
                  Our mentors and instructors review your submissions weekly, answer questions on Telegram, and hold live review sessions so you never get stuck.
                </p>
              </div>

              {/* Response Stats Area */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#8FA99A]">
                  <span>Weekly Code Reviews</span>
                  <span className="text-[#00C853] font-bold">100% Completed</span>
                </div>
                <div className="mt-2 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-[#00C853] to-[#B2FF59]" />
                </div>
              </div>

              {/* Card Footer Detail */}
              <div className="mt-4 pt-3.5 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center text-[#00C853] shrink-0">
                  <Award size={14} />
                </div>
                <div className="text-[11px]">
                  <div className="text-white font-bold">Structured Learning</div>
                  <div className="text-[#8FA99A]/80">Designed to build real coding skills</div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Copy & Responsive Grid */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 text-[#00C853] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#00C853]/50" />
                Instructors & Mentors
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
                Learn from Active{' '}
                <span className="bg-gradient-to-r from-[#00C853] to-[#B2FF59] bg-clip-text text-transparent">
                  Software Developers
                </span>
              </h2>
              
              <p className="text-[#8FA99A] text-xs sm:text-sm leading-relaxed max-w-xl">
                We believe programming is best learned by working with experienced practitioners. Our instructors bring years of practical software development experience to help you bridge the gap between theory and code.
              </p>
            </motion.div>

            {/* Grid of features */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 gap-4"
            >
              {features.map((feat) => {
                const Icon = feat.icon
                return (
                  <motion.div
                    key={feat.title}
                    variants={cardVariants}
                    className="flex flex-col gap-1.5 bg-[#0E1713] border border-white/[0.04] rounded-xl p-4 hover:border-[#00C853]/20 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center text-[#00C853] shrink-0">
                        <Icon size={14} />
                      </div>
                      <h3 className="text-white text-xs font-bold">{feat.title}</h3>
                    </div>
                    <p className="text-[#8FA99A]/80 text-[11px] leading-relaxed pl-0.5">
                      {feat.desc}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
