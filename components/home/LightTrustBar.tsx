'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

const universities = [
  { name: 'Addis Ababa University', short: 'AAU' },
  { name: 'Addis Ababa Science & Technology University', short: 'AASTU' },
  { name: 'Adama Science & Technology University', short: 'ASTU' },
  { name: 'Bahir Dar University', short: 'BDU' },
  { name: 'Haramaya University', short: 'Haramaya' },
  { name: 'Jimma University', short: 'Jimma' },
  { name: 'Hawassa University', short: 'Hawassa' },
  { name: 'University of Gondar', short: 'UoG' },
]

const marqueeItems = [...universities, ...universities]

export function LightTrustBar() {
  return (
    <section className="overflow-hidden border-y border-[#ffff] bg-[#fffff] py-12">
      <div className="mb-8 px-6 text-center">
        <p className="tv-mono text-xs font-semibold uppercase tracking-[.18em] text-[#00d38d]">
          Trusted by students from
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16  sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16  sm:w-28" />
        <motion.div
          className="flex w-max gap-4 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        >
          {marqueeItems.map((uni, index) => (
            <div
              key={`${uni.short}-${index}`}
              className="flex min-w-56 items-center gap-3 border border-[#dce5df] bg-white px-5 py-4 transition duration-300 hover:-translate-y-1 hover:border-[#00d38d]/50 hover:shadow-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf8ef] text-[#00d38d]">
                <GraduationCap size={18} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-[#111713]">{uni.short}</div>
                <div className="mt-0.5 text-xs text-[#68736d]">{uni.name}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
