import 'server-only'
import  { parseFrappeDate,type Contest, type LeaderboardEntry } from './contests'

const LMS_URL = process.env.LMS_URL ?? 'https://learn.techvision.edu.et'


const LEADERBOARD_METHOD = 'dsa.api.get_contest_leaderboard'
const CONTESTS_METHOD = 'dsa.api.get_contests'

async function frappeMethod<T>(
  method: string,
  params: Record<string, string>,
): Promise<T | null> {
  const url = `${LMS_URL}/api/method/${method}?${new URLSearchParams(params)}`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.FRAPPE_API_KEY}:${process.env.FRAPPE_API_SECRET}`,
      },
      cache: 'no-store', // switch to `next: { revalidate: 60 }` after testing
    })

    if (!res.ok) {
      console.error('[frappe] failed', res.status, method, await res.text())
      return null
    }

    const json = await res.json()
    return (json.message ?? json.data ?? null) as T | null
  } catch (e) {
    console.error('[frappe] threw', method, e)
    return null
  }
}

const contestParams = (order_by: string) => ({
  fields: JSON.stringify(['name', 'title', 'start_date', 'end_date', 'status']),
  order_by,
  limit_page_length: '1',
})

// Latest contest ever (for testing)
export async function getLastContest(): Promise<Contest | null> {
  const rows = await frappeMethod<Contest[]>(
    CONTESTS_METHOD,
    contestParams('start_date desc'),
  )
  return rows?.[0] ?? null
}

// Earliest Active contest that hasn't ended yet
export async function getNextContest(): Promise<Contest | null> {
  const rows = await frappeMethod<Contest[]>(CONTESTS_METHOD, {})
  console.log('[next] fetched', rows?.map((r) => [r.name, r.status, r.end_date]))

  const now = Date.now()
  return (
    (rows ?? [])
      .filter((c) => c.status === 'Active' && parseFrappeDate(c.end_date).getTime() >= now)
      .sort((a, b) => parseFrappeDate(a.start_date).getTime() - parseFrappeDate(b.start_date).getTime())[0] ?? null
  )
}

export async function getLeaderboard(
  contest: string,
): Promise<LeaderboardEntry[]> {
  const raw = await frappeMethod<any>(LEADERBOARD_METHOD, { contest })
  console.log('[leaderboard] raw', JSON.stringify(raw, null, 2))

  // Accept either an array, or an object wrapping one
  const rows: any[] = Array.isArray(raw)
    ? raw
    : (Object.values(raw ?? {}).find(Array.isArray) as any[]) ?? []

  return rows
    .map((r) => ({
      name:
        r.full_name ?? r.participant_name ?? r.participant ?? r.user ?? 'Anonymous',
      score: Number(r.score ?? r.total_score ?? 0),
      solved: Number(r.solved ?? r.problems_solved ?? 0),
    }))
    .sort((a, b) => b.score - a.score)
}