import type { Match } from '@/data/fixtures'
import { TEAMS } from '@/data/teams'

interface Props {
  matches: Match[]
}

interface BracketMatch {
  id: string
  home: string
  away: string
  homeScore?: number
  awayScore?: number
  status: Match['status']
  round: Match['round']
}

function TeamSlot({ code, score, isWinner }: { code: string; score?: number; isWinner?: boolean }) {
  const team = TEAMS[code]
  const isPlaceholder = !team

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 10px',
      background: isWinner ? 'rgba(244,196,48,0.08)' : 'transparent',
    }}>
      {team ? (
        <span style={{ fontSize: 16, lineHeight: 1 }}>{team.flag}</span>
      ) : (
        <div style={{ width: 20, height: 20, background: 'var(--border)', borderRadius: 3, flexShrink: 0 }} />
      )}
      <span style={{
        flex: 1,
        fontSize: 11,
        fontWeight: isPlaceholder ? 400 : 700,
        color: isPlaceholder ? 'var(--text-muted)' : (isWinner ? 'var(--gold)' : 'var(--text)'),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {isPlaceholder ? code : (team?.name.length > 12 ? code : team?.name)}
      </span>
      {score !== undefined && (
        <span style={{
          fontSize: 12,
          fontWeight: 800,
          color: isWinner ? 'var(--gold)' : 'var(--text-muted)',
          fontVariantNumeric: 'tabular-nums',
          minWidth: 14,
          textAlign: 'center',
        }}>{score}</span>
      )}
    </div>
  )
}

function BracketCard({ match }: { match: BracketMatch }) {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined

  const homeWins = isFinished && hasScore && match.homeScore! > match.awayScore!
  const awayWins = isFinished && hasScore && match.awayScore! > match.homeScore!

  return (
    <div style={{
      background: 'transparent',
      border: `1px solid ${isLive ? 'rgba(34,197,94,0.3)' : 'var(--border)'}`,
      borderRadius: 6,
      overflow: 'hidden',
      minWidth: 170,
      maxWidth: 200,
    }}>
      <TeamSlot code={match.home} score={match.homeScore} isWinner={homeWins} />
      <div style={{ height: 1, background: 'var(--border)' }} />
      <TeamSlot code={match.away} score={match.awayScore} isWinner={awayWins} />
    </div>
  )
}

function RoundCol({ label, matches, accent }: { label: string; matches: BracketMatch[]; accent?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      <div style={{
        padding: '6px 14px',
        fontSize: 9,
        fontWeight: 900,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: accent ?? 'var(--text-muted)',
        marginBottom: 12,
        whiteSpace: 'nowrap',
      }}>{label}</div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'space-around',
        flex: 1,
      }}>
        {matches.map(m => (
          <BracketCard key={m.id} match={m} />
        ))}
      </div>
    </div>
  )
}

export function KnockoutBracket({ matches }: Props) {
  const byRound = (round: Match['round']) =>
    matches.filter(m => m.round === round).map(m => ({
      id: m.id,
      home: m.home,
      away: m.away,
      homeScore: m.homeScore,
      awayScore: m.awayScore,
      status: m.status,
      round: m.round,
    }))

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 16 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', minWidth: 'max-content', padding: '0 4px' }}>
        <RoundCol label="Round of 32" matches={byRound('r32')} />
        <RoundCol label="Round of 16" matches={byRound('r16')} />
        <RoundCol label="Quarter-finals" matches={byRound('qf')} />
        <RoundCol label="Semi-finals" matches={byRound('sf')} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center' }}>
          <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
            Final
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {byRound('final').map(m => (
              <BracketCard key={m.id} match={m} />
            ))}
            {byRound('3rd').map(m => (
              <div key={m.id}>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 6, letterSpacing: '0.1em', textTransform: 'uppercase' }}>3rd Place</div>
                <BracketCard match={m} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
