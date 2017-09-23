const Player = `
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

  input NewPlayer {
    team_id: Int
    email: String
  }

  input EditPlayer {
    team_id: Int
    email: String
  }
`

module.exports = Player
