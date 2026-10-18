import "server-only";
import {
  parseFrappeDate,
  type Contest,
  type LeaderboardEntry,
} from "./contests";

const LMS_URL =
  process.env.LMS_URL ?? "https://learn.techvision.edu.et";

const LEADERBOARD_METHOD = "dsa.api.get_contest_leaderboard";
const CONTESTS_METHOD = "dsa.api.get_contests";

async function frappeMethod<T>(
  method: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  const url = `${LMS_URL}/api/method/${method}?${new URLSearchParams(params)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `token ${process.env.FRAPPE_API_KEY}:${process.env.FRAPPE_API_SECRET}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(
        "[frappe] failed",
        res.status,
        method,
        await res.text(),
      );
      return null;
    }

    const json = await res.json();
    return (json.message ?? json.data ?? null) as T | null;
  } catch (error) {
    console.error("[frappe] request failed", method, error);
    return null;
  }
}

const contestParams = (order_by = "start_date asc") => ({
  fields: JSON.stringify([
    "name",
    "title",
    "start_date",
    "end_date",
    "status",
  ]),
  order_by,
  limit_page_length: "100",
});

// Get the most recently started contest.
export async function getLastContest(): Promise<Contest | null> {
  const rows = await frappeMethod<Contest[]>(
    CONTESTS_METHOD,
    contestParams("start_date desc"),
  );

  return rows?.[0] ?? null;
}

// Get the next upcoming or currently active contest.
export async function getNextContest(): Promise<Contest | null> {
  const rows = await frappeMethod<Contest[]>(
    CONTESTS_METHOD,
    contestParams("start_date asc"),
  );

  if (!rows?.length) {
    console.log("[next] No contests returned from Frappe");
    return null;
  }

  const now = Date.now();

  const eligibleContests = rows
    .filter((contest) => {
      const start = parseFrappeDate(contest.start_date).getTime();
      const end = parseFrappeDate(contest.end_date).getTime();

      const validDates =
        Number.isFinite(start) &&
        Number.isFinite(end) &&
        end >= now;

      const validStatus =
        contest.status === "Upcoming" ||
        contest.status === "Active";

      return validDates && validStatus;
    })
    .sort(
      (a, b) =>
        parseFrappeDate(a.start_date).getTime() -
        parseFrappeDate(b.start_date).getTime(),
    );

  console.log(
    "[next] eligible contests:",
    eligibleContests.map((contest) => ({
      name: contest.name,
      title: contest.title,
      status: contest.status,
      start_date: contest.start_date,
    })),
  );

  return eligibleContests[0] ?? null;
}

// Get the leaderboard for a contest.
export async function getLeaderboard(
  contest: string,
): Promise<LeaderboardEntry[]> {
  const raw = await frappeMethod<any>(LEADERBOARD_METHOD, {
    contest,
  });

  if (!raw) {
    return [];
  }

  const rows: any[] = Array.isArray(raw)
    ? raw
    : Object.values(raw).find(Array.isArray) as any[] ?? [];

  return rows
    .map((row) => ({
      name:
        row.full_name ??
        row.participant_name ??
        row.participant ??
        row.user ??
        "Anonymous",
      score: Number(row.score ?? row.total_score ?? 0),
      solved: Number(row.solved ?? row.problems_solved ?? 0),
    }))
    .sort((a, b) => b.score - a.score);
}