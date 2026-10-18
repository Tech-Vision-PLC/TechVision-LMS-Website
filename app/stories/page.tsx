import type { Metadata } from 'next'
import { Navbar } from '@/components/home/Navbar'
import { Footer } from '@/components/home/Footer'
import { SuccessStoriesPage } from '@/components/stories/SuccessStoriesPage'

export const metadata: Metadata = {
  title: 'Success Stories | TechVision',
  description: 'Explore TechVision student journeys, portfolio outcomes and graduate stories.',
}

export default function Stories() {
  return (
    <>
      <Navbar />
      <SuccessStoriesPage />
      <Footer />
    </>
  )
}
