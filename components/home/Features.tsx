'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Layers, Video, Users, Briefcase, MessageSquare, BadgeCheck } from 'lucide-react'

const features = [
  {
    icon: Layers,
    title: 'Real Projects',
    amharic: 'እውነተኛ ፕሮጀክቶች',
    description: 'Build production-grade apps like Netflix clones, e-commerce stores, and task managers you can show employers.',
    gradient: 'from-[#00C853] to-[#00A844]',
    glow: 'rgba(0,200,83,0.3)',
  },
  {
    icon: Video,
    title: 'Live Mentorship',
    amharic: 'ቀጥታ ስልጠና',
    description: 'Four live instructor-led sessions every week. Ask questions, get code reviews, and learn in real time.',
    gradient: 'from-[#B2FF59] to-[#00C853]',
    glow: 'rgba(178,255,89,0.25)',
  },
  {
    icon: Users,
    title: 'Small Cohorts',
    amharic: 'አነስተኛ ክፍሎች',
    description: 'Maximum 20 students per batch so every student gets individual attention and personalized feedback.',
    gradient: 'from-[#00C853] to-[#B2FF59]',
    glow: 'rgba(0,200,83,0.25)',
  },
  {
    icon: Briefcase,
    title: 'Career Focused',
    amharic: 'ለስራ ዝግጁ',
    description: 'Portfolio building, interview prep, GitHub optimization, and job-search guidance built into the curriculum.',
    gradient: 'from-[#00A844] to-[#00C853]',
    glow: 'rgba(0,168,68,0.3)',
  },
  {
    icon: MessageSquare,
    title: 'Community',
    amharic: 'የማህበረሰብ ድጋፍ',
    description: 'Join an active Telegram community of 350+ alumni and current students. Get help any time, day or night.',
    gradient: 'from-[#B2FF59] to-[#00A844]',
    glow: 'rgba(178,255,89,0.25)',
  },
  {
    icon: BadgeCheck,
    title: 'Certification',
    amharic: 'የምስክር ወረቀት',
    description: 'Earn a recognised TechVision completion certificate to validate your skills to employers and clients.',
    gradient: 'from-[#00C853] to-[#B2FF59]',
    glow: 'rgba(0,200,83,0.3)',
  },
]

export function Features() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 })

  return (
    <section ref={ref} className="bg-[#050B08] py-24 px-6 relative overflow-hidden section-bridge-top section-bridge-bottom">
      
      {/* Background Texture (Matches Hero) */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,200,83,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,83,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Top glowing line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-px bg-gradient-to-r from-transparent via-[#00C853]/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[3px] bg-[#00C853]/30 blur-[4px]" />

      <motion.div style={{ y }} className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-[#00C853] text-xs font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full border border-[#00C853]/20 bg-[#00C853]/5">
            Why TechVision
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Built for Your{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00C853] to-[#B2FF59] bg-clip-text text-transparent">
                Success
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full bg-gradient-to-r from-[#00C853]/60 to-transparent blur-[2px]" />
            </span>
          </h2>
          <p className="text-[#9FB3A8] mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Every feature is designed to get you hired, not just trained. <br className="hidden sm:block" />
            የምንሰጠው ስልጠና ለስራ ገበያ ብቁ እንዲያደርጎት ታስቦ የተዘጋጀ ነው።
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative bg-[#0B1110] border border-white/[0.06] rounded-[32px] p-8 lg:p-10 cursor-default transition-all duration-500 hover:border-[#00C853]/40 hover:bg-[#0C1511] shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* Background ambient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 80% 0%, ${f.glow} 0%, transparent 70%)` }}
              />

              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,200,83,0.2)] group-hover:shadow-[0_0_30px_rgba(0,200,83,0.5)] transition-all duration-500 group-hover:scale-110 relative z-10`}>
                <f.icon size={28} className="text-[#050B08]" strokeWidth={2.5} />
              </div>
              
              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-white font-black text-2xl mb-1">{f.title}</h3>
                <span className="block text-[#00C853] text-sm font-bold tracking-wider mb-4 opacity-90">{f.amharic}</span>
                <p className="text-[#8FA99A] text-base leading-relaxed group-hover:text-[#A9C3B4] transition-colors">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}