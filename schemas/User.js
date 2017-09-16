const User = `
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    avatar: String
    created_at: String
    updated_at: String
    tourneys: [Tourney]
    players: [Player]
  }

  type SignInPayload {
    token: String
    user: User
  }

  input NewUser {
    firstname: String!
    lastname: String!
  }

  input AuthData {
    email: String!
    password: String
  }
`

module.exports = User
