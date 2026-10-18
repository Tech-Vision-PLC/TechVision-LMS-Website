'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Monitor, Moon, Sun } from 'lucide-react'

export type ThemeMode = 'light' | 'dark' | 'system'

export function applyTheme(mode: ThemeMode) {
  if (typeof window === 'undefined') return
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode
  document.documentElement.dataset.theme = resolved
  document.documentElement.dataset.themeMode = mode
  document.documentElement.style.colorScheme = resolved
}

export function ThemeMenu({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('system')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = (localStorage.getItem('techvision-theme') as ThemeMode | null) ?? 'system'
    setTheme(saved)
    applyTheme(saved)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => {
      const current = (localStorage.getItem('techvision-theme') as ThemeMode | null) ?? 'system'
      if (current === 'system') applyTheme('system')
    }
    media.addEventListener('change', onSystemChange)
    return () => media.removeEventListener('change', onSystemChange)
  }, [])

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const choose = (mode: ThemeMode) => {
    setTheme(mode)
    localStorage.setItem('techvision-theme', mode)
    applyTheme(mode)
    setOpen(false)
    window.dispatchEvent(new CustomEvent('techvision-theme-change', { detail: mode }))
  }

  const CurrentIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`tv-theme-trigger flex items-center justify-center gap-1.5 rounded-full border border-[#dce5df] bg-white text-[#171c19] transition hover:border-[#00d38d] hover:text-[#168452] ${compact ? 'h-9 w-9' : 'h-9 px-3'}`}
        aria-label="Choose website theme"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Theme"
      >
        <CurrentIcon size={17} />
        {!compact && <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />}
      </button>

      {open && (
        <div className="tv-theme-menu absolute right-0 z-[80] mt-3 w-44 overflow-hidden rounded-xl border border-[#dce5df] bg-white p-1.5 shadow-[0_18px_45px_rgba(17,23,19,.16)]">
          {([
            ['light', 'Light', Sun],
            ['dark', 'Dark', Moon],
            ['system', 'System', Monitor],
          ] as const).map(([mode, label, Icon]) => (
            <button
              key={mode}
              type="button"
              onClick={() => choose(mode)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-[#f0faf4] ${theme === mode ? 'font-bold text-[#168452]' : 'text-[#171c19]'}`}
              aria-pressed={theme === mode}
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {theme === mode && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
