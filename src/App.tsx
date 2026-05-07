import { useEffect, useState } from 'react'
import { ALL_MATCHES } from './data/fixtures'
import { TEAMS } from './data/teams'
import type { Team } from './data/teams'
import { useLiveScores } from './hooks/useLiveScores'
import { applyTeamTheme } from './lib/theme'
import { Header } from './components/Header'
import { LiveBanner } from './components/LiveBanner'
import { GroupsView } from './components/GroupsView'
import { ScheduleView } from './components/ScheduleView'
import { KnockoutBracket } from './components/KnockoutBracket'
import { TeamPicker } from './components/TeamPicker'

const LS_KEY = 'wc26-team'

function loadSavedTeam(): Team | null {
  try {
    const code = localStorage.getItem(LS_KEY)
    return code ? (TEAMS[code] ?? null) : null
  } catch {
    return null
  }
}

type Tab = 'schedule' | 'groups' | 'bracket'

const TABS: { id: Tab; label: string }[] = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'groups', label: 'Groups' },
  { id: 'bracket', label: 'Bracket' },
]

export default function App() {
  const [tab, setTab] = useState<Tab>('schedule')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(loadSavedTeam)

  const allMatches = useLiveScores(ALL_MATCHES)
  const liveMatches = allMatches.filter(m => m.status === 'live')
  const groupMatches = allMatches.filter(m => m.round === 'group')
  const knockoutMatches = allMatches.filter(m => m.round !== 'group')

  // Apply / reset theme whenever selection changes
  useEffect(() => {
    applyTeamTheme(selectedTeam)
    try {
      if (selectedTeam) localStorage.setItem(LS_KEY, selectedTeam.code)
      else localStorage.removeItem(LS_KEY)
    } catch { /* ignore */ }
  }, [selectedTeam])

  return (
    <div style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <Header selectedTeam={selectedTeam} onPickTeam={() => setPickerOpen(true)} />
      <LiveBanner liveMatches={liveMatches} />

      {/* Tabs */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        position: 'sticky',
        top: 60,
        zIndex: 50,
      }}>
        <div className="layout-inner" style={{ display: 'flex' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '14px 20px',
                border: 'none',
                background: 'transparent',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                color: tab === t.id ? 'var(--gold)' : 'var(--text-muted)',
                borderBottom: `2px solid ${tab === t.id ? 'var(--gold)' : 'transparent'}`,
                marginBottom: -1,
                transition: 'color 0.4s, border-color 0.4s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="content-area">
        {tab === 'schedule' && <ScheduleView matches={allMatches} selectedTeam={selectedTeam} />}
        {tab === 'groups' && <GroupsView matches={groupMatches} />}
        {tab === 'bracket' && <KnockoutBracket matches={knockoutMatches} />}
      </div>

      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#080808',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
      }}>
        {selectedTeam?.code === 'USA' && (() => {
          const trumpItems = Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: i % 2 === 0 ? '#e63946' : '#777',
              paddingRight: '3em',
            }}>Donald Trump is a bellend</span>
          ))
          return (
            <div className="marquee-band" style={{ height: 84, borderBottom: '1px solid var(--border)' }}>
              <div className="marquee-copy marquee-copy--rtl">{trumpItems}</div>
              <div className="marquee-copy marquee-copy--rtl" aria-hidden="true">{trumpItems}</div>
            </div>
          )
        })()}
        {(() => {
          const loveItems = Array.from({ length: 14 }).map((_, i) => (
            <span key={i} style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: i % 2 === 0 ? 'var(--text-muted)' : 'var(--border)',
              paddingRight: '3em',
            }}>One Love</span>
          ))
          return (
            <div className="marquee-band" style={{ height: 36 }}>
              <div className="marquee-copy marquee-copy--ltr">{loveItems}</div>
              <div className="marquee-copy marquee-copy--ltr" aria-hidden="true">{loveItems}</div>
            </div>
          )
        })()}
      </footer>

      <TeamPicker
        open={pickerOpen}
        selected={selectedTeam}
        onSelect={setSelectedTeam}
        onClose={() => setPickerOpen(false)}
      />
    </div>
  )
}
