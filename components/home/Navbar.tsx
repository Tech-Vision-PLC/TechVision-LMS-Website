'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { ThemeMenu } from '@/components/ThemeMenu'
import { BrandLogo } from '@/components/BrandLogo'

export function Navbar({ hideCourses = false }: { hideCourses?: boolean }) {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const keepCoursesOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const closeCoursesSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 160)
  }

  const navLink =
    'tv-nav-link text-[15px] font-medium transition-colors duration-200'

  return (
    <header className="tv-navbar sticky top-0 z-50 backdrop-blur">
      <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between px-5 sm:px-7 ">

        <BrandLogo className="h-7 w-auto" />

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/" className={navLink}>
            Home
          </Link>

          <Link href="/courses" className={navLink}>
            Courses
          </Link>

          <Link href="/stories" className={navLink}>
            Stories
          </Link>

          <Link href="/pricing" className={navLink}>
            Pricing
          </Link>
          <Link href="/contest" className={navLink}>
            Contest
          </Link>
     
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeMenu compact />

          <a href="https://learn.techvision.edu.et/login" className={navLink}>
            Login
          </a>

          <Link
            href="https://learn.techvision.edu.et/batch-application/new"
            className=" bg-[#00d38d] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[.11em] text-[#002333] transition hover:bg-[#00bf80]"
          >
            Apply Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobile((value) => !value)}
          className="tv-mobile-menu-button md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobile}
        >
          {mobile ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobile && (
        <div className="tv-mobile-nav border-t px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            <Link
              href="/"
              className="tv-nav-link"
              onClick={() => setMobile(false)}
            >
              Home
            </Link>

            {!hideCourses && (
              <Link
                href="/courses"
                className="tv-nav-link"
                onClick={() => setMobile(false)}
              >
                Courses
              </Link>
            )}

            <Link
              href="/stories"
              className="tv-nav-link"
              onClick={() => setMobile(false)}
            >
              Student Stories
            </Link>

            <Link
              href="/pricing"
              className="tv-nav-link"
              onClick={() => setMobile(false)}
            >
              Pricing
            </Link>
            <Link
              href="/contest"
              className="tv-nav-link"
              onClick={() => setMobile(false)}
            >
              Contest
            </Link>

            <div className="tv-mobile-theme-row flex items-center justify-between border-y py-3">
              <span>Theme</span>
              <ThemeMenu />
            </div>

            <Link
              href="https://learn.techvision.edu.et/login"
              className="tv-nav-link"
              onClick={() => setMobile(false)}
            >
              Login
            </Link>

            <Link
              href="https://learn.techvision.edu.et/batch-application/new"
              onClick={() => setMobile(false)}
              className="w-fit rounded-md bg-[#00d38d] px-5 py-2.5 font-bold text-[#002333]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
