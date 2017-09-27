const Player = `
  type Players {
    totalCount: Int
    edges: [PlayerEdge]
    pageInfo: PageInfo!
  }

  type PlayerEdge {
    cursor: String!
    node: Player
  }

  type Player {
    id: ID!
    user: User
    team: Team
    email: String
    status: String
    goals: Int
    wins: Int
    loses: Int
    ties: Int
    created_at: String
    updated_at: String
  }

  input PlayerMutation {
    team_id: Int
    email: String
  }

  input EditPlayerStats {
    goals: Int
    wins: Int
    loses: Int
    ties: Int
  }
`

module.exports = Player
