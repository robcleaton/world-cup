import { useEffect, useRef, useState } from 'react'
import type { Match } from '@/data/fixtures'

// Uses the free API-Football (api-football.com) endpoint via RapidAPI.
// Set VITE_RAPIDAPI_KEY in .env to enable live data.
// Without the key the hook returns an empty overrides map and live scores
// are shown only if seeded into the local fixtures data.

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY as string | undefined
const WC2026_ID = 1 // API-Football's tournament ID for FIFA World Cup 2026
const POLL_INTERVAL = 60_000 // 60 s

interface ScoreOverride {
  homeScore: number
  awayScore: number
  status: 'live' | 'finished'
  minute?: number
}

type Overrides = Record<string, ScoreOverride> // keyed by apiId (as string)

async function fetchLive(): Promise<Overrides> {
  if (!API_KEY) return {}

  try {
    const res = await fetch(
      `https://v3.football.api-sports.io/fixtures?league=${WC2026_ID}&season=2026&live=all`,
      {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    )
    if (!res.ok) return {}
    const json = await res.json()
    const out: Overrides = {}
    for (const f of json.response ?? []) {
      const id = String(f.fixture.id)
      out[id] = {
        homeScore: f.goals.home ?? 0,
        awayScore: f.goals.away ?? 0,
        status: f.fixture.status.short === 'FT' ? 'finished' : 'live',
        minute: f.fixture.status.elapsed ?? undefined,
      }
    }
    return out
  } catch {
    return {}
  }
}

async function fetchFinished(): Promise<Overrides> {
  if (!API_KEY) return {}

  try {
    const res = await fetch(
      `https://v3.football.api-sports.io/fixtures?league=${WC2026_ID}&season=2026&status=FT`,
      {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    )
    if (!res.ok) return {}
    const json = await res.json()
    const out: Overrides = {}
    for (const f of json.response ?? []) {
      const id = String(f.fixture.id)
      out[id] = {
        homeScore: f.goals.home ?? 0,
        awayScore: f.goals.away ?? 0,
        status: 'finished',
      }
    }
    return out
  } catch {
    return {}
  }
}

export function useLiveScores(matches: Match[]): Match[] {
  const [overrides, setOverrides] = useState<Overrides>({})
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    async function refresh() {
      const [live, finished] = await Promise.all([fetchLive(), fetchFinished()])
      setOverrides({ ...finished, ...live })
    }
    refresh()
    timer.current = setInterval(refresh, POLL_INTERVAL)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [])

  return matches.map(m => {
    if (!m.apiId) return m
    const o = overrides[String(m.apiId)]
    if (!o) return m
    return { ...m, ...o }
  })
}
