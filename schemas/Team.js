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
    players_qty: Int
    shield: String
    status: Status
    wins: Int
    loses: Int
    ties: Int
    goals_in_favor: Int
    goals_against: Int
    status: String
    created_at: String
    updated_at: String
    deleted_at: String
  }

  input NewTeam {
    tourney_id: Int!
    name: String!
    players: [NewTeamPlayer!]!
    description: String
    shield: String
  }

  input EditTeam {
    name: String
    description: String
    shield: String
  }

  input EditTeamStats {
    wins: Int
    loses: Int
    ties: Int
    goals_in_favor: Int
    goals_against: Int
  }
`;

export default Team;
