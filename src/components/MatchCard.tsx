import type { Match } from '@/data/fixtures'
import { TEAMS } from '@/data/teams'
import { FlagBadge } from './FlagBadge'

interface Props {
  match: Match
  compact?: boolean
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function isKnownTeam(code: string) {
  return Boolean(TEAMS[code])
}

function TeamName({ code, known, align }: { code: string; known: boolean; align?: 'left' | 'right' }) {
  const name = TEAMS[code]?.name ?? code
  return (
    <span style={{
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--text)',
      textAlign: 'center',
      lineHeight: 1.2,
      maxWidth: 120,
    }}>
      {known ? name : <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: 13 }}>{code}</span>}
    </span>
  )
}

export function MatchCard({ match, compact }: Props) {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined
  const homeKnown = isKnownTeam(match.home)
  const awayKnown = isKnownTeam(match.away)

  // Compact layout (used in GroupsView)
  if (compact) {
    return (
      <div style={{
        border: `1px solid ${isLive ? 'rgba(34,197,94,0.25)' : 'var(--border)'}`,
        borderRadius: 8,
        padding: '12px 16px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        justifyItems: 'center',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {homeKnown
            ? <FlagBadge code={match.home} size="sm" showName namePosition="below" />
            : <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{match.home}</span>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {hasScore ? (
            <span style={{ fontSize: 18, fontWeight: 900, color: isLive ? 'var(--live)' : 'var(--text)', letterSpacing: '-0.02em' }}>
              {match.homeScore}–{match.awayScore}
            </span>
          ) : (
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{formatTime(match.date)}</span>
          )}
          {isLive && (
            <span style={{ fontSize: 10, color: 'var(--live)', fontWeight: 800 }}>{match.minute ? `${match.minute}'` : 'LIVE'}</span>
          )}
          {isFinished && (
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>FT</span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {awayKnown
            ? <FlagBadge code={match.away} size="sm" showName namePosition="below" />
            : <span style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>{match.away}</span>}
        </div>
      </div>
    )
  }

  // Full FIFA-style card
  return (
    <div style={{
      border: `1px solid ${isLive ? 'rgba(34,197,94,0.3)' : 'var(--border)'}`,
      borderRadius: 10,
      padding: '20px 24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {/* Top meta row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          {match.round === 'group' && match.group ? `Group ${match.group}` : match.round}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
          {match.venue} · {match.city}
        </span>
      </div>

      {/* Teams + score/time */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 12,
      }}>
        {/* Home team */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          {homeKnown
            ? <FlagBadge code={match.home} size="lg" />
            : <div style={{ width: 56, height: 56, borderRadius: 4, background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{match.home}</span>
              </div>
          }
          <TeamName code={match.home} known={homeKnown} />
        </div>

        {/* Center: score or time */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          minWidth: 110,
        }}>
          {hasScore ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 40,
                fontWeight: 900,
                color: isLive ? 'var(--live)' : 'var(--text)',
                letterSpacing: '-0.04em',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
              }}>{match.homeScore}</span>
              <span style={{ fontSize: 22, color: 'var(--text-muted)', fontWeight: 300 }}>–</span>
              <span style={{
                fontSize: 40,
                fontWeight: 900,
                color: isLive ? 'var(--live)' : 'var(--text)',
                letterSpacing: '-0.04em',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: 1,
              }}>{match.awayScore}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{
                fontSize: 30,
                fontWeight: 800,
                color: 'var(--text)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>{formatTime(match.date)}</span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>GMT</span>
            </div>
          )}

          {/* Status */}
          {isLive && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: 'var(--live)',
                animation: 'pulse 1.5s infinite', display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{ fontSize: 11, color: 'var(--live)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {match.minute ? `${match.minute}'` : 'Live'}
              </span>
            </div>
          )}
          {isFinished && (
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Full Time</span>
          )}
          {!isLive && !isFinished && (
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{formatDateShort(match.date)}</span>
          )}
        </div>

        {/* Away team */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          {awayKnown
            ? <FlagBadge code={match.away} size="lg" />
            : <div style={{ width: 56, height: 56, borderRadius: 4, background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{match.away}</span>
              </div>
          }
          <TeamName code={match.away} known={awayKnown} />
        </div>
      </div>
    </div>
  )
}
