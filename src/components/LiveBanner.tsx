import type { Match } from '@/data/fixtures'
import { TEAMS } from '@/data/teams'

interface Props {
  liveMatches: Match[]
}

export function LiveBanner({ liveMatches }: Props) {
  if (liveMatches.length === 0) return null

  return (
    <div style={{
      background: 'rgba(34,197,94,0.08)',
      borderBottom: '1px solid rgba(34,197,94,0.2)',
      padding: '8px 24px',
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      overflowX: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--live)', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--live)' }}>
          Live Now
        </span>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {liveMatches.map(m => {
          const home = TEAMS[m.home]
          const away = TEAMS[m.away]
          return (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <span style={{ fontSize: 16 }}>{home?.flag ?? m.home}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--live)' }}>
                {m.homeScore} – {m.awayScore}
              </span>
              <span style={{ fontSize: 16 }}>{away?.flag ?? m.away}</span>
              {m.minute && (
                <span style={{ fontSize: 10, color: '#888' }}>{m.minute}'</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
