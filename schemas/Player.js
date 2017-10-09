const Player = `
  type Players {
    totalCount: Int
    edges: [PlayerEdge]
    pageInfo: PageInfo!
  }

  type PlayersWithMeta {
    players: [Player]
    metaInfo: MetaInfo
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
    first_name: String
    last_name: String
    status: Status
    scores: Int
    games: Int
    created_at: String
    updated_at: String
    updated_by: Int
  }

  input NewPlayer {
    team_id: Int!
    first_name: String!
    last_name: String!
    user_id: Int
    email: String
  }

  input EditPlayer {
    first_name: String
    last_name: String
    user_id: Int
    email: String
    status: Status
  }

  input EditPlayerStats {
    scores: Int
    games: Int
  }
`

module.exports = Player
