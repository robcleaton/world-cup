import { TEAMS } from '@/data/teams'

interface Props {
  code: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showName?: boolean
  namePosition?: 'right' | 'below'
}

const SIZE_MAP = {
  sm: { badge: 28, font: 10, text: 'text-xs' },
  md: { badge: 40, font: 14, text: 'text-sm' },
  lg: { badge: 56, font: 18, text: 'text-base' },
  xl: { badge: 80, font: 26, text: 'text-xl' },
}

export function FlagBadge({ code, size = 'md', showName, namePosition = 'right' }: Props) {
  const team = TEAMS[code]
  const { badge, font, text } = SIZE_MAP[size]

  const isPlaceholder = !team
  const [primary, secondary] = team?.colors ?? ['#333', '#666']
  const flag = team?.flag ?? '?'
  const name = team?.name ?? code

  const Badge = (
    <div
      style={{
        width: badge,
        height: badge,
        background: `linear-gradient(135deg, ${primary} 50%, ${secondary} 50%)`,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: font,
        flexShrink: 0,
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isPlaceholder ? (
        <span style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: font * 0.6 }}>{code}</span>
      ) : (
        <span style={{ fontSize: font * 1.2, lineHeight: 1, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}>
          {flag}
        </span>
      )}
      {/* geometric corner accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: badge * 0.3,
        height: badge * 0.3,
        background: 'rgba(255,255,255,0.12)',
        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
      }} />
    </div>
  )

  if (!showName) return Badge

  if (namePosition === 'below') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        {Badge}
        <span className={text} style={{ color: 'var(--text)', fontWeight: 700, whiteSpace: 'nowrap' }}>{name}</span>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {Badge}
      <span className={text} style={{ color: 'var(--text)', fontWeight: 600 }}>{name}</span>
    </div>
  )
}
