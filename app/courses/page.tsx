import { Navbar } from "@/components/home/Navbar"
import { Roadmap } from "@/components/home/Roadmap"
import { TechStack } from "@/components/home/TechStack"
import { CoursePageSections } from "@/components/home/CoursePageSections"
import { Footer } from "@/components/home/Footer"
import { UpcomingBatches } from "@/components/home/UpcomingBatches"

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-[#fffff]">
        <Roadmap />
        <TechStack />
        <CoursePageSections />
      </main>
      <Footer compact />
    </>
  )
}
