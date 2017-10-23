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
    deleted_at: String
  }

  input NewPlayer {
    team_id: Int!
    first_name: String!
    last_name: String!
    email: String
  }

  input NewTeamPlayer {
    first_name: String!
    last_name: String!
    email: String
  }

  input EditPlayer {
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
