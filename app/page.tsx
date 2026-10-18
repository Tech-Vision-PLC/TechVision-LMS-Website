import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { LandingHero } from '@/components/home/LandingHero'
import { LightTrustBar } from '@/components/home/LightTrustBar'
import { SuccessFeatures } from '@/components/home/SuccessFeatures'
import { UpcomingBatches } from "@/components/home/UpcomingBatches"
const faqs = [
  {
    q: 'Do I need prior coding experience?',
    a: 'No. You can start from the fundamentals, including HTML, CSS, and how the web works. Learners with prior experience can move ahead more quickly.',
  },
  {
    q: 'How are the live sessions structured?',
    a: 'Live sessions combine instructor explanation, hands-on coding, project work, and time for questions so you can practice concepts as you learn them.',
  },
  {
    q: 'What is the class size?',
    a: 'Cohorts are intentionally kept small so students can receive more direct support, feedback, code reviews, and interaction with instructors.',
  },
  {
    q: 'When does the next batch start?',
    a: 'New batches are opened on a rolling schedule. Apply for the program and the TechVision team will share the next available start date and schedule.',
  },
  {
    q: 'Is the certificate recognised by employers?',
    a: 'The certificate confirms that you completed the TechVision program. Your portfolio, practical projects, GitHub work, and demonstrated skills are also important when applying to employers.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Available payment methods and payment-plan options depend on the program. Contact the TechVision team for the current supported methods and tuition details.',
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-[#0c120f]">
        <LandingHero />
        <LightTrustBar />
        <UpcomingBatches/>
        <SuccessFeatures />

        <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
          <div className="text-center">
            <div className="tv-mono text-xs">FAQ</div>
            <h2 className="mt-3 text-4xl font-black">Frequently Asked Questions</h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border border-[#76827a] px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {faq.q}
                  <span className="text-xl text-[#839087] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#66716a]">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
