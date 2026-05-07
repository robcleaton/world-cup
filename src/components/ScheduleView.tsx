import { useState, useEffect } from 'react'
import { GROUPS } from '@/data/fixtures'
import type { Match } from '@/data/fixtures'
import type { Team } from '@/data/teams'
import { MatchCard } from './MatchCard'

interface Props {
  matches: Match[]
  selectedTeam: Team | null
}

type Filter = 'myteam' | 'all' | 'live' | 'today' | 'group' | 'knockout'

function isToday(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  return d.getFullYear() === now.getFullYear() &&
         d.getMonth() === now.getMonth() &&
         d.getDate() === now.getDate()
}

function groupByDate(matches: Match[]) {
  const map = new Map<string, Match[]>()
  for (const m of matches) {
    const key = new Date(m.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
    const arr = map.get(key) ?? []
    arr.push(m)
    map.set(key, arr)
  }
  return map
}

export function ScheduleView({ matches, selectedTeam }: Props) {
  const [filter, setFilter] = useState<Filter>(selectedTeam ? 'myteam' : 'all')

  useEffect(() => {
    setFilter(selectedTeam ? 'myteam' : 'all')
  }, [selectedTeam?.code])

  const teamGroupId = selectedTeam
    ? (GROUPS.find(g => g.teams.includes(selectedTeam.code))?.id ?? null)
    : null

  const filtered = matches.filter(m => {
    if (filter === 'myteam' && selectedTeam) return m.home === selectedTeam.code || m.away === selectedTeam.code
    if (filter === 'live') return m.status === 'live'
    if (filter === 'today') return isToday(m.date)
    if (filter === 'group') return m.round === 'group' && (teamGroupId ? m.group === teamGroupId : true)
    if (filter === 'knockout') return m.round !== 'group'
    return true
  })

  const byDate = groupByDate(filtered)

  const filters: { id: Filter; label: string }[] = [
    ...(selectedTeam ? [{ id: 'myteam' as Filter, label: `${selectedTeam.flag} ${selectedTeam.name}` }] : []),
    { id: 'all', label: 'All Matches' },
    { id: 'live', label: '● Live' },
    { id: 'today', label: 'Today' },
    { id: 'group', label: 'Group Stage' },
    { id: 'knockout', label: 'Knockout' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '6px 16px',
              borderRadius: 4,
              border: '1px solid',
              borderColor: filter === f.id ? 'var(--gold)' : 'var(--border)',
              background: filter === f.id ? 'rgba(244,196,48,0.1)' : 'transparent',
              color: filter === f.id ? 'var(--gold)' : 'var(--text-muted)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Matches grouped by date */}
      {byDate.size === 0 && (
        <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 40 }}>
          No matches found
        </div>
      )}

      {Array.from(byDate).map(([date, ms]) => (
        <div key={date} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>{date}</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ms.length} matches</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ms.map(m => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
