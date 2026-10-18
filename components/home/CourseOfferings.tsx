'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { GraduationCap, Monitor, Calendar, Clock, CreditCard, Tag, ArrowRight, MapPin, Wifi, Zap } from 'lucide-react'

const offerings = [
  {
    id: 'in-person',
    mode: 'In-Person',
    modeLabel: 'In-Person | በአካል',
    icon: GraduationCap,
    locationIcon: MapPin,
    title: 'Intensive Training',
    subtitle: 'Hands-on learning in a focused classroom environment',
    accent: '#00C853',
    accentSoft: 'rgba(0,200,83,0.12)',
    accentBorder: 'rgba(0,200,83,0.25)',
    badge: 'Most Popular',
    badgeBg: 'from-[#00C853] to-[#00A844]',
    featured: true,
    details: [
      { icon: Calendar, label: 'Duration', value: '45 Days  (July 12 – Sept 5)' },
      { icon: Clock,    label: 'Schedule', value: 'Mon, Wed, Fri · Morning 3:00–5:00' },
      { icon: MapPin,   label: 'Location', value: 'TechVision Campus, Addis Ababa' },
      { icon: CreditCard, label: 'Tuition', value: '4,000 ETB · One-time payment' },
    ],
    cta: 'Enroll in In-Person Class',
    href: 'https://learn.techvision.edu.et/batch-application/new',
  },
  {
    id: 'online',
    mode: 'Online',
    modeLabel: 'Online | በኦንላይን',
    icon: Monitor,
    locationIcon: Wifi,
    title: 'Flexible Learning',
    subtitle: 'Live instructor-led sessions you can join from anywhere',
    accent: '#B2FF59',
    accentSoft: 'rgba(178,255,89,0.08)',
    accentBorder: 'rgba(178,255,89,0.2)',
    badge: '20% Off Upfront',
    badgeBg: 'from-[#B2FF59] to-[#69FF99]',
    featured: false,
    details: [
      { icon: Calendar, label: 'Duration', value: '4 Months  (Starts July 12)' },
      { icon: Clock,    label: 'Schedule', value: 'Tue, Thu, Sat · Evening 9:00–11:00' },
      { icon: Wifi,     label: 'Format',   value: 'Live via Zoom + recorded replays' },
      { icon: Tag,      label: 'Tuition',  value: '3,000 ETB/mo  (20% off upfront)' },
    ],
    cta: 'Claim 20% Discount & Enroll',
    href: 'https://learn.techvision.edu.et/batch-application/new',
  },
]

export function CourseOfferings() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

  return (
    <section
      id="course-offerings"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050B08] py-20 px-6"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(0,200,83,0.06)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[600px] bg-[radial-gradient(circle_at_bottom_right,rgba(178,255,89,0.04)_0%,transparent_60%)]" />
      </div>

      <motion.div style={{ y }} className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#00C853]">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00C853]/50" />
            Course Offerings
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#00C853]/50" />
          </div>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Choose Your{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00C853] to-[#B2FF59] bg-clip-text text-transparent">
                Learning Path
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C853]/60 to-transparent" />
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#9FB3A8]">
            Two formats, one goal — launching your frontend development career. Pick the pace that fits your life.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {offerings.map((offer, i) => {
            const Icon = offer.icon

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: i === 0 ? -40 : 40, scale: 0.96 }}
                animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex flex-col rounded-[24px] border p-5 pt-8 backdrop-blur-xl transition-all duration-500 sm:p-6 sm:pt-9 ${
                  offer.featured
                    ? 'border-[#00C853]/30 bg-[#0E2018]/90 shadow-[0_16px_60px_rgba(0,200,83,0.12)] md:scale-[1.02] z-10'
                    : 'border-white/[0.08] bg-[#0C1812]/80 hover:border-[#B2FF59]/20'
                }`}
              >
                {/* Glow bleed */}
                <div
                  className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: offer.accentSoft, opacity: offer.featured ? 1 : 0.5 }}
                />

                {/* Badge */}
                <div className="absolute -top-4 right-8">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-3 py-1 text-[10px] font-black text-black shadow-lg ${offer.badgeBg}`}
                  >
                    <Zap size={11} fill="currentColor" />
                    {offer.badge}
                  </span>
                </div>

                {/* Header */}
                <div className="mb-5">
                  <div
                    className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest"
                    style={{
                      border: `1px solid ${offer.accentBorder}`,
                      background: offer.accentSoft,
                      color: offer.accent,
                    }}
                  >
                    <Icon size={11} />
                    {offer.modeLabel}
                  </div>

                  <h3 className="mb-0.5 text-xl font-black text-white">{offer.title}</h3>
                  <p className="text-sm leading-relaxed text-[#8FA99A]">{offer.subtitle}</p>
                </div>

                {/* Detail rows */}
                <ul className="mb-5 flex flex-1 flex-col gap-2">
                  {offer.details.map((detail) => {
                    const DetailIcon = detail.icon
                    return (
                      <li
                        key={detail.label}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] px-3.5 py-2.5"
                      >
                        <div
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: offer.accentSoft }}
                        >
                          <DetailIcon size={12} style={{ color: offer.accent }} />
                        </div>
                        <div>
                          <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-white/30">
                            {detail.label}:
                          </span>
                          <span className="text-xs font-semibold text-[#DDE7E1]">{detail.value}</span>
                        </div>
                      </li>
                    )
                  })}
                </ul>

                {/* CTA */}
                <Link
                  href={offer.href}
                  className={`group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3 text-sm font-bold transition-all duration-300 ${
                    offer.featured
                      ? 'bg-gradient-to-r from-[#00C853] to-[#00A844] text-black shadow-[0_0_24px_rgba(0,200,83,0.3)] hover:shadow-[0_0_40px_rgba(0,200,83,0.5)] hover:scale-[1.02]'
                      : 'border border-white/10 bg-white/[0.04] text-white hover:border-[#B2FF59]/40 hover:bg-white/[0.08] hover:text-[#B2FF59]'
                  }`}
                >
                  <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                  <span className="relative">{offer.cta}</span>
                  <ArrowRight
                    size={14}
                    className="relative transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-center"
        >
          <Link
            href="https://learn.techvision.edu.et/batch-application/new"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#00C853]/30 hover:bg-white/[0.08]"
          >
            Apply Now to All Batches — አሁኑኑ ይመዝገቡ
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}