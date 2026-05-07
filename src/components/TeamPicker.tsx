import { useRef, useState } from 'react'
import { TEAMS } from '@/data/teams'
import type { Team } from '@/data/teams'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'

interface Props {
  open: boolean
  selected: Team | null
  onSelect: (team: Team | null) => void
  onClose: () => void
}

const ALL_TEAMS = Object.values(TEAMS).sort((a, b) => a.name.localeCompare(b.name))

export function TeamPicker({ open, selected, onSelect, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query.trim()
    ? ALL_TEAMS.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.code.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_TEAMS


  function handleSelect(team: Team) {
    onSelect(team)
    onClose()
  }

  return (
    <Drawer
      open={open}
      onOpenChange={isOpen => { if (!isOpen) onClose() }}
      direction="right"
    >
      <DrawerContent>
        {/* Header */}
        <DrawerHeader style={{
          borderBottom: '1px solid var(--border)',
          padding: '20px 24px 16px',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 4,
              }}>
                Support your nation
              </div>
              <DrawerTitle style={{ color: '#fff', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                Pick Your Team
              </DrawerTitle>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {selected && (
                <button
                  onClick={() => { onSelect(null); onClose() }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 4,
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
              )}
              <DrawerClose asChild>
                <button
                  style={{
                    width: 32, height: 32,
                    borderRadius: 4,
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    fontSize: 20,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>

        {/* Search */}
        <div style={{
          padding: '12px 24px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search country…"
            autoFocus
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '10px 14px',
              fontSize: 14,
              color: '#f0f0f0',
              outline: 'none',
            }}
          />
        </div>

        {/* Team list — scrollable */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 24px 32px' }}>
          <div className="team-grid">
            {filtered.map(team => (
              <TeamCard
                key={team.code}
                team={team}
                isSelected={selected?.code === team.code}
                onSelect={() => handleSelect(team)}
              />
            ))}
            {filtered.length === 0 && (
              <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1', textAlign: 'center', padding: 32 }}>
                No teams found
              </p>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function TeamCard({ team, isSelected, onSelect }: {
  team: Team
  isSelected: boolean
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 8,
        padding: '14px 8px',
        border: `1px solid ${isSelected ? 'var(--gold)' : hovered ? 'rgba(255,255,255,0.12)' : 'var(--border)'}`,
        borderRadius: 8,
        background: isSelected
          ? `rgba(var(--accent-rgb, 244,196,48), 0.1)`
          : hovered ? 'rgba(255,255,255,0.04)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.12s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Colour stripe at top when selected */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${team.colors[0]}, ${team.colors[1]})`,
        }} />
      )}

      {/* Flag badge */}
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 6,
        background: `linear-gradient(135deg, ${team.colors[0]} 50%, ${team.colors[1]} 50%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <span style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>{team.flag}</span>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 13, height: 13,
          background: 'rgba(255,255,255,0.15)',
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }} />
      </div>

      <span style={{
        fontSize: 22,
        fontWeight: 700,
        color: isSelected ? 'var(--gold)' : '#c0c0c0',
        textAlign: 'left',
        lineHeight: 1.2,
      }}>
        {team.name}
      </span>
    </button>
  )
}
