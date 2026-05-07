import type { Group } from '@/data/fixtures'
import { FlagBadge } from './FlagBadge'

interface Standing {
  team: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
}

function gd(s: Standing) { return s.gf - s.ga }
function pts(s: Standing) { return s.won * 3 + s.drawn }

interface Props {
  group: Group
  standings?: Standing[]
}

export function GroupTable({ group, standings }: Props) {
  const defaultStandings: Standing[] = group.teams.map(t => ({
    team: t, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0,
  }))

  const rows = (standings ?? defaultStandings).sort((a, b) =>
    pts(b) - pts(a) || gd(b) - gd(a) || b.gf - a.gf
  )

  return (
    <div style={{
      background: 'transparent',
      border: '1px solid var(--border)',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      {/* Group header */}
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>
          {group.name}
        </span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          P  W  D  L  GD  Pts
        </span>
      </div>

      {rows.map((row, i) => {
        const advances = i < 2
        return (
          <div key={row.team} style={{
            padding: '8px 16px',
            borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'transparent',
          }}>
            <span style={{
              width: 18,
              fontSize: 11,
              fontWeight: 800,
              color: advances ? 'var(--gold)' : 'var(--text-muted)',
              flexShrink: 0,
            }}>{i + 1}</span>

            <div style={{ flex: 1 }}>
              <FlagBadge code={row.team} size="sm" showName />
            </div>

            <div style={{
              display: 'flex',
              gap: 14,
              fontSize: 12,
              color: 'var(--text-muted)',
              fontVariantNumeric: 'tabular-nums',
              flexShrink: 0,
            }}>
              {[row.played, row.won, row.drawn, row.lost, gd(row)].map((v, idx) => (
                <span key={idx} style={{ width: 16, textAlign: 'center' }}>{v >= 0 && idx === 4 && v > 0 ? `+${v}` : v}</span>
              ))}
              <span style={{ width: 24, textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>{pts(row)}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
