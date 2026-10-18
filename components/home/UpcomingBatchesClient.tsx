'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  CalendarDays,
  Clock3,
  Globe,
  Play,
  Sparkles,
} from 'lucide-react'

type Instructor = {
  instructor?: string
  full_name?: string
}

type Batch = {
  name: string
  title: string
  description?: string | null
  seatCount?: number | null
  amount?: number | null
  currency?: string | null
  startDate?: string | null
  endDate?: string | null
  startTime?: string | null
  endTime?: string | null
  timezone?: string | null
  instructors?: Instructor[]
}

function getInstructorLabel(instructor: Instructor): string {
  return (
    instructor.full_name ||
    instructor.instructor ||
    'Unknown instructor'
  )
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ''

  const d = new Date(dateStr)

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(timeStr?: string | null): string {
  if (!timeStr) return ''

  const [hours, minutes] = timeStr.split(':')
  const h = parseInt(hours, 10)
  const period = h >= 12 ? 'PM' : 'AM'
  const displayHour = h % 12 === 0 ? 12 : h % 12

  return `${displayHour}:${minutes} ${period}`
}

function formatPrice(
  amount?: number | null,
  currency?: string | null
): string {
  if (!amount) return 'Free'

  const symbol =
    currency === 'ETB'
      ? 'Br'
      : currency || ''

  return `${symbol} ${amount.toLocaleString()}`
}

export function UpcomingBatchesClient({
  batches,
}: {
  batches: Batch[]
}) {
  const ref = useRef<HTMLElement>(null)

  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return (
    <>
      <section
        ref={ref}
        className="
          relative
          overflow-hidden
          bg-[#ffffff]
          px-5
          py-20
          text-[#111916]
          transition-colors
          duration-300

          dark:bg-[#0f1713]
          dark:text-[#f2f7f4]

          sm:px-8
          lg:py-24
        "
      >
        <motion.div className="relative z-10 mx-auto max-w-6xl">

          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-12 text-center"
          >
            <div
              className="
                tv-mono
                mb-4
                inline-flex
                items-center
                gap-3
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#00d38d]
              "
            >
              <span
                className="
                  h-px
                  w-9
                  bg-[#9aa99f]
                  dark:bg-[#52625a]
                "
              />

              Upcoming Batches

              <span
                className="
                  h-px
                  w-9
                  bg-[#9aa99f]
                  dark:bg-[#52625a]
                "
              />
            </div>

            <h2
              className="
                text-4xl
                font-black
                leading-tight
                text-[#080d0b]

                dark:text-[#f2f7f4]

                sm:text-5xl
                lg:text-6xl
              "
            >
              Join Our Next{' '}
              <span className="text-[#00d38d]">
                Cohort
              </span>
            </h2>
          </motion.div>
          <div
            className="
              mx-auto
              grid
              max-w-5xl
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {batches.length === 0 && (
              <p
                className="
                  col-span-full
                  text-center
                  text-sm
                  text-[#4a5a52]

                  dark:text-[#aab7b0]
                "
              >
                No upcoming batches found.
              </p>
            )}

            {batches.map((batch, i) => (
              <motion.div
                key={batch.name}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 20,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }
                    : {}
                }
                transition={{
                  delay: 0.1 + i * 0.05,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="
                  group
                  relative
                  flex
                  flex-col
                  rounded-2xl
                  border
                  border-[#e2ece6]
                  bg-[#ffffff]
                  p-5
                  text-left
                  shadow-sm
                  transition-all
                  duration-300

                  dark:border-[#35443b]
                  dark:bg-[#17211c]
                  dark:shadow-[3px_4px_0_#080d0a]

                  dark:hover:shadow-[6px_8px_0_#080d0a]
                "
              >
                <h3
                  className="
                    text-lg
                    font-bold
                    text-[#080d0b]

                    dark:text-[#f2f7f4]
                  "
                >
                  {batch.title}
                </h3>
                {batch.seatCount != null && (
                  <span
                    className="
                      mt-2
                      inline-block
                      w-fit
                      rounded-full
                      bg-[#e5f9f0]
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-[#00a86b]

                      dark:bg-[#28543c]
                      dark:text-[#8be3ad]
                    "
                  >
                    {batch.seatCount} Seats
                  </span>
                )}
                {batch.description && (
                  <p
                    className="
                      mt-3
                      line-clamp-2
                      text-sm
                      leading-relaxed
                      text-[#4a5a52]

                      dark:text-[#b5c1ba]
                    "
                  >
                    {batch.description}
                  </p>
                )}
                <div
                  className="
                    mt-4
                    text-lg
                    font-bold
                    text-[#080d0b]

                    dark:text-[#f2f7f4]
                  "
                >
                  {formatPrice(
                    batch.amount,
                    batch.currency
                  )}
                </div>
                <div
                  className="
                    mt-4
                    flex
                    flex-col
                    gap-2
                    text-sm
                    text-[#4a5a52]

                    dark:text-[#aab7b0]
                  "
                >
                  {(batch.startDate || batch.endDate) && (
                    <span className="flex items-center gap-2">
                      <CalendarDays
                        size={14}
                        className="
                          shrink-0
                          text-[#00a86b]
                          dark:text-[#00d38d]
                        "
                      />

                      <span>
                        {formatDate(batch.startDate)}
                        {batch.endDate
                          ? ` - ${formatDate(batch.endDate)}`
                          : ''}
                      </span>
                    </span>
                  )}

                  {(batch.startTime || batch.endTime) && (
                    <span className="flex items-center gap-2">
                      <Clock3
                        size={14}
                        className="
                          shrink-0
                          text-[#00a86b]
                          dark:text-[#00d38d]
                        "
                      />

                      <span>
                        {formatTime(batch.startTime)}
                        {batch.endTime
                          ? ` - ${formatTime(batch.endTime)}`
                          : ''}
                      </span>
                    </span>
                  )}

                  {batch.timezone && (
                    <span className="flex items-center gap-2">
                      <Globe
                        size={14}
                        className="
                          shrink-0
                          text-[#00a86b]
                          dark:text-[#00d38d]
                        "
                      />

                      <span>
                        {batch.timezone}
                      </span>
                    </span>
                  )}
                </div>

                {/* INSTRUCTOR */}
                {batch.instructors &&
                  batch.instructors.length > 0 && (
                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        border-t
                        border-[#e2ece6]
                        pt-3

                        dark:border-[#35443b]
                      "
                    >
                      <div
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#e2ece6]
                          text-xs
                          font-semibold
                          text-[#4a5a52]

                          dark:bg-[#28543c]
                          dark:text-[#b7f0cb]
                        "
                      >
                        {getInstructorLabel(
                          batch.instructors[0]
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span
                        className="
                          truncate
                          text-sm
                          text-[#4a5a52]

                          dark:text-[#b5c1ba]
                        "
                      >
                        {batch.instructors
                          .map(getInstructorLabel)
                          .join(', ')}
                      </span>
                    </div>
                  )}

                {/* APPLY */}
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                   href={`https://learn.techvision.edu.et/lms/batches/${encodeURIComponent(batch.title)}`}
                    className="
                      flex
                      items-center
                      gap-2
                      bg-[#07100b]
                      px-6
                      py-3
                      font-mono
                      text-xs
                      font-bold
                      text-white
                      transition-all
                      duration-200
                      hover:bg-[#00a66f]
                      hover:text-[#ffffff]
                    "
                  >
                    <Play
                      size={14}
                      fill="currentColor"
                    />

                    APPLY
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/** x
      <section
        className="
          bg-[#ffffff]
          px-5
          py-12
          transition-colors
          duration-300

          dark:bg-[#0f1713]

          sm:px-8
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-start
            justify-between
            gap-8
            border
            border-[#526158]
            bg-[#ffffff]
            p-8

            dark:border-[#35443b]
            dark:bg-[#17211c]

            sm:p-12
            lg:flex-row
            lg:items-center
          "
        >
          <div>

            <span
              className="
                tv-mono
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#e2faeb]
                px-3
                py-1
                text-[10px]
                font-bold
                uppercase
                text-[#31bd72]

                dark:bg-[#28543c]
                dark:text-[#8be3ad]
              "
            >
              <Sparkles size={12} />

              Join the next batch
            </span>

            <h2
              className="
                mt-6
                max-w-xl
                text-5xl
                font-medium
                leading-[1.05]
                text-[#080d0b]

                dark:text-[#f2f7f4]
              "
            >
              Your Future
              <br />
              Tech Career
              <br />
              <em className="text-[#00a66f] dark:text-[#00d38d]">
                Starts Today
              </em>
            </h2>

            <p
              className="
                tv-mono
                mt-6
                max-w-xl
                text-sm
                leading-relaxed
                text-[#4a5a52]

                dark:text-[#aab7b0]
              "
            >
              Join 350+ successful graduates who
              transitioned into tech careers.
              Don&apos;t wait for the right
              opportunity—build it with direct
              guidance and project-based experience.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="https://learn.techvision.edu.et/batch-application/new"
                className="
                  flex
                  items-center
                  gap-2
                  bg-[#07100b]
                  px-6
                  py-3
                  font-mono
                  text-xs
                  font-bold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-[#00a66f]
                "
              >
                <Play
                  size={14}
                  fill="currentColor"
                />

                APPLY FOR NEXT BATCH
              </Link>
            </div>
          </div>
          <div
            className="
              flex
              h-52
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-[#c8d0eb]
              bg-[#e8e9ff]
              text-[#7468f4]

              dark:border-[#35443b]
              dark:bg-[#20352b]
              dark:text-[#65d89b]

              lg:w-[315px]
            "
          >
            <Globe size={48} />
          </div>
        </div>
        </section>*/}
    </>
  )
}