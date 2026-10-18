'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, BadgeCheck, Layers3, MessageSquare, Users, Video } from 'lucide-react'

const features = [
  [Layers3, 'Real Projects', 'Build production-ready applications that solve real-world problems. Leave with a portfolio that stands out.'],
  [Video, 'Live Mentorship', 'Get direct guidance from experienced engineers, regular code reviews, and career advice.'],
  [Users, 'Small Cohorts', 'Learn in a tight-knit community of ambitious peers and collaborate on projects.'],
  [Briefcase, 'Career Focused', 'Portfolio building, interview prep, GitHub optimization, and job-search guidance.'],
  [MessageSquare, 'Community', 'Join an active community of alumni and current students. Get support when you need it.'],
  [BadgeCheck, 'Certification', 'Earn a TechVision completion certificate that validates your skills to employers and clients.'],
]

export function SuccessFeatures() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h2 className="text-4xl font-black tracking-tight">
          Built for Your <span className="text-[#00d38d]">Success</span>
        </h2>
        <p className="tv-mono mx-auto mt-5 max-w-3xl text-xs uppercase leading-relaxed text-[#59645e] dark:text-[#aab7b0]">
          Our curriculum is designed to take you from fundamentals to advanced concepts preparing you for elite technology roles.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map(([Icon, title, desc], index) => {
          const I = Icon as typeof Layers3
          return (
            <motion.article
              key={String(title)}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -7, scale: 1.025 }}
              className="min-h-48 border border-[#839087] bg-[#ffffff] p-7 shadow-[3px_3px_0_#dfe6e1] transition-shadow duration-300 hover:shadow-[7px_9px_0_#dfe6e1]
            
              dark:border-[#4b554f]
              dark:bg-[#121815]
              dark:shadow-[3px_3px_0_#080a09]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#7bba8c]">
                <I size={17} />
              </div>
              <h3 className="mt-5 text-lg font-semibold dark:text-white">{String(title)}</h3>
              <p className="mt-3 text-sm leading-6 text-[#333c37] dark:text-[#c0cbc5]">{String(desc)}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
