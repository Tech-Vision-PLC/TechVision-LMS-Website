'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  { weeks: 'Week 1–2', title: 'HTML & CSS', description: 'Semantic HTML, Flexbox, Grid, and responsive web design.' },
  { weeks: 'Week 3–4', title: 'JavaScript', description: 'Core JavaScript, DOM manipulation, async/await, and ES6+.' },
  { weeks: 'Week 5–7', title: 'React', description: 'Component architecture, hooks, state, and interactive UIs.' },
  { weeks: 'Week 8–10', title: 'Next.js', description: 'Full-stack React, App Router, server actions, and deployment.' },
  { weeks: 'Week 11', title: 'Team Project', description: 'Collaborate on a real group project using Git workflows.' },
  { weeks: 'Week 12', title: 'Portfolio', description: 'Polish your GitHub, build a portfolio, and prepare for interviews.' },
]

export function Roadmap() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} className="tv-roadmap relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:pb-24 lg:pt-32 bg-[#ffffff] dark:bg-[#1b2721]">
      <motion.div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <div className="tv-roadmap-eyebrow mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
            <span className="h-px w-9" />
            Curriculum
            <span className="h-px w-9" />
          </div>
          <h2 className="tv-roadmap-title text-4xl font-black leading-tight sm:text-5xl lg:text-6xl dark:text-[#f2f7f4]">
            Your 12-Week <span>Roadmap</span>
          </h2>
          <p className="tv-roadmap-intro mx-auto mt-5 max-w-2xl text-sm leading-relaxed sm:text-base">
            A structured, step-by-step path from zero to a job-ready frontend developer.
          </p>
        </motion.div>

        <div className="relative mt-20 hidden lg:block">
          <div className="tv-roadmap-line absolute left-0 right-0 top-[4.7rem] h-[3px]">
            <motion.div
              className="tv-roadmap-line-progress h-full origin-left"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-6 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.weeks}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative mb-5">
                  <div className="tv-roadmap-node relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-[3px] text-lg transition-all duration-200 group-hover:scale-105">
                    {i + 1}
                  </div>
                </div>
                <div className="tv-roadmap-card  border p-4 transition-all duration-200">
                  <span className="tv-roadmap-week mb-1.5 block text-[11px] font-bold uppercase tracking-[0.1em]">{step.weeks}</span>
                  <h3 className="tv-roadmap-step-title mb-2 text-base font-black">{step.title}</h3>
                  <p className="tv-roadmap-description text-[13px] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex max-w-md flex-col gap-0 pl-4 lg:hidden">
          <div className="tv-roadmap-mobile-line absolute bottom-0 left-[2.2rem] top-0 w-1 rounded-full">
            <motion.div
              className="tv-roadmap-mobile-progress w-full origin-top rounded-full"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.weeks}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative z-10 flex gap-6 pb-10 last:pb-0"
            >
              <div className="relative mt-1 flex-shrink-0">
                <div className="tv-roadmap-node flex h-12 w-12 items-center justify-center rounded-full border-[3px] text-base transition-all duration-200 group-hover:scale-105">
                  {i + 1}
                </div>
              </div>
              <div className="tv-roadmap-card -mt-3 flex-1 rounded-2xl border p-5 transition-all duration-200">
                <span className="tv-roadmap-week mb-1 block text-[11px] font-bold uppercase tracking-[0.1em]">{step.weeks}</span>
                <h3 className="tv-roadmap-step-title mb-2 text-lg font-black">{step.title}</h3>
                <p className="tv-roadmap-description text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
