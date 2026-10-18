import { UpcomingBatchesClient } from "./UpcomingBatchesClient"

const BASE_URL = 'https://learn.techvision.edu.et'

async function getUpcomingBatchNames(): Promise<string[]> {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  const params = new URLSearchParams({
    filters: JSON.stringify([
      ['published', '=', 1],
      ['start_date', '>', today],
    ]),
    fields: JSON.stringify(['name']),
  })

  const res = await fetch(`${BASE_URL}/api/resource/LMS%20Batch?${params}`, {
    headers: {
      Authorization: `token ${process.env.FRAPPE_API_KEY}:${process.env.FRAPPE_API_SECRET}`,
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    console.error('Failed to fetch upcoming batch names:', res.status, await res.text())
    return []
  }

  const data = await res.json()
  return (data?.data ?? []).map((b: any) => b.name as string)
}

async function getBatchDetail(name: string): Promise<any | null> {
  const res = await fetch(
    `${BASE_URL}/api/resource/LMS%20Batch/${encodeURIComponent(name)}`,
    {
      headers: {
        Authorization: `token ${process.env.FRAPPE_API_KEY}:${process.env.FRAPPE_API_SECRET}`,
      },
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    console.error(`Failed to fetch batch "${name}":`, res.status, await res.text())
    return null
  }

  const { data: batch } = await res.json()
  return batch
}

async function getUserFullName(email: string): Promise<string> {
  const fieldsParam = encodeURIComponent(JSON.stringify(['full_name']))
  const res = await fetch(
    `${BASE_URL}/api/resource/User/${encodeURIComponent(email)}?fields=${fieldsParam}`,
    {
      headers: {
        Authorization: `token ${process.env.FRAPPE_API_KEY}:${process.env.FRAPPE_API_SECRET}`,
      },
      next: { revalidate: 300 },
    }
  )

  if (!res.ok) return email
  const { data } = await res.json()
  return data?.full_name || email
}

async function getUpcomingBatches() {
  const names = await getUpcomingBatchNames()
  const batches = await Promise.all(names.map((name) => getBatchDetail(name)))
  const validBatches = batches.filter(Boolean)

  const allEmails = new Set<string>()
  validBatches.forEach((batch: any) => {
    ;(batch.instructors ?? []).forEach((i: any) => {
      if (i.instructor) allEmails.add(i.instructor)
    })
  })

  const nameMap = new Map<string, string>()
  await Promise.all(
    Array.from(allEmails).map(async (email) => {
      nameMap.set(email, await getUserFullName(email))
    })
  )

  return validBatches.map((batch: any) => ({
    name: batch.name,
    title: batch.title,
    description: batch.description ?? null,
    seatCount: batch.seat_count ?? null,
    amount: batch.amount ?? null,
    currency: batch.currency ?? null,
    startDate: batch.start_date ?? null,
    endDate: batch.end_date ?? null,
    startTime: batch.start_time ?? null,
    endTime: batch.end_time ?? null,
    timezone: batch.timezone ?? null,
    instructors: (batch.instructors ?? []).map((i: any) => ({
      instructor: i.instructor,
      full_name: nameMap.get(i.instructor) || i.instructor,
    })),
  }))
}

export async function UpcomingBatches() {
  const batches = await getUpcomingBatches()

  return <UpcomingBatchesClient batches={batches} />
}