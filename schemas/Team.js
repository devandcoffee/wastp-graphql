const Team = `
  type Teams {
    totalCount: Int
    edges: [TeamEdge]
    pageInfo: PageInfo!
  }

  type TeamsWithMeta {
    teams: [Team]
    metaInfo: MetaInfo
  }

  type TeamEdge {
    cursor: String!
    node: Team
  }

  type Team {
    id: ID!
    user: User
    tourney: Tourney
    players: [Player]
    name: String!
    description: String
    playersQty: Int
    shield: String
    status: Status
    wins: Int
    loses: Int
    ties: Int
    goalsInFavor: Int
    goalsAgainst: Int
    status: String
    created_at: String
    updated_at: String
  }

  input TeamMutation {
    name: String!
    description: String
    shield: String
  }

  input EditTeamStats {
    wins: Int
    loses: Int
    ties: Int
    goalsInFavor: Int
    goalsAgainst: Int
  }
`

module.exports = Team
