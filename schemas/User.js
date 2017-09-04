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
  }
`

module.exports = User
