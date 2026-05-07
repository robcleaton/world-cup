import { GROUPS } from '@/data/fixtures'
import type { Match } from '@/data/fixtures'
import { GroupTable } from './GroupTable'
import { MatchCard } from './MatchCard'

interface Props {
  matches: Match[]
}

export function GroupsView({ matches }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {GROUPS.map(group => {
        const groupMatches = matches.filter(m => m.group === group.id)
        return (
          <div key={group.id} className="group-section">
            <GroupTable group={group} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {groupMatches.map(m => (
                <MatchCard key={m.id} match={m} compact />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
