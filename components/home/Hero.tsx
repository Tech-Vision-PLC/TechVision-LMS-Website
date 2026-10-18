'use client'

import { useRef } from 'react'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

const stats = [
  { value: '350+', label: 'Students (ተማሪዎች)' },
  { value: '50+', label: 'Projects (ፕሮጀክቶች)' },
  { value: '20+', label: 'Batches (ዙሮች)' },
  { value: '90%', label: 'Satisfaction (እርካታ)' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-32 pb-24 xl:pt-40 flex items-center justify-center"
    >
      {/* NEXT.JS OPTIMIZED BACKGROUND IMAGE */}
      <Image
        src="/hero.png"
        alt="TechVision Bootcamp Class"
        fill
        priority
        className="object-cover object-center z-0"
        quality={100}
      />

      {/* DARK OVERLAY FOR TEXT READABILITY (Reduced blur and opacity) */}
      <div className="absolute inset-0 z-0 bg-[#050B08]/75 backdrop-blur-[1px]" />

      {/* GRID */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,200,83,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,83,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* GLOW */}
      <motion.div
        className="absolute left-1/2 top-40 z-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,200,83,0.18) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* SECONDARY GLOW */}
      <motion.div
        className="absolute bottom-0 right-0 z-0 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(178,255,89,0.08) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center"
      >
        {/* BADGE */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00C853]/30 bg-[#00C853]/10 px-4 py-2 text-sm font-semibold text-[#00C853] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C853] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00C853]" />
            </span>
            Now Enrolling | አሁን በመመዝገብ ላይ — Batch 21
          </span>
        </motion.div>

        {/* HEADLINE */}
        <motion.h1
          variants={itemVariants}
          className="mt-8 max-w-6xl text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Launch Your{' '}
          <span className="bg-gradient-to-r from-[#00C853] via-[#69FF99] to-[#B2FF59] bg-clip-text text-transparent">
            Tech Career
          </span>
          <br />
          <span className="text-4xl sm:text-5xl lg:text-6xl">የቴክኖሎጂ ሙያዎን ዛሬውኑ ይጀምሩ</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          variants={itemVariants}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[#9FB3A8] md:text-xl"
        >
          Build real projects and learn from mentors. በተግባር የተደገፉ ፕሮጀክቶችን በመስራት የቴክኖሎጂ ሙያዎን በ 12 ሳምንታት ውስጥ ይጀምሩ።
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="https://learn.techvision.edu.et/login?redirect-to=/lms/courses/#login"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#00C853] to-[#00A844] px-8 py-4 font-bold text-black shadow-[0_0_32px_rgba(0,200,83,0.35)] transition-all duration-300 hover:scale-[1.03]"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Start Learning Free | በነፃ ይጀምሩ</span>
            <ArrowRight size={18} className="relative transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="https://learn.techvision.edu.et/batch-application/new"
            className="group flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-[#00C853]/40 hover:bg-white/[0.08]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#00C853]/30 bg-[#00C853]/20">
              <Play size={12} fill="currentColor" className="ml-0.5 text-[#00C853]" />
            </span>
            Apply For Next Batch | ለቀጣዩ ዙር ይመዝገቡ
          </Link>
        </motion.div>

        {/* STATS */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-10 md:grid-cols-4"
        >
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-4xl font-black text-white md:text-5xl">{item.value}</div>
              <div className="mt-2 text-[#8FA99A]">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}