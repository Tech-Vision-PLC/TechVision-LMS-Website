'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  CalendarDays,
  Clock3,
  Globe,
  Play,
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

  const date = new Date(dateStr)

  if (Number.isNaN(date.getTime())) return dateStr

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(timeStr?: string | null): string {
  if (!timeStr) return ''

  const [hours, minutes] = timeStr.split(':')
  const hour = Number.parseInt(hours, 10)

  if (Number.isNaN(hour)) return timeStr

  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12

  return `${displayHour}:${minutes || '00'} ${period}`
}

function formatPrice(
  amount?: number | null,
  currency?: string | null,
): string {
  if (amount == null || amount === 0) return 'Free'

  const formattedAmount = amount.toLocaleString()

  if (currency === 'ETB') {
    return `Br ${formattedAmount} /month`
  }

  return currency
    ? `${currency} ${formattedAmount}`
    : formattedAmount
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
              text-[#00a86b]
              dark:text-[#00d38d]
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
            <span className="text-[#00a86b] dark:text-[#00d38d]">
              Cohort
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-relaxed
              text-[#4a5a52]
              dark:text-[#aab7b0]
              sm:text-base
            "
          >
            Explore our upcoming training programs and find the right
            batch to start building your skills.
          </p>
        </motion.div>

        {/* BATCH GRID */}
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
                py-8
                text-center
                text-sm
                text-[#4a5a52]
                dark:text-[#aab7b0]
              "
            >
              No upcoming batches found.
            </p>
          )}

          {batches.map((batch, i) => {
            const batchUrl =
              `https://learn.techvision.edu.et/lms/batches/${encodeURIComponent(
                batch.title,
              )}`

            const instructors = batch.instructors ?? []

            return (
              <Link
                key={batch.name}
                href={batchUrl}
                aria-label={`View ${batch.title} batch and apply`}
                className="
                  group
                  block
                  h-full
                  rounded-2xl
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#00a86b]
                  focus-visible:ring-offset-4
                  dark:focus-visible:ring-[#00d38d]
                  dark:focus-visible:ring-offset-[#0f1713]
                "
              >
                <motion.article
                  initial={{
                    opacity: 0,
                    scale: 0.95,
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
                    y: -6,
                  }}
                  className="
                    relative
                    flex
                    h-full
                    cursor-pointer
                    flex-col
                    rounded-2xl
                    border
                    border-[#e2ece6]
                    bg-white
                    p-5
                    text-left
                    shadow-sm
                    transition-all
                    duration-300
                    group-hover:border-[#00a86b]
                    group-hover:shadow-lg
                    dark:border-[#35443b]
                    dark:bg-[#17211c]
                    dark:shadow-[3px_4px_0_#080d0a]
                    dark:group-hover:border-[#00d38d]
                    dark:group-hover:shadow-[6px_8px_0_#080d0a]
                  "
                >
                  {/* BATCH TITLE */}
                  <h3
                    className="
                      text-lg
                      font-bold
                      text-[#080d0b]
                      transition-colors
                      group-hover:text-[#008f5d]
                      dark:text-[#f2f7f4]
                      dark:group-hover:text-[#00d38d]
                    "
                  >
                    {batch.title}
                  </h3>

                  {/* AVAILABLE SEATS */}
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
                        text-[#008f5d]
                        dark:bg-[#28543c]
                        dark:text-[#8be3ad]
                      "
                    >
                      {batch.seatCount} Seats
                    </span>
                  )}

                  {/* DESCRIPTION */}
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

                  {/* PRICE */}
                  <div
                    className="
                      mt-4
                      text-lg
                      font-bold
                      text-[#080d0b]
                      dark:text-[#f2f7f4]
                    "
                  >
                    {formatPrice(batch.amount, batch.currency)}
                  </div>

                  {/* SCHEDULE DETAILS */}
                  <div
                    className="
                      mt-4
                      flex
                      flex-col
                      gap-3
                      text-sm
                      text-[#4a5a52]
                      dark:text-[#aab7b0]
                    "
                  >
                    {(batch.startDate || batch.endDate) && (
                      <div className="flex items-start gap-2">
                        <CalendarDays
                          size={15}
                          className="
                            mt-0.5
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
                      </div>
                    )}

                    {(batch.startTime || batch.endTime) && (
                      <div className="flex items-start gap-2">
                        <Clock3
                          size={15}
                          className="
                            mt-0.5
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
                      </div>
                    )}

                    {batch.timezone && (
                      <div className="flex items-start gap-2">
                        <Globe
                          size={15}
                          className="
                            mt-0.5
                            shrink-0
                            text-[#00a86b]
                            dark:text-[#00d38d]
                          "
                        />

                        <span>{batch.timezone}</span>
                      </div>
                    )}
                  </div>

                  {/* INSTRUCTORS */}
                  {instructors.length > 0 && (
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
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#e2ece6]
                          text-xs
                          font-bold
                          text-[#4a5a52]
                          dark:bg-[#28543c]
                          dark:text-[#b7f0cb]
                        "
                      >
                        {getInstructorLabel(instructors[0])
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
                        {instructors.map(getInstructorLabel).join(', ')}
                      </span>
                    </div>
                  )}

                  {/* APPLY INDICATOR */}
                  <div
                    className="
                      mt-auto
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-[#07100b]
                      px-5
                      py-3
                      mt-7
                      font-mono
                      text-xs
                      font-bold
                      tracking-wider
                      text-white
                      transition-colors
                      duration-200
                      group-hover:bg-[#00a86b]
                      dark:group-hover:bg-[#00d38d]
                      dark:group-hover:text-[#07100b]
                    "
                  >
                    <Play size={14} fill="currentColor" />
                    VIEW BATCH & APPLY
                  </div>
                </motion.article>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}