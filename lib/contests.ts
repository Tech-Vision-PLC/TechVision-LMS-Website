// Client-safe: types and date helpers only. No secrets here.

export type Contest = {
  name: string
  title: string
  start_date: string // "2026-09-24 10:49:12"
  end_date: string
  status: string
}

export type LeaderboardEntry = {
  name: string
  score: number
  solved: number
}

// Frappe returns naive datetimes in the server timezone (assumed EAT here)
export const parseFrappeDate = (s: string) =>
  new Date(s.replace(' ', 'T') + '+03:00')