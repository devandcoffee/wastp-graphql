const User = `
  type User {
    id: ID!
    tourneys: [Tourney]
    teams: [Team]
    players: [Player]
    uid: String
    created_at: String
    updated_at: String
  }

  input NewUser {
    uid: String!
  }
`

module.exports = User
