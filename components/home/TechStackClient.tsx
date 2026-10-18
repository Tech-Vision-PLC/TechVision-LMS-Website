'use client'

import { useState } from 'react'

const INITIAL_COUNT = 3

interface Instructor {
  instructor: string
  full_name: string
}

interface Course {
  name: string
  title: string
  url: string
  description: string | null
  image: string | null
  instructors: Instructor[]
}

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: ' ',
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  rsquo: '\u2019',
  lsquo: '\u2018',
  rdquo: '\u201D',
  ldquo: '\u201C',
  ndash: '\u2013',
  mdash: '\u2014',
  hellip: '\u2026',
}

function stripHtml(html: string | null): string {
  if (!html) return ''

  return html
    .replace(/<\/(p|li|div|h[1-6]|ul|ol)>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    )
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match)
    .replace(/\s+/g, ' ')
    .trim()
}

export function TechStackClient({ courses }: { courses: Course[] }) {
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? courses : courses.slice(0, INITIAL_COUNT)

  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <header className="mb-14 text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-slate-400 dark:bg-[#1b2721] sm:w-14" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00d68f]">
            Start Learning
          </p>
          <span className="h-px w-10 bg-slate-400 dark:bg-[#1b2721] sm:w-14" />
        </div>

        <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-[#0a0f0d] dark:text-white sm:text-5xl lg:text-6xl">
          Available <span className="text-[#00d68f]">Courses</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          Explore our featured courses and pick the one that fits where you are
          in your journey. Click any course to see the full details.
        </p>
      </header>

      {courses.length === 0 ? (
        <p className="py-12 text-center text-slate-500 dark:text-slate-400">
          No featured courses yet.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((course) => {
              const instructor = course.instructors[0]
              const initial = instructor?.full_name?.charAt(0).toUpperCase()
              const description = stripHtml(course.description)

              return (
                <a
                  key={course.name}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d68f] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:border-slate-700"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                    {course.image && (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-semibold text-[#0a0f0d] transition group-hover:text-[#00b578] dark:text-white dark:group-hover:text-[#00d68f]">
                      {course.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-[3rem] text-slate-600 dark:text-slate-400">
                      {description}
                    </p>

                    <div className="mt-auto flex items-center gap-3 pt-6">
                      {instructor ? (
                        <>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white">
                            {initial}
                          </span>
                          <span className="truncate text-sm text-slate-700 dark:text-slate-300">
                            {instructor.full_name}
                          </span>
                        </>
                      ) : (
                        <span className="h-9" />
                      )}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          {courses.length > INITIAL_COUNT && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="rounded-lg border border-slate-300 px-8 py-2.5 font-medium text-slate-800 transition hover:border-[#00d68f] hover:text-[#00b578] dark:border-slate-700 dark:text-slate-200 dark:hover:border-[#00d68f] dark:hover:text-[#00d68f]"
              >
                {showAll ? 'Show less' : 'More'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}