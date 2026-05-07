export interface Team {
  code: string
  name: string
  flag: string        // emoji flag
  colors: [string, string]  // primary, secondary
  confed: string
}

export const TEAMS: Record<string, Team> = {
  // Group A
  MEX: { code: 'MEX', name: 'Mexico',                  flag: '🇲🇽', colors: ['#006847','#CE1126'], confed: 'CONCACAF' },
  RSA: { code: 'RSA', name: 'South Africa',             flag: '🇿🇦', colors: ['#007A4D','#FFB612'], confed: 'CAF' },
  KOR: { code: 'KOR', name: 'South Korea',              flag: '🇰🇷', colors: ['#003478','#C60C30'], confed: 'AFC' },
  CZE: { code: 'CZE', name: 'Czech Republic',           flag: '🇨🇿', colors: ['#D7141A','#11457E'], confed: 'UEFA' },

  // Group B
  CAN: { code: 'CAN', name: 'Canada',                   flag: '🇨🇦', colors: ['#FF0000','#FFFFFF'], confed: 'CONCACAF' },
  BIH: { code: 'BIH', name: 'Bosnia & Herzegovina',     flag: '🇧🇦', colors: ['#002395','#FECB00'], confed: 'UEFA' },
  QAT: { code: 'QAT', name: 'Qatar',                    flag: '🇶🇦', colors: ['#8D1B3D','#FFFFFF'], confed: 'AFC' },
  SUI: { code: 'SUI', name: 'Switzerland',              flag: '🇨🇭', colors: ['#FF0000','#FFFFFF'], confed: 'UEFA' },

  // Group C
  BRA: { code: 'BRA', name: 'Brazil',                   flag: '🇧🇷', colors: ['#FFDF00','#009C3B'], confed: 'CONMEBOL' },
  MAR: { code: 'MAR', name: 'Morocco',                  flag: '🇲🇦', colors: ['#C1272D','#006233'], confed: 'CAF' },
  HAI: { code: 'HAI', name: 'Haiti',                    flag: '🇭🇹', colors: ['#00209F','#D21034'], confed: 'CONCACAF' },
  SCO: { code: 'SCO', name: 'Scotland',                 flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', colors: ['#003DA5','#FFFFFF'], confed: 'UEFA' },

  // Group D
  USA: { code: 'USA', name: 'USA',                      flag: '🇺🇸', colors: ['#002868','#BF0A30'], confed: 'CONCACAF' },
  PAR: { code: 'PAR', name: 'Paraguay',                 flag: '🇵🇾', colors: ['#D52B1E','#002395'], confed: 'CONMEBOL' },
  AUS: { code: 'AUS', name: 'Australia',                flag: '🇦🇺', colors: ['#FFCC00','#00008B'], confed: 'AFC' },
  TUR: { code: 'TUR', name: 'Turkey',                   flag: '🇹🇷', colors: ['#E30A17','#FFFFFF'], confed: 'UEFA' },

  // Group E
  GER: { code: 'GER', name: 'Germany',                  flag: '🇩🇪', colors: ['#000000','#DD0000'], confed: 'UEFA' },
  ECU: { code: 'ECU', name: 'Ecuador',                  flag: '🇪🇨', colors: ['#FFD100','#003087'], confed: 'CONMEBOL' },
  CIV: { code: 'CIV', name: "Côte d'Ivoire",            flag: '🇨🇮', colors: ['#F77F00','#009A44'], confed: 'CAF' },
  CUW: { code: 'CUW', name: 'Curaçao',                  flag: '🇨🇼', colors: ['#002B7F','#F9E300'], confed: 'CONCACAF' },

  // Group F
  NED: { code: 'NED', name: 'Netherlands',              flag: '🇳🇱', colors: ['#FF6600','#FFFFFF'], confed: 'UEFA' },
  JPN: { code: 'JPN', name: 'Japan',                    flag: '🇯🇵', colors: ['#BC002D','#FFFFFF'], confed: 'AFC' },
  SWE: { code: 'SWE', name: 'Sweden',                   flag: '🇸🇪', colors: ['#006AA7','#FECC02'], confed: 'UEFA' },
  TUN: { code: 'TUN', name: 'Tunisia',                  flag: '🇹🇳', colors: ['#E70013','#FFFFFF'], confed: 'CAF' },

  // Group G
  BEL: { code: 'BEL', name: 'Belgium',                  flag: '🇧🇪', colors: ['#000000','#ED2939'], confed: 'UEFA' },
  EGY: { code: 'EGY', name: 'Egypt',                    flag: '🇪🇬', colors: ['#CE1126','#FFFFFF'], confed: 'CAF' },
  IRI: { code: 'IRI', name: 'Iran',                     flag: '🇮🇷', colors: ['#239F40','#FFFFFF'], confed: 'AFC' },
  NZL: { code: 'NZL', name: 'New Zealand',              flag: '🇳🇿', colors: ['#00247D','#CC142B'], confed: 'OFC' },

  // Group H
  ESP: { code: 'ESP', name: 'Spain',                    flag: '🇪🇸', colors: ['#AA151B','#F1BF00'], confed: 'UEFA' },
  CPV: { code: 'CPV', name: 'Cape Verde',               flag: '🇨🇻', colors: ['#003893','#CF2027'], confed: 'CAF' },
  SAU: { code: 'SAU', name: 'Saudi Arabia',             flag: '🇸🇦', colors: ['#006C35','#FFFFFF'], confed: 'AFC' },
  URU: { code: 'URU', name: 'Uruguay',                  flag: '🇺🇾', colors: ['#75AADB','#FFFFFF'], confed: 'CONMEBOL' },

  // Group I
  FRA: { code: 'FRA', name: 'France',                   flag: '🇫🇷', colors: ['#002395','#FFFFFF'], confed: 'UEFA' },
  SEN: { code: 'SEN', name: 'Senegal',                  flag: '🇸🇳', colors: ['#00853F','#FDEF42'], confed: 'CAF' },
  IRQ: { code: 'IRQ', name: 'Iraq',                     flag: '🇮🇶', colors: ['#CE1126','#007A3D'], confed: 'AFC' },
  NOR: { code: 'NOR', name: 'Norway',                   flag: '🇳🇴', colors: ['#EF2B2D','#003087'], confed: 'UEFA' },

  // Group J
  ARG: { code: 'ARG', name: 'Argentina',                flag: '🇦🇷', colors: ['#75AADB','#FFFFFF'], confed: 'CONMEBOL' },
  ALG: { code: 'ALG', name: 'Algeria',                  flag: '🇩🇿', colors: ['#006233','#D21034'], confed: 'CAF' },
  AUT: { code: 'AUT', name: 'Austria',                  flag: '🇦🇹', colors: ['#ED2939','#FFFFFF'], confed: 'UEFA' },
  JOR: { code: 'JOR', name: 'Jordan',                   flag: '🇯🇴', colors: ['#007A3D','#FFFFFF'], confed: 'AFC' },

  // Group K
  POR: { code: 'POR', name: 'Portugal',                 flag: '🇵🇹', colors: ['#006600','#FF0000'], confed: 'UEFA' },
  COD: { code: 'COD', name: 'DR Congo',                 flag: '🇨🇩', colors: ['#007FFF','#F7D500'], confed: 'CAF' },
  UZB: { code: 'UZB', name: 'Uzbekistan',               flag: '🇺🇿', colors: ['#1EB53A','#FFFFFF'], confed: 'AFC' },
  COL: { code: 'COL', name: 'Colombia',                 flag: '🇨🇴', colors: ['#FCD116','#003087'], confed: 'CONMEBOL' },

  // Group L
  ENG: { code: 'ENG', name: 'England',                  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', colors: ['#FFFFFF','#CE1126'], confed: 'UEFA' },
  CRO: { code: 'CRO', name: 'Croatia',                  flag: '🇭🇷', colors: ['#FF0000','#FFFFFF'], confed: 'UEFA' },
  GHA: { code: 'GHA', name: 'Ghana',                    flag: '🇬🇭', colors: ['#006B3F','#FCD116'], confed: 'CAF' },
  PAN: { code: 'PAN', name: 'Panama',                   flag: '🇵🇦', colors: ['#DA121A','#003893'], confed: 'CONCACAF' },
}
