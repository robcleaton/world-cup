export interface Match {
  id: string
  group?: string
  round: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'final' | '3rd'
  home: string
  away: string
  date: string      // ISO string
  venue: string
  city: string
  homeScore?: number
  awayScore?: number
  status: 'scheduled' | 'live' | 'finished'
  minute?: number
  apiId?: number
}

export interface Group {
  id: string
  name: string
  teams: string[]
}

export const GROUPS: Group[] = [
  { id: 'A', name: 'Group A', teams: ['MEX', 'RSA', 'KOR', 'CZE'] },
  { id: 'B', name: 'Group B', teams: ['CAN', 'BIH', 'QAT', 'SUI'] },
  { id: 'C', name: 'Group C', teams: ['BRA', 'MAR', 'HAI', 'SCO'] },
  { id: 'D', name: 'Group D', teams: ['USA', 'PAR', 'AUS', 'TUR'] },
  { id: 'E', name: 'Group E', teams: ['GER', 'ECU', 'CIV', 'CUW'] },
  { id: 'F', name: 'Group F', teams: ['NED', 'JPN', 'SWE', 'TUN'] },
  { id: 'G', name: 'Group G', teams: ['BEL', 'EGY', 'IRI', 'NZL'] },
  { id: 'H', name: 'Group H', teams: ['ESP', 'CPV', 'SAU', 'URU'] },
  { id: 'I', name: 'Group I', teams: ['FRA', 'SEN', 'IRQ', 'NOR'] },
  { id: 'J', name: 'Group J', teams: ['ARG', 'ALG', 'AUT', 'JOR'] },
  { id: 'K', name: 'Group K', teams: ['POR', 'COD', 'UZB', 'COL'] },
  { id: 'L', name: 'Group L', teams: ['ENG', 'CRO', 'GHA', 'PAN'] },
]

export const GROUP_STAGE_MATCHES: Match[] = [
  // Group A — Mexico, South Africa, South Korea, Czech Republic
  { id: 'A1', group: 'A', round: 'group', home: 'MEX', away: 'RSA', date: '2026-06-11T19:00:00-05:00', venue: 'Estadio Azteca',       city: 'Mexico City', status: 'scheduled' },
  { id: 'A2', group: 'A', round: 'group', home: 'KOR', away: 'CZE', date: '2026-06-11T15:00:00-05:00', venue: 'Estadio Akron',        city: 'Zapopan',     status: 'scheduled' },
  { id: 'A3', group: 'A', round: 'group', home: 'CZE', away: 'RSA', date: '2026-06-18T16:00:00-04:00', venue: 'Mercedes-Benz Stadium', city: 'Atlanta',     status: 'scheduled' },
  { id: 'A4', group: 'A', round: 'group', home: 'MEX', away: 'KOR', date: '2026-06-18T19:00:00-05:00', venue: 'Estadio Akron',        city: 'Zapopan',     status: 'scheduled' },
  { id: 'A5', group: 'A', round: 'group', home: 'CZE', away: 'MEX', date: '2026-06-24T19:00:00-05:00', venue: 'Estadio Azteca',       city: 'Mexico City', status: 'scheduled' },
  { id: 'A6', group: 'A', round: 'group', home: 'RSA', away: 'KOR', date: '2026-06-24T19:00:00-05:00', venue: 'Estadio BBVA',         city: 'Monterrey',   status: 'scheduled' },

  // Group B — Canada, Bosnia & Herzegovina, Qatar, Switzerland
  { id: 'B1', group: 'B', round: 'group', home: 'CAN', away: 'BIH', date: '2026-06-12T16:00:00-04:00', venue: 'BMO Field',            city: 'Toronto',      status: 'scheduled' },
  { id: 'B2', group: 'B', round: 'group', home: 'QAT', away: 'SUI', date: '2026-06-13T16:00:00-07:00', venue: "Levi's Stadium",       city: 'Santa Clara',  status: 'scheduled' },
  { id: 'B3', group: 'B', round: 'group', home: 'SUI', away: 'BIH', date: '2026-06-18T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',    status: 'scheduled' },
  { id: 'B4', group: 'B', round: 'group', home: 'CAN', away: 'QAT', date: '2026-06-18T20:00:00-07:00', venue: 'BC Place',             city: 'Vancouver',    status: 'scheduled' },
  { id: 'B5', group: 'B', round: 'group', home: 'SUI', away: 'CAN', date: '2026-06-24T20:00:00-07:00', venue: 'BC Place',             city: 'Vancouver',    status: 'scheduled' },
  { id: 'B6', group: 'B', round: 'group', home: 'BIH', away: 'QAT', date: '2026-06-24T20:00:00-07:00', venue: 'Lumen Field',          city: 'Seattle',      status: 'scheduled' },

  // Group C — Brazil, Morocco, Haiti, Scotland
  { id: 'C1', group: 'C', round: 'group', home: 'BRA', away: 'MAR', date: '2026-06-13T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'C2', group: 'C', round: 'group', home: 'HAI', away: 'SCO', date: '2026-06-13T12:00:00-04:00', venue: 'Gillette Stadium',     city: 'Foxborough',   status: 'scheduled' },
  { id: 'C3', group: 'C', round: 'group', home: 'SCO', away: 'MAR', date: '2026-06-19T12:00:00-04:00', venue: 'Gillette Stadium',     city: 'Foxborough',   status: 'scheduled' },
  { id: 'C4', group: 'C', round: 'group', home: 'BRA', away: 'HAI', date: '2026-06-19T16:00:00-04:00', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'scheduled' },
  { id: 'C5', group: 'C', round: 'group', home: 'SCO', away: 'BRA', date: '2026-06-24T16:00:00-04:00', venue: 'Hard Rock Stadium',    city: 'Miami Gardens', status: 'scheduled' },
  { id: 'C6', group: 'C', round: 'group', home: 'MAR', away: 'HAI', date: '2026-06-24T16:00:00-04:00', venue: 'Mercedes-Benz Stadium', city: 'Atlanta',     status: 'scheduled' },

  // Group D — USA, Paraguay, Australia, Turkey
  { id: 'D1', group: 'D', round: 'group', home: 'USA', away: 'PAR', date: '2026-06-12T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',    status: 'scheduled' },
  { id: 'D2', group: 'D', round: 'group', home: 'AUS', away: 'TUR', date: '2026-06-13T20:00:00-07:00', venue: 'BC Place',             city: 'Vancouver',    status: 'scheduled' },
  { id: 'D3', group: 'D', round: 'group', home: 'USA', away: 'AUS', date: '2026-06-19T20:00:00-07:00', venue: 'Lumen Field',          city: 'Seattle',      status: 'scheduled' },
  { id: 'D4', group: 'D', round: 'group', home: 'TUR', away: 'PAR', date: '2026-06-19T16:00:00-07:00', venue: "Levi's Stadium",       city: 'Santa Clara',  status: 'scheduled' },
  { id: 'D5', group: 'D', round: 'group', home: 'TUR', away: 'USA', date: '2026-06-25T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',    status: 'scheduled' },
  { id: 'D6', group: 'D', round: 'group', home: 'PAR', away: 'AUS', date: '2026-06-25T20:00:00-07:00', venue: "Levi's Stadium",       city: 'Santa Clara',  status: 'scheduled' },

  // Group E — Germany, Ecuador, Côte d'Ivoire, Curaçao
  { id: 'E1', group: 'E', round: 'group', home: 'GER', away: 'CUW', date: '2026-06-14T16:00:00-05:00', venue: 'NRG Stadium',          city: 'Houston',      status: 'scheduled' },
  { id: 'E2', group: 'E', round: 'group', home: 'CIV', away: 'ECU', date: '2026-06-14T16:00:00-04:00', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'scheduled' },
  { id: 'E3', group: 'E', round: 'group', home: 'GER', away: 'CIV', date: '2026-06-20T16:00:00-04:00', venue: 'BMO Field',            city: 'Toronto',      status: 'scheduled' },
  { id: 'E4', group: 'E', round: 'group', home: 'ECU', away: 'CUW', date: '2026-06-20T16:00:00-05:00', venue: 'Arrowhead Stadium',    city: 'Kansas City',  status: 'scheduled' },
  { id: 'E5', group: 'E', round: 'group', home: 'CUW', away: 'CIV', date: '2026-06-25T16:00:00-04:00', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'scheduled' },
  { id: 'E6', group: 'E', round: 'group', home: 'ECU', away: 'GER', date: '2026-06-25T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },

  // Group F — Netherlands, Japan, Sweden, Tunisia
  { id: 'F1', group: 'F', round: 'group', home: 'NED', away: 'JPN', date: '2026-06-14T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',    status: 'scheduled' },
  { id: 'F2', group: 'F', round: 'group', home: 'SWE', away: 'TUN', date: '2026-06-14T19:00:00-05:00', venue: 'Estadio BBVA',         city: 'Monterrey',    status: 'scheduled' },
  { id: 'F3', group: 'F', round: 'group', home: 'NED', away: 'SWE', date: '2026-06-20T16:00:00-05:00', venue: 'NRG Stadium',          city: 'Houston',      status: 'scheduled' },
  { id: 'F4', group: 'F', round: 'group', home: 'TUN', away: 'JPN', date: '2026-06-20T19:00:00-05:00', venue: 'Estadio BBVA',         city: 'Monterrey',    status: 'scheduled' },
  { id: 'F5', group: 'F', round: 'group', home: 'JPN', away: 'SWE', date: '2026-06-25T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',    status: 'scheduled' },
  { id: 'F6', group: 'F', round: 'group', home: 'TUN', away: 'NED', date: '2026-06-25T16:00:00-05:00', venue: 'Arrowhead Stadium',    city: 'Kansas City',  status: 'scheduled' },

  // Group G — Belgium, Egypt, Iran, New Zealand
  { id: 'G1', group: 'G', round: 'group', home: 'BEL', away: 'EGY', date: '2026-06-15T20:00:00-07:00', venue: 'Lumen Field',          city: 'Seattle',      status: 'scheduled' },
  { id: 'G2', group: 'G', round: 'group', home: 'IRI', away: 'NZL', date: '2026-06-15T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',    status: 'scheduled' },
  { id: 'G3', group: 'G', round: 'group', home: 'BEL', away: 'IRI', date: '2026-06-21T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',    status: 'scheduled' },
  { id: 'G4', group: 'G', round: 'group', home: 'NZL', away: 'EGY', date: '2026-06-21T20:00:00-07:00', venue: 'BC Place',             city: 'Vancouver',    status: 'scheduled' },
  { id: 'G5', group: 'G', round: 'group', home: 'EGY', away: 'IRI', date: '2026-06-26T20:00:00-07:00', venue: 'Lumen Field',          city: 'Seattle',      status: 'scheduled' },
  { id: 'G6', group: 'G', round: 'group', home: 'NZL', away: 'BEL', date: '2026-06-26T20:00:00-07:00', venue: 'BC Place',             city: 'Vancouver',    status: 'scheduled' },

  // Group H — Spain, Cape Verde, Saudi Arabia, Uruguay
  { id: 'H1', group: 'H', round: 'group', home: 'ESP', away: 'CPV', date: '2026-06-15T16:00:00-04:00', venue: 'Mercedes-Benz Stadium', city: 'Atlanta',     status: 'scheduled' },
  { id: 'H2', group: 'H', round: 'group', home: 'SAU', away: 'URU', date: '2026-06-15T16:00:00-04:00', venue: 'Hard Rock Stadium',    city: 'Miami Gardens', status: 'scheduled' },
  { id: 'H3', group: 'H', round: 'group', home: 'ESP', away: 'SAU', date: '2026-06-21T16:00:00-04:00', venue: 'Mercedes-Benz Stadium', city: 'Atlanta',     status: 'scheduled' },
  { id: 'H4', group: 'H', round: 'group', home: 'URU', away: 'CPV', date: '2026-06-21T16:00:00-04:00', venue: 'Hard Rock Stadium',    city: 'Miami Gardens', status: 'scheduled' },
  { id: 'H5', group: 'H', round: 'group', home: 'CPV', away: 'SAU', date: '2026-06-26T16:00:00-05:00', venue: 'NRG Stadium',          city: 'Houston',      status: 'scheduled' },
  { id: 'H6', group: 'H', round: 'group', home: 'URU', away: 'ESP', date: '2026-06-26T19:00:00-05:00', venue: 'Estadio Akron',        city: 'Zapopan',      status: 'scheduled' },

  // Group I — France, Senegal, Iraq, Norway
  { id: 'I1', group: 'I', round: 'group', home: 'FRA', away: 'SEN', date: '2026-06-16T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'I2', group: 'I', round: 'group', home: 'IRQ', away: 'NOR', date: '2026-06-16T12:00:00-04:00', venue: 'Gillette Stadium',     city: 'Foxborough',   status: 'scheduled' },
  { id: 'I3', group: 'I', round: 'group', home: 'FRA', away: 'IRQ', date: '2026-06-22T16:00:00-04:00', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'scheduled' },
  { id: 'I4', group: 'I', round: 'group', home: 'NOR', away: 'SEN', date: '2026-06-22T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'I5', group: 'I', round: 'group', home: 'NOR', away: 'FRA', date: '2026-06-26T12:00:00-04:00', venue: 'Gillette Stadium',     city: 'Foxborough',   status: 'scheduled' },
  { id: 'I6', group: 'I', round: 'group', home: 'SEN', away: 'IRQ', date: '2026-06-26T16:00:00-04:00', venue: 'BMO Field',            city: 'Toronto',      status: 'scheduled' },

  // Group J — Argentina, Algeria, Austria, Jordan
  { id: 'J1', group: 'J', round: 'group', home: 'ARG', away: 'ALG', date: '2026-06-16T16:00:00-05:00', venue: 'Arrowhead Stadium',    city: 'Kansas City',  status: 'scheduled' },
  { id: 'J2', group: 'J', round: 'group', home: 'AUT', away: 'JOR', date: '2026-06-16T16:00:00-07:00', venue: "Levi's Stadium",       city: 'Santa Clara',  status: 'scheduled' },
  { id: 'J3', group: 'J', round: 'group', home: 'ARG', away: 'AUT', date: '2026-06-22T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',    status: 'scheduled' },
  { id: 'J4', group: 'J', round: 'group', home: 'JOR', away: 'ALG', date: '2026-06-22T16:00:00-07:00', venue: "Levi's Stadium",       city: 'Santa Clara',  status: 'scheduled' },
  { id: 'J5', group: 'J', round: 'group', home: 'ALG', away: 'AUT', date: '2026-06-27T16:00:00-05:00', venue: 'Arrowhead Stadium',    city: 'Kansas City',  status: 'scheduled' },
  { id: 'J6', group: 'J', round: 'group', home: 'JOR', away: 'ARG', date: '2026-06-27T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',    status: 'scheduled' },

  // Group K — Portugal, DR Congo, Uzbekistan, Colombia
  { id: 'K1', group: 'K', round: 'group', home: 'POR', away: 'COD', date: '2026-06-17T16:00:00-05:00', venue: 'NRG Stadium',          city: 'Houston',      status: 'scheduled' },
  { id: 'K2', group: 'K', round: 'group', home: 'UZB', away: 'COL', date: '2026-06-17T19:00:00-05:00', venue: 'Estadio Azteca',       city: 'Mexico City',  status: 'scheduled' },
  { id: 'K3', group: 'K', round: 'group', home: 'POR', away: 'UZB', date: '2026-06-23T16:00:00-05:00', venue: 'NRG Stadium',          city: 'Houston',      status: 'scheduled' },
  { id: 'K4', group: 'K', round: 'group', home: 'COL', away: 'COD', date: '2026-06-23T19:00:00-05:00', venue: 'Estadio Akron',        city: 'Zapopan',      status: 'scheduled' },
  { id: 'K5', group: 'K', round: 'group', home: 'COL', away: 'POR', date: '2026-06-27T16:00:00-04:00', venue: 'Hard Rock Stadium',    city: 'Miami Gardens', status: 'scheduled' },
  { id: 'K6', group: 'K', round: 'group', home: 'COD', away: 'UZB', date: '2026-06-27T16:00:00-04:00', venue: 'Mercedes-Benz Stadium', city: 'Atlanta',     status: 'scheduled' },

  // Group L — England, Croatia, Ghana, Panama
  { id: 'L1', group: 'L', round: 'group', home: 'ENG', away: 'CRO', date: '2026-06-17T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',    status: 'scheduled' },
  { id: 'L2', group: 'L', round: 'group', home: 'GHA', away: 'PAN', date: '2026-06-17T16:00:00-04:00', venue: 'BMO Field',            city: 'Toronto',      status: 'scheduled' },
  { id: 'L3', group: 'L', round: 'group', home: 'ENG', away: 'GHA', date: '2026-06-23T12:00:00-04:00', venue: 'Gillette Stadium',     city: 'Foxborough',   status: 'scheduled' },
  { id: 'L4', group: 'L', round: 'group', home: 'PAN', away: 'CRO', date: '2026-06-23T16:00:00-04:00', venue: 'BMO Field',            city: 'Toronto',      status: 'scheduled' },
  { id: 'L5', group: 'L', round: 'group', home: 'PAN', away: 'ENG', date: '2026-06-27T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'L6', group: 'L', round: 'group', home: 'CRO', away: 'GHA', date: '2026-06-27T16:00:00-04:00', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'scheduled' },
]

export const KNOCKOUT_MATCHES: Match[] = [
  // Round of 32 (32 teams: 12 group winners + 12 runners-up + 8 best 3rd place)
  { id: 'R32-1',  round: 'r32', home: '1A', away: '3B/C/D',  date: '2026-06-30T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'R32-2',  round: 'r32', home: '1C', away: '3A/B/F',  date: '2026-06-30T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',       status: 'scheduled' },
  { id: 'R32-3',  round: 'r32', home: '1B', away: '3A/C/F',  date: '2026-07-01T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',       status: 'scheduled' },
  { id: 'R32-4',  round: 'r32', home: '1D', away: '3B/C/E',  date: '2026-07-01T16:00:00-04:00', venue: 'Gillette Stadium',     city: 'Foxborough',      status: 'scheduled' },
  { id: 'R32-5',  round: 'r32', home: '2B', away: '2D',      date: '2026-07-02T16:00:00-04:00', venue: 'Hard Rock Stadium',    city: 'Miami Gardens',   status: 'scheduled' },
  { id: 'R32-6',  round: 'r32', home: '2A', away: '2C',      date: '2026-07-02T16:00:00-05:00', venue: 'NRG Stadium',          city: 'Houston',         status: 'scheduled' },
  { id: 'R32-7',  round: 'r32', home: '1E', away: '3A/B/D',  date: '2026-07-03T16:00:00-04:00', venue: 'Lincoln Financial Field', city: 'Philadelphia', status: 'scheduled' },
  { id: 'R32-8',  round: 'r32', home: '1G', away: '3C/E/F',  date: '2026-07-03T16:00:00-05:00', venue: 'Arrowhead Stadium',    city: 'Kansas City',     status: 'scheduled' },
  { id: 'R32-9',  round: 'r32', home: '2E', away: '2G',      date: '2026-07-04T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',       status: 'scheduled' },
  { id: 'R32-10', round: 'r32', home: '2F', away: '2H',      date: '2026-07-04T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'R32-11', round: 'r32', home: '1F', away: '3A/C/D',  date: '2026-07-05T19:00:00-05:00', venue: 'Estadio Azteca',       city: 'Mexico City',     status: 'scheduled' },
  { id: 'R32-12', round: 'r32', home: '1H', away: '3A/B/G',  date: '2026-07-05T16:00:00-04:00', venue: 'Gillette Stadium',     city: 'Foxborough',      status: 'scheduled' },
  { id: 'R32-13', round: 'r32', home: '2I', away: '2K',      date: '2026-07-06T16:00:00-05:00', venue: 'NRG Stadium',          city: 'Houston',         status: 'scheduled' },
  { id: 'R32-14', round: 'r32', home: '2J', away: '2L',      date: '2026-07-06T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',       status: 'scheduled' },
  { id: 'R32-15', round: 'r32', home: '1I', away: '3G/H/L',  date: '2026-07-07T16:00:00-04:00', venue: 'Hard Rock Stadium',    city: 'Miami Gardens',   status: 'scheduled' },
  { id: 'R32-16', round: 'r32', home: '1K', away: '3I/J/L',  date: '2026-07-07T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',       status: 'scheduled' },

  // Round of 16
  { id: 'R16-1', round: 'r16', home: 'W R32-1',  away: 'W R32-2',  date: '2026-07-10T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'R16-2', round: 'r16', home: 'W R32-3',  away: 'W R32-4',  date: '2026-07-10T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',       status: 'scheduled' },
  { id: 'R16-3', round: 'r16', home: 'W R32-5',  away: 'W R32-6',  date: '2026-07-11T16:00:00-04:00', venue: 'Hard Rock Stadium',    city: 'Miami Gardens',   status: 'scheduled' },
  { id: 'R16-4', round: 'r16', home: 'W R32-7',  away: 'W R32-8',  date: '2026-07-11T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',       status: 'scheduled' },
  { id: 'R16-5', round: 'r16', home: 'W R32-9',  away: 'W R32-10', date: '2026-07-12T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',       status: 'scheduled' },
  { id: 'R16-6', round: 'r16', home: 'W R32-11', away: 'W R32-12', date: '2026-07-12T16:00:00-05:00', venue: 'NRG Stadium',          city: 'Houston',         status: 'scheduled' },
  { id: 'R16-7', round: 'r16', home: 'W R32-13', away: 'W R32-14', date: '2026-07-13T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'R16-8', round: 'r16', home: 'W R32-15', away: 'W R32-16', date: '2026-07-13T16:00:00-05:00', venue: 'Arrowhead Stadium',    city: 'Kansas City',     status: 'scheduled' },

  // Quarter-finals
  { id: 'QF-1', round: 'qf', home: 'W R16-1', away: 'W R16-2', date: '2026-07-17T16:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'QF-2', round: 'qf', home: 'W R16-3', away: 'W R16-4', date: '2026-07-17T20:00:00-07:00', venue: 'SoFi Stadium',         city: 'Inglewood',       status: 'scheduled' },
  { id: 'QF-3', round: 'qf', home: 'W R16-5', away: 'W R16-6', date: '2026-07-18T16:00:00-04:00', venue: 'Hard Rock Stadium',    city: 'Miami Gardens',   status: 'scheduled' },
  { id: 'QF-4', round: 'qf', home: 'W R16-7', away: 'W R16-8', date: '2026-07-18T16:00:00-05:00', venue: 'AT&T Stadium',         city: 'Arlington',       status: 'scheduled' },

  // Semi-finals
  { id: 'SF-1', round: 'sf', home: 'W QF-1', away: 'W QF-2', date: '2026-07-14T20:00:00-04:00', venue: 'MetLife Stadium',      city: 'East Rutherford', status: 'scheduled' },
  { id: 'SF-2', round: 'sf', home: 'W QF-3', away: 'W QF-4', date: '2026-07-15T20:00:00-07:00', venue: 'Rose Bowl',            city: 'Pasadena',        status: 'scheduled' },

  // Third place
  { id: '3RD',   round: '3rd',   home: 'L SF-1', away: 'L SF-2', date: '2026-07-18T20:00:00-04:00', venue: 'Hard Rock Stadium', city: 'Miami Gardens',   status: 'scheduled' },

  // Final
  { id: 'FINAL', round: 'final', home: 'W SF-1', away: 'W SF-2', date: '2026-07-19T20:00:00-04:00', venue: 'MetLife Stadium',   city: 'East Rutherford', status: 'scheduled' },
]

export const ALL_MATCHES = [...GROUP_STAGE_MATCHES, ...KNOCKOUT_MATCHES]

export const ROUND_LABELS: Record<Match['round'], string> = {
  group: 'Group Stage',
  r32: 'Round of 32',
  r16: 'Round of 16',
  qf: 'Quarter-finals',
  sf: 'Semi-finals',
  '3rd': 'Third Place',
  final: 'Final',
}
