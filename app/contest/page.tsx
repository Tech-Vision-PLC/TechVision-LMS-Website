import { getNextContest, getLeaderboard } from '@/lib/contests.server'
import ContestPageClient from '@/components/home/ContestPageClient'

export default async function Page() {
  const contest = await getNextContest()
  const entries = contest ? await getLeaderboard(contest.name) : []

  return <ContestPageClient contest={contest} entries={entries} />
}