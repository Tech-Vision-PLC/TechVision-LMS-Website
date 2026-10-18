'use client'

import { BrandLogo } from '@/components/BrandLogo'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  User,
} from 'lucide-react'
import { ThemeMenu } from '@/components/ThemeMenu'

const items = [
  ['/dashboard', 'Dashboard', LayoutDashboard],
  ['/dashboard/courses', 'My Courses', BookOpen],
  ['/dashboard/applications', 'My Applications', FileText],
  ['/dashboard/profile', 'Profile', User],
]

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="tv-dashboard min-h-screen bg-[#f7faf8] text-[#111713]">
      <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-[#dce5df] bg-white px-5 lg:px-7">
        <BrandLogo className="h-7" />

        <div className="flex items-center gap-3">
          <ThemeMenu compact />
          <div className="relative" ref={accountRef}>
            <button
              type="button"
              onClick={() => setAccountOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d38d]"
              aria-expanded={accountOpen}
              aria-haspopup="menu"
              aria-label="Open account menu"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7f8ee] text-xs font-bold text-[#168452]">RS</span>
              <ChevronDown size={14} className={`hidden text-[#68736d] transition-transform sm:block ${accountOpen ? 'rotate-180' : ''}`} />
            </button>

            {accountOpen && (
              <div className="tv-account-menu absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-[#dce5df] bg-white shadow-[0_18px_45px_rgba(17,23,19,.14)]">
                <div className="border-b border-[#e5ece8] px-4 py-3.5">
                  <p className="text-sm font-bold">Rediet Seleshi</p>
                  <p className="mt-1 text-xs text-[#68736d]">rediet@example.com</p>
                </div>
                <Link href="/dashboard/profile" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#f5f8f6]">
                  <User size={17} /> Profile & account
                </Link>
                <Link href="/login" className="flex items-center gap-3 border-t border-[#e5ece8] px-4 py-3 text-sm hover:bg-[#f5f8f6]">
                  <LogOut size={17} /> Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-60px)]">
        <aside className={`sticky top-[60px] hidden h-[calc(100vh-60px)] shrink-0 flex-col border-r border-[#dce5df] bg-white transition-[width] duration-300 md:flex ${sidebarOpen ? 'w-60' : 'w-[72px]'}`}>
          <div className={`flex items-center p-4 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            {sidebarOpen && <div className="tv-mono text-[10px] font-bold text-[#7e8c84]">STUDENT PORTAL</div>}
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#dce5df] text-[#4c5952] transition hover:bg-[#f5f8f6] hover:text-[#168452]"
              aria-label={sidebarOpen ? 'Collapse dashboard menu' : 'Expand dashboard menu'}
              title={sidebarOpen ? 'Collapse menu' : 'Expand menu'}
            >
              {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>

          <nav className={`space-y-1.5 ${sidebarOpen ? 'px-4' : 'px-3'}`}>
            {items.map(([href, label, Icon]) => {
              const A = Icon as typeof User
              const active = href === '/dashboard' ? path === href : path.startsWith(String(href))
              return (
                <Link
                  key={String(href)}
                  href={String(href)}
                  title={!sidebarOpen ? String(label) : undefined}
                  className={`flex items-center rounded-lg py-2.5 text-sm transition ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-0'} ${active ? 'bg-[#eaf8ef] font-bold text-[#168452]' : 'text-[#4c5952] hover:bg-[#f5f8f6]'}`}
                >
                  <A size={18} className="shrink-0" />
                  {sidebarOpen && <span>{String(label)}</span>}
                </Link>
              )
            })}
          </nav>

          <div className={`mt-auto border-t border-[#e4ebe6] py-3 ${sidebarOpen ? 'px-4' : 'px-3'}`}>
            <Link href="/login" title={!sidebarOpen ? 'Log Out' : undefined} className={`flex items-center py-2.5 text-sm text-[#4c5952] transition hover:text-[#168452] ${sidebarOpen ? 'gap-3 px-3' : 'justify-center px-0'}`}>
              <LogOut size={18} className="shrink-0" />
              {sidebarOpen && <span>Log Out</span>}
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-9">{children}</main>
      </div>
    </div>
  )
}
