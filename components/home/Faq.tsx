'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Do I need prior coding experience?',
    a: 'No! The Free tier starts from absolute zero — HTML basics, how the web works, and everything you need before writing a line of code. If you already know HTML/CSS you can skip ahead and join directly at the bootcamp level.',
  },
  {
    q: 'How are the live sessions structured?',
    a: 'Each week you get 4 live sessions of 2 hours each. Sessions mix instruction, live coding, and Q&A. All sessions are recorded so you can rewatch if you miss one.',
  },
  {
    q: 'What is the class size?',
    a: 'Strictly 20 students maximum per batch, whether online or in-person. This ensures every student gets individual attention, code reviews, and answers to their questions.',
  },
  {
    q: 'When does the next batch start?',
    a: 'Batches run on a rolling schedule. Apply now and you\'ll be contacted with the next available start date. We\'re currently onboarding for Batch 21.',
  },
  {
    q: 'Is the certificate recognised by employers?',
    a: 'Our certificate is recognised by a growing list of Ethiopian tech companies. More importantly, you\'ll leave with real projects, a portfolio, and skills that speak louder than any certificate.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Telebirr, CBE Birr, and bank transfer. Payment plans are available for bootcamp students — contact us for details.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [30, -30]), { stiffness: 60, damping: 20 })

  return (
    <section id="faq" ref={ref} className="bg-[#050B08] py-20 px-6 relative overflow-hidden section-bridge-top">
      <motion.div style={{ y }} className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 text-[#00C853] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#00C853]/50" />
            FAQ
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#00C853]/50" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            Frequently Asked{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#00C853] to-[#B2FF59] bg-clip-text text-transparent">
                Questions
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00C853]/60 to-transparent" />
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className={`rounded-[16px] border transition-all duration-500 overflow-hidden ${
                open === i
                  ? 'bg-[#0C1812]/90 backdrop-blur-md border-[#00C853]/40 shadow-[0_10px_30px_rgba(0,200,83,0.15)]'
                  : 'bg-[#0A120E]/50 backdrop-blur-sm border-white/[0.08] hover:border-[#00C853]/30 hover:bg-[#0C1812]/70'
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-6 text-left px-5 py-4 sm:px-6 sm:py-4.5 cursor-pointer focus:outline-none"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-bold text-sm sm:text-base transition-colors duration-300 ${open === i ? 'text-[#00C853]' : 'text-white'}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    open === i ? 'bg-[#00C853]/20 text-[#00C853]' : 'bg-white/5 text-[#8FA99A]'
                  }`}
                >
                  <Plus size={16} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 pt-0 sm:px-6 sm:pb-5 text-[#8FA99A] text-[13px] sm:text-[14px] leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
