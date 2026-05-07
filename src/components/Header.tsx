import { Shirt } from 'lucide-react'
import type { Team } from '@/data/teams'

function luminance(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function textOnColor(hex: string) {
  return luminance(hex) > 0.35 ? '#000000' : '#ffffff'
}

interface Props {
  selectedTeam: Team | null
  onPickTeam: () => void
}

export function Header({ selectedTeam, onPickTeam }: Props) {
  return (
    <header style={{
      padding: '0 24px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      height: 60,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(12px)',
    }}>
      {/* Logo mark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 32,
          height: 32,
          background: 'var(--gold)',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.4s',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polygon points="9,1 17,6 17,12 9,17 1,12 1,6" fill="#080808" />
            <polygon points="9,4 14,7 14,11 9,14 4,11 4,7" fill="var(--gold)" />
          </svg>
        </div>

        <div>
          <div style={{
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#fff',
            lineHeight: 1.1,
          }}>
            FIFA World Cup
          </div>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            lineHeight: 1,
            transition: 'color 0.4s',
          }}>
            USA · Canada · Mexico 2026
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Team picker button */}
      <button
        onClick={onPickTeam}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: selectedTeam ? '6px 14px 6px 8px' : '7px 16px',
          border: `1px solid ${selectedTeam ? selectedTeam.colors[0] : 'var(--border)'}`,
          borderRadius: 6,
          background: selectedTeam ? selectedTeam.colors[0] : 'var(--surface2)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          flexShrink: 0,
        }}
      >
        {selectedTeam ? (
          <>
            <Shirt size={14} color={textOnColor(selectedTeam.colors[0])} strokeWidth={2.5} />
            {/* Mini flag badge */}
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${selectedTeam.colors[0]} 50%, ${selectedTeam.colors[1]} 50%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
            }}>
              <span style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))' }}>
                {selectedTeam.flag}
              </span>
            </div>
            <span style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: textOnColor(selectedTeam.colors[0]),
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {selectedTeam.name}
            </span>
          </>
        ) : (
          <>
            <Shirt size={14} color="var(--text-muted)" strokeWidth={2.5} />
            <span style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              My Team
            </span>
          </>
        )}
      </button>
    </header>
  )
}
