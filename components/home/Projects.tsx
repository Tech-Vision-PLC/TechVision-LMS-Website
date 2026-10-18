'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Database, Zap, Layers, Sparkles, Terminal, Code2, Globe } from 'lucide-react'

const projectPillars = [
  {
    title: 'Full-Stack SaaS Applications',
    amharicTitle: 'ሙሉ-ስታክ ሶፍትዌር መተግበሪያዎች',
    description: 'Build enterprise-grade platforms featuring robust secure authentication, relational database architecture, real-time messaging pipelines, and fully integrated payment checkouts.',
    icon: Database,
    color: '#00C853',
    badge: 'Industry Standard',
    metrics: { count: '10+', focus: 'DB & Auth Logic' }
  },
  {
    title: 'Real-time & Interactive Systems',
    amharicTitle: 'የቀጥታና መስተጋብራዊ ሲስተሞች',
    description: 'Develop highly responsive applications utilizing WebSockets, state machine synchronization, interactive canvas elements, and smooth client-side visual animations.',
    icon: Zap,
    color: '#B2FF59',
    badge: 'High Performance',
    metrics: { count: '12+', focus: 'State & Speed' }
  },
  {
    title: 'API-Driven Digital Platforms',
    amharicTitle: 'በኤፒአይ የሚመሩ መድረኮች',
    description: 'Construct fast content-heavy systems using advanced caching policies, server-side pre-rendering, headless CMS APIs, and distributed asset delivery systems.',
    icon: Layers,
    color: '#00A844',
    badge: 'Scalability Focus',
    metrics: { count: '8+', focus: 'Edge Delivery' }
  }
]

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), { stiffness: 60, damping: 20 })

  return (
    <section
      ref={ref}
      className="bg-[#0f1713] py-20 px-6 relative overflow-hidden section-bridge-top section-bridge-bottom"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#00d38d]/[0.02] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-[#28543c]/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <motion.div style={{ y }} className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[#00d38d] text-sm font-bold tracking-[0.2em] uppercase mb-4">
            <span className="w-8 h-px bg-[#35443b]" />
            Portfolio Strategy
            <span className="w-8 h-px bg-[#35443b]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#f2f7f4] leading-tight">
            Build Projects That{' '}
            <span className="relative inline-block">
              <span className="text-[#00d38d]">
                Get You Hired
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#00d38d]/60" />
            </span>
          </h2>

          <p className="text-[#b5c1ba] mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We don&apos;t limit you to cookie-cutter tutorial clones. You will master standard patterns to design, engineer, and deploy complete architectures that stand out to recruiters.
          </p>
        </motion.div>

        {/* Dynamic Pillar Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {projectPillars.map((pillar, i) => {
            const Icon = pillar.icon

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col justify-between bg-[#17211c] border border-[#35443b] rounded-[24px] p-6 hover:border-[#00d38d]/40 hover:bg-[#1d2922] transition-all duration-500 hover:shadow-[0_20px_50px_#080d0a] overflow-visible"
              >
                {/* Glow bleed on hover */}
                <div className="absolute inset-0 rounded-[24px] bg-[#00d38d]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Badge & Metric */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="px-2.5 py-1 bg-[#1d2922] border border-[#35443b] text-[#b5c1ba] text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {pillar.badge}
                    </span>

                    <span className="text-[10px] font-bold text-[#00d38d] bg-[#28543c]/40 px-2 py-0.5 rounded-full">
                      {pillar.metrics.focus}
                    </span>
                  </div>

                  {/* Header Title */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="p-2.5 rounded-xl bg-[#1d2922] border border-[#35443b] group-hover:border-[#00d38d]/40 transition-colors shrink-0">
                      <Icon size={20} className="text-[#00d38d]" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#f2f7f4] group-hover:text-[#00d38d] transition-colors">
                        {pillar.title}
                      </h3>

                      <p className="text-[11px] text-[#8f9c95] font-semibold mt-0.5">
                        {pillar.amharicTitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#b5c1ba] text-xs leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div>
                  {/* Tech badging */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Next.js', 'PostgreSQL', 'Prisma', 'Stripe', 'Supabase'].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-[#1d2922] text-[#8f9c95] border border-[#35443b] rounded text-[9px] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer Stats Link/Action style */}
                  <div className="pt-4 border-t border-[#35443b] flex items-center justify-between text-[11px] font-bold text-[#8f9c95] group-hover:text-[#f2f7f4] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <Terminal size={12} className="text-[#00d38d]" />
                      Dynamic Curriculum
                    </span>

                    <span className="text-[#00d38d] group-hover:translate-x-1 transition-transform duration-300">
                      Explore Projects &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Global Showcase Callout Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 bg-[#17211c] border border-[#35443b] rounded-[24px] p-6 text-center max-w-3xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#0f1713] bg-[#1d2922] flex items-center justify-center text-xs">
                <Code2 size={12} className="text-[#00d38d]" />
              </div>

              <div className="w-8 h-8 rounded-full border-2 border-[#0f1713] bg-[#1d2922] flex items-center justify-center text-xs">
                <Globe size={12} className="text-[#8be3ad]" />
              </div>

              <div className="w-8 h-8 rounded-full border-2 border-[#0f1713] bg-[#1d2922] flex items-center justify-center text-xs">
                <Sparkles size={12} className="text-[#00d38d]" />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#b5c1ba] font-medium">
              Want to see actual student-built apps live?{' '}
              <span className="text-[#f2f7f4] font-bold">
                Batch 20 demos are live now.
              </span>
            </p>

            <a
              href="https://learn.techvision.edu.et"
              className="text-xs font-black bg-[#28543c]/40 hover:bg-[#28543c]/60 border border-[#00d38d]/30 text-[#8be3ad] px-4 py-2 rounded-xl transition-all duration-300"
            >
              Browse Student Gallery
            </a>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}