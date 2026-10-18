'use client'

import { Navbar } from '@/components/navbar'
import {
  parseFrappeDate,
  type Contest,
  type LeaderboardEntry,
} from '@/lib/contests'
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Code2,
  Trophy,
  UserRound,
  Zap,
} from 'lucide-react'

const CONTEST_URL = 'https://learn.techvision.edu.et/contest-page'

/*
  Shared leaderboard grid so the header and rows always line up.
  - minmax(0,1fr) lets the name column shrink so `truncate` works
  - smaller fixed columns on mobile, original sizes from sm up
*/
const LEADERBOARD_COLS =
  'grid grid-cols-[40px_minmax(0,1fr)_52px_64px] gap-2 sm:grid-cols-[70px_minmax(0,1fr)_100px_100px] sm:gap-4'

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

const howItWorks = [
  {
    number: '01',
    icon: UserRound,
    title: 'Register',
    description:
      'Create your account or sign in to get started. It’s quick and free.',
  },
  {
    number: '02',
    icon: Code2,
    title: 'Join a Contest',
    description: 'Pick a contest from the upcoming list and click “Register”.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Solve Problems',
    description:
      'Write clean, efficient code and submit your solutions before time runs out.',
  },
  {
    number: '04',
    icon: Trophy,
    title: 'See Your Rank',
    description:
      'Get your results instantly and see how you rank on the leaderboard.',
  },
]

const fmtDate = (s: string) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Addis_Ababa',
  }).format(parseFrappeDate(s)) + ' (EAT)'

function fmtDuration(start: string, end: string) {
  const mins = Math.round(
    (+parseFrappeDate(end) - +parseFrappeDate(start)) / 60000,
  )
  if (mins >= 1440) {
    const d = Math.round(mins / 1440)
    return `${d} day${d > 1 ? 's' : ''}`
  }
  return mins >= 60 ? `${Math.round(mins / 60)} hours` : `${mins} minutes`
}

export default function ContestPageClient({
  contest,
  entries,
}: {
  contest: Contest | null
  entries: LeaderboardEntry[]
}) {
  const leaderboard = entries.slice(0, 5).map((e, i) => ({
    rank: i + 1,
    name: e.name,
    initials: initialsOf(e.name),
    solved: e.solved,
    points: e.score.toLocaleString('en-US'),
  }))

  const now = new Date()
  const ended = !!contest && parseFrappeDate(contest.end_date) < now
  const live = !!contest && !ended && parseFrappeDate(contest.start_date) <= now

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#ffffff] text-[#111916] dark:bg-[#0f1713] dark:text-[#f2f7f4]">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-[#dce5df] dark:border-[#35443b]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-64 w-64 border-r border-b border-[#dce5df] dark:border-[#35443b]" />
            <div className="absolute right-0 top-0 h-64 w-64 border-l border-b border-[#dce5df] dark:border-[#35443b]" />
          </div>

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:py-28">
            {/* HERO COPY */}
            <div className="min-w-0">
              <div className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#00d38d]">
                <span className="h-px w-8 bg-[#00d38d]" />
                Contests
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Test Your Skills.
                <span className="block text-[#00d38d]">Build Your Future.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-[#68736d] dark:text-[#b5c1ba] sm:text-lg">
                Participate in coding contests, challenge yourself, and climb
                the leaderboard. Compete, learn, grow.
              </p>

              <a
                href={CONTEST_URL}
                className="mt-8 inline-flex items-center gap-3 border border-[#00d38d] bg-[#00d38d] px-6 py-3.5 text-sm font-bold text-[#071c12] transition-all duration-300 hover:bg-[#00a66f]"
              >
                View Upcoming Contests
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* HERO VISUAL (desktop only) */}
            <div className="relative hidden min-h-[360px] items-center justify-center lg:flex">
              <div className="relative h-72 w-[430px]">
                {/* BACK WINDOW */}
                <div className="absolute left-10 top-10 h-48 w-72 rotate-[-7deg] border-2 border-[#00d38d]/40 bg-[#17211c] p-5 shadow-[8px_8px_0_#080d0a]">
                  <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#00d38d]" />
                    <span className="h-2 w-2 rounded-full bg-[#00d38d]/60" />
                    <span className="h-2 w-2 rounded-full bg-[#00d38d]/30" />
                  </div>

                  <div className="mt-7 space-y-3">
                    <div className="h-2 w-32 bg-[#28543c]" />
                    <div className="h-2 w-44 bg-[#28543c]" />
                    <div className="h-2 w-24 bg-[#28543c]" />
                  </div>
                </div>

                {/* FRONT WINDOW */}
                <div className="absolute right-6 top-20 h-48 w-72 border-2 border-[#00d38d] bg-[#17211c] p-5 shadow-[8px_8px_0_#080d0a]">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#00d38d]" />
                      <span className="h-2 w-2 rounded-full bg-[#00d38d]/60" />
                      <span className="h-2 w-2 rounded-full bg-[#00d38d]/30" />
                    </div>

                    <Code2 className="h-5 w-5 text-[#00d38d]" />
                  </div>

                  <div className="mt-8 flex items-center justify-center">
                    <div className="text-6xl font-black text-[#00d38d]">
                      {'</>'}
                    </div>
                  </div>
                </div>

                {/* TROPHY */}
                <div className="absolute bottom-0 right-0 flex h-24 w-24 items-center justify-center border-2 border-[#00d38d] bg-[#28543c]">
                  <Trophy className="h-12 w-12 text-[#00d38d]" />
                </div>

                <div className="absolute -right-8 top-5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#68736d] dark:text-[#b5c1ba]">
                  Better
                  <br />
                  Code
                  <br />
                  Bigger
                  <br />
                  Dreams
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERBOARD + UPCOMING */}
        <section
          id="upcoming"
          className="mx-auto max-w-6xl px-4 py-12 sm:px-8 lg:py-24"
        >
          {/* grid-cols-1 + min-w-0 children stop the leaderboard from
              forcing the page wider than the phone screen */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_0.9fr]">
            {/* LEADERBOARD */}
            <div className="min-w-0 border border-[#dce5df] bg-[#ffffff] dark:border-[#35443b] dark:bg-[#17211c]">
              <div className="flex flex-col justify-between gap-4 border-b border-[#dce5df] p-5 sm:flex-row sm:items-center sm:p-6 dark:border-[#35443b]">
                <div>
                  <div className="mb-2 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#00d38d]">
                    <span>/</span>
                    Leaderboard
                  </div>

                  <h2 className="text-2xl font-black sm:text-3xl">
                    Top Performers
                  </h2>

                  <p className="mt-2 text-sm text-[#68736d] dark:text-[#b5c1ba]">
                    See how you stack up against other learners.
                  </p>
                </div>
              </div>

              {/* TABLE HEADER */}
              <div
                className={`${LEADERBOARD_COLS} mx-3 mt-5 bg-[#f6fbf8] px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#68736d] sm:mx-6 sm:px-4 dark:bg-[#1d2922] dark:text-[#9eaaa3]`}
              >
                <span>Rank</span>
                <span>User</span>
                <span>Solved</span>
                <span>Points</span>
              </div>

              {/* ROWS */}
              <div className="px-3 pb-5 sm:px-6">
                {leaderboard.length === 0 && (
                  <p className="px-3 py-8 text-sm text-[#68736d] sm:px-4 dark:text-[#b5c1ba]">
                    No results yet. Be the first on the board!
                  </p>
                )}
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`${LEADERBOARD_COLS} items-center border-b border-[#dce5df] px-3 py-4 last:border-b-0 sm:px-4 dark:border-[#35443b]`}
                  >
                    <div className="flex items-center">
                      {user.rank <= 3 ? (
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                            user.rank === 1
                              ? 'bg-[#00d38d] text-[#071c12]'
                              : user.rank === 2
                                ? 'bg-[#dce5df] text-[#17211c]'
                                : 'bg-[#28543c] text-[#f2f7f4]'
                          }`}
                        >
                          {user.rank}
                        </div>
                      ) : (
                        <span className="pl-2 text-sm font-semibold">
                          {user.rank}
                        </span>
                      )}
                    </div>

                    <div className="flex min-w-0 items-center gap-3">
                      {/* Avatar hidden on phones to give the name room */}
                      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f1713] text-[10px] font-bold text-[#00d38d] sm:flex dark:bg-[#28543c]">
                        {user.initials}
                      </div>

                      <span className="truncate text-sm font-semibold">
                        {user.name}
                      </span>
                    </div>

                    <span className="text-sm">{user.solved}</span>

                    <span className="text-sm font-semibold">{user.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NEXT CONTEST (dynamic) */}
            <div className="flex min-w-0 flex-col border border-[#dce5df] bg-[#ffffff] p-6 text-[#111916] sm:p-7 dark:border-[#35443b] dark:bg-[#0f1713] dark:text-[#f2f7f4]">
              <div className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#00d38d]">
                <span>/</span>
                {ended ? 'Latest Contest' : live ? 'Live Now' : 'Next Contest'}
              </div>

              {contest ? (
                <>
                  <div className="flex-1">
                    <h2 className="break-words text-2xl font-black sm:text-3xl">
                      {contest.title}
                    </h2>

                    <div className="mt-2 h-1 w-10 bg-[#00d38d]" />

                    <div className="mt-7 space-y-5">
                      <div className="flex items-center gap-4">
                        <CalendarDays className="h-5 w-5 shrink-0 text-[#00d38d]" />
                        <span className="text-sm">
                          {ended || live ? 'Started' : 'Starts'}{' '}
                          {fmtDate(contest.start_date)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <Clock3 className="h-5 w-5 shrink-0 text-[#00d38d]" />
                        <span className="text-sm">
                          {ended ? 'Ended' : 'Ends'} {fmtDate(contest.end_date)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <Zap className="h-5 w-5 shrink-0 text-[#00d38d]" />
                        <span className="text-sm">
                          {fmtDuration(contest.start_date, contest.end_date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={CONTEST_URL}
                    className="mt-10 flex w-full items-center justify-center gap-3 border border-[#00d38d] px-5 py-3.5 text-sm font-bold text-[#00a66f] transition-colors hover:bg-[#00d38d] hover:text-[#071c12] dark:bg-[#00d38d] dark:text-[#071c12] dark:hover:bg-[#00a66f]"
                  >
                    {ended ? 'View Results' : live ? 'Join Now' : 'Register Now'}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </>
              ) : (
                <p className="flex-1 text-sm text-[#68736d] dark:text-[#b5c1ba]">
                  No upcoming contests right now. Check back soon.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-8 lg:pb-24">
          <div className="border border-[#dce5df] p-4 sm:p-8 lg:p-10 dark:border-[#35443b]">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#00d38d]">
                  <span>/</span>
                  How It Works
                </div>

                <h2 className="text-3xl font-black sm:text-4xl">
                  Simple Steps. Real Progress.
                </h2>

                <p className="mt-3 text-sm text-[#68736d] dark:text-[#b5c1ba]">
                  Join a contest in just a few clicks and start your journey.
                </p>
              </div>

              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#00d38d]">
                Complete / Learn / Grow
              </div>
            </div>

            {/* STEPS */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step, index) => {
                const Icon = step.icon

                return (
                  <div
                    key={step.number}
                    className="relative min-w-0 border border-[#dce5df] bg-[#ffffff] p-6 dark:border-[#35443b] dark:bg-[#17211c]"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#00d38d]">
                        {step.number}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center bg-[#0f1713] dark:bg-[#28543c]">
                        <Icon className="h-5 w-5 text-[#00d38d]" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold">{step.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-[#68736d] dark:text-[#b5c1ba]">
                      {step.description}
                    </p>

                    {index < howItWorks.length - 1 && (
                      <ChevronRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 bg-[#ffffff] text-[#00a66f] lg:block dark:bg-[#0f1713]" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* CTA BANNER */}
            <div className="mt-6 flex flex-col gap-6 border border-[#dce5df] bg-[#ffffff] p-5 text-[#111916] sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:border-[#35443b] dark:bg-[#0f1713] dark:text-[#f2f7f4]">
              <div className="flex min-w-0 items-center gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#00d38d] bg-[#28543c]">
                  <Trophy className="h-6 w-6 text-[#00d38d]" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold">Ready to take on the challenge?</h3>

                  <p className="mt-1 text-xs text-[#68736d] dark:text-[#b5c1ba]">
                    Join our next contest and see what you’re capable of.
                  </p>
                </div>
              </div>

              <a
                href={CONTEST_URL}
                className="inline-flex shrink-0 items-center justify-center gap-3 border border-[#00d38d] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#00a66f] transition-all duration-300 hover:bg-[#00d38d] hover:text-[#071c12] dark:text-[#00d38d]"
              >
                Browse All Contests
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}