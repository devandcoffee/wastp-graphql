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
    email: String
    status: String
    goals: Int
    wins: Int
    loses: Int
    ties: Int
    user_id: Int!
  }

  input EditPlayer {
    email: String
    status: String
    goals: Int
    wins: Int
    loses: Int
    ties: Int
  }
`

module.exports = Player