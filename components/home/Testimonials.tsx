'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Star, MessageSquareCode, Users2, ArrowUpRight } from 'lucide-react'

const stats = [
  { value: '350+', label: 'Successful Graduates' },
  { value: '90%', label: 'Placement Rate' },
  { value: '2.5x', label: 'Average Salary Bump' }
]

const testimonials = [
  {
    name: 'Naol Bekele',
    role: 'Frontend Dev @ Fintech Startup',
    transition: 'ASTU Graduate',
    tag: 'Self-taught to Employed',
    img: '/ethiopian_student1.png',
    content: "Before TechVision I was watching YouTube tutorials for a year and building nothing. The 12-week bootcamp forced me to build real things, get real feedback, and land a real job.",
    stars: 5,
  },
  {
    name: 'Hiwot Tesfaye',
    role: 'Junior React Developer',
    transition: 'AAU Student',
    tag: 'Academic to Developer',
    img: '/ethiopian_student2.png',
    content: "The small cohort size makes the difference. My mentor knew my code, my weak points, and pushed me exactly where I needed it. I went from zero to building a full Next.js app.",
    stars: 5,
  },
  {
    name: 'Samuel Girma',
    role: 'Freelance Developer',
    transition: 'Bahir Dar University',
    tag: 'Doubled Freelance Income',
    img: '/ethiopian_student3.png',
    content: "I doubled my freelance income after completing TechVision. The portfolio projects got me clients immediately. Best investment I made as a developer in Ethiopia.",
    stars: 5,
  },
  {
    name: 'Betelhem Alemu',
    role: 'UI/UX & Frontend Engineer',
    transition: 'Jimma University',
    tag: 'Designer to Developer',
    img: '/ethiopian_student4.png',
    content: "The curriculum bridges the gap between design and development perfectly. I learned how to build what I design, using React and Tailwind. The live mentorship was invaluable.",
    stars: 5,
  }
]

export function Testimonials() {
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
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  }

  return (
    <section id="testimonials" ref={ref} className="bg-[#050B08] py-20 px-6 relative overflow-hidden section-bridge-top">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,200,83,0.02)_0%,transparent_70%)] pointer-events-none" />

      <motion.div style={{ y }} className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[#00C853] text-sm font-bold tracking-[0.2em] uppercase mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#00C853]/50" />
            Student Success
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#00C853]/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Real Stories, Real{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00C853] to-[#B2FF59] bg-clip-text text-transparent">
                Outcomes
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C853]/60 to-transparent" />
            </span>
          </h2>
        </motion.div>

        {/* Dynamic metrics layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 border-b border-white/[0.06] pb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-[#00C853] to-[#B2FF59] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-[#8FA99A] text-xs sm:text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Grid of Success Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {testimonials.map((test) => (
            <motion.div
              key={test.name}
              variants={cardVariants}
              className="group relative flex flex-col justify-between bg-[#0C1812]/80 border border-white/[0.08] hover:border-[#00C853]/30 rounded-[24px] p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Card top section */}
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="px-2.5 py-0.5 bg-[#00C853]/10 border border-[#00C853]/20 text-[#B2FF59] text-[10px] font-bold uppercase tracking-wider rounded">
                    {test.tag}
                  </span>
                  
                  {/* Star Rating */}
                  <div className="flex gap-0.5 shrink-0">
                    {Array.from({ length: test.stars }).map((_, s) => (
                      <Star key={s} size={12} className="fill-[#00C853] text-[#00C853]" />
                    ))}
                  </div>
                </div>

                <p className="text-[#DDE7E1] text-[13px] sm:text-[14px] leading-relaxed mb-6 font-medium italic">
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              {/* Card author info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/[0.04] mt-auto">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-[#00C853]/40">
                  <img src={test.img} alt={test.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-white font-bold text-xs sm:text-sm">{test.name}</div>
                  <div className="text-[#8FA99A]/80 text-[11px] font-medium">{test.role}</div>
                  <div className="text-[#00C853] text-[9px] font-bold uppercase tracking-wider mt-0.5">{test.transition}</div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Community Telegram Action Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 bg-gradient-to-br from-[#0E2018]/90 to-[#0C1812]/80 border border-[#00C853]/20 rounded-[24px] p-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,200,83,0.05)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center shrink-0">
              <Users2 size={20} className="text-[#00C853]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Join Our Developer Community</h4>
              <p className="text-[#8FA99A] text-[11px] leading-relaxed">
                Connect with active students, alumni, and tech mentors.
              </p>
            </div>
          </div>
          <a
            href="https://t.me/techvision_lms"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#00C853] to-[#00A844] text-black font-black text-xs px-5 py-2.5 rounded-xl hover:scale-[1.03] transition-transform duration-300 shrink-0"
          >
            Join Telegram <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </motion.div>
    </section>
  )
}
