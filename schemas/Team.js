const Team = `
  type Team {
    id: ID!
    user: User
    tourney: Tourney
    players: [Player]
    name: String!
    description: String
    playersQty: Int
    shield: String
    wins: Int
    loses: Int
    ties: Int
    goalsInFavor: Int
    goalsAgainst: Int
    status: String
    created_at: String
    updated_at: String
  }

  input NewTeam {
    name: String!
    user_id: Int!
    description: String
    playersQty: String,
    shield: String
    wins: Int
    loses: Int
    ties: Int
    goalsInFavor: Int
    goalsAgainst: Int
    status: String
  }

  input EditTeam {
    name: String
    description: String
    playersQty: String,
    shield: String
    wins: Int
    loses: Int
    ties: Int
    goalsInFavor: Int
    goalsAgainst: Int
    status: String
  }
`

module.exports = Team
