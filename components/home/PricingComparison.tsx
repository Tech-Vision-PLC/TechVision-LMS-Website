'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Check, X, Zap, Monitor, GraduationCap, Laptop } from 'lucide-react'

const plans = [
  {
    name: 'Free Learning',
    price: '0',
    currency: 'ETB',
    period: 'Forever',
    description: 'Perfect for exploring and building foundations at your own pace.',
    cta: 'Start Free Learning',
    href: 'https://learn.techvision.edu.et/login?redirect-to=/lms/courses/#login',
    featured: false,
    badge: null,
    icon: Laptop,
    accent: '#8FA99A',
    features: [
      'HTML & CSS full course',
      'JavaScript fundamentals',
      'Practice exercises & quizzes',
      'Community Telegram access',
      'Self-paced learning path',
    ],
    missing: [
      'Live instructor-led sessions',
      'Real-world capstone projects',
      'Personalized code reviews',
      'Recognised graduation certificate',
      'Career preparation & placement help',
    ],
  },
  {
    name: 'Online Class',
    price: '3,000',
    currency: 'ETB',
    period: 'Per Month',
    description: 'Live instructor-led online training — learn from anywhere.',
    cta: 'Enroll in Online Batch',
    href: 'https://learn.techvision.edu.et/batch-application/new',
    featured: false,
    badge: '20% Off Upfront Option',
    icon: Monitor,
    accent: '#B2FF59',
    features: [
      'Everything in Free Learning',
      '4 Live Zoom sessions / week (2 hrs each)',
      'Tue, Thu, Sat · Evening 9:00–11:00',
      'Real-world capstone projects',
      'Personalized code reviews & support',
      'Recognised graduation certificate',
      'Max 20 students per batch',
      'Career prep & portfolio help',
    ],
    missing: [
      'In-person campus facility access',
    ],
  },
  {
    name: 'In-Person Class',
    price: '4,000',
    currency: 'ETB',
    period: 'One-time Payment',
    description: 'Intensive on-campus training with physical guidance and support.',
    cta: 'Enroll in In-Person Class',
    href: 'https://learn.techvision.edu.et/batch-application/new',
    featured: true,
    badge: 'Limited Seats Available',
    icon: GraduationCap,
    accent: '#00C853',
    features: [
      'Everything in Free Learning',
      'Physical classroom guidance & support',
      'Mon, Wed, Fri · Morning 3:00–5:00',
      'Real-world capstone projects',
      'On-campus mentor coding reviews',
      'Recognised graduation certificate',
      'Max 20 students per batch',
      '10+ premium portfolio projects',
      'Full career prep & placement help',
    ],
    missing: [],
  },
]

export function PricingComparison() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), { stiffness: 60, damping: 20 })

  return (
    <section id="pricing" ref={ref} className="bg-[#050B08] py-20 px-6 relative overflow-hidden section-bridge-top">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_top_right,rgba(0,200,83,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_bottom_left,rgba(178,255,89,0.03)_0%,transparent_60%)] pointer-events-none" />

      <motion.div style={{ y }} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[#00C853] text-sm font-bold tracking-[0.2em] uppercase mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#00C853]/50" />
            Pricing Plans
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#00C853]/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Invest in Your{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00C853] to-[#B2FF59] bg-clip-text text-transparent">
                Future
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C853]/60 to-transparent" />
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-[24px] p-6 flex flex-col transition-all duration-500 overflow-visible ${
                  plan.featured
                    ? 'bg-[#0E2018]/90 backdrop-blur-xl border border-[#00C853]/40 shadow-[0_20px_80px_rgba(0,200,83,0.2)] md:scale-[1.02] z-10'
                    : 'bg-[#0C1812]/80 backdrop-blur-sm border border-white/[0.08] hover:border-[#00C853]/20'
                }`}
              >
                {/* Glow/Border Effect */}
                {plan.featured && (
                  <>
                    <div className="absolute inset-0 rounded-[24px] p-[1px] bg-gradient-to-br from-[#00C853] to-transparent pointer-events-none [mask-image:linear-gradient(#fff_0_0)] [mask-composite:exclude] -z-10" />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <span className="flex items-center gap-1 bg-gradient-to-r from-[#00C853] to-[#B2FF59] text-black text-[11px] font-black px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,200,83,0.4)] whitespace-nowrap">
                        <Zap size={11} fill="currentColor" />
                        {plan.badge}
                      </span>
                    </div>
                  </>
                )}
                {!plan.featured && plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="flex items-center gap-1 bg-white/10 border border-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-5 mt-2 flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-black text-xl mb-1 ${plan.featured ? 'text-[#00C853]' : 'text-white'}`}>
                      {plan.name}
                    </h3>
                    <p className="text-[#8FA99A] text-[13px] leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white shrink-0">
                    <Icon size={20} style={{ color: plan.accent }} />
                  </div>
                </div>

                <div className="mb-6 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-black tabular-nums tracking-tighter text-white">
                      {plan.price}
                    </span>
                    <span className="text-[#8FA99A] font-bold text-sm mb-1">{plan.currency}</span>
                  </div>
                  <span className="text-[#8FA99A] text-[10px] font-semibold uppercase tracking-wider">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-[13px] font-medium">
                      <div className={`mt-0.5 rounded-full p-0.5 flex-shrink-0 ${plan.featured ? 'bg-[#00C853]/20 text-[#00C853]' : 'bg-white/10 text-white'}`}>
                        <Check size={12} />
                      </div>
                      <span className="text-[#DDE7E1]">{feat}</span>
                    </li>
                  ))}
                  {plan.missing.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-[13px] font-medium opacity-40">
                      <div className="mt-0.5 rounded-full p-0.5 flex-shrink-0 bg-transparent text-[#8FA99A]">
                        <X size={12} />
                      </div>
                      <span className="text-[#8FA99A]">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full text-center text-sm font-black py-3 rounded-xl transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-[#00C853] to-[#00A844] text-black shadow-[0_0_24px_rgba(0,200,83,0.2)] hover:shadow-[0_0_40px_rgba(0,200,83,0.4)] hover:scale-[1.02]'
                      : 'bg-white/[0.04] border border-white/[0.1] text-white hover:bg-white/[0.08] hover:border-[#00C853]/40 hover:text-[#00C853]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
