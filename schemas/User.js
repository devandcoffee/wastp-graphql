const User = `
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    avatar: String
    tourneys: [Tourney]
  }
`

module.exports = User
