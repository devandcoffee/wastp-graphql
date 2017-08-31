module.exports = `
  type Tourney {
    id: ID!
    name: String!
    description: String
    start_date: String
    amount_teams: Int
    type: Tourneytype
  }

  type Tourneytype {
    id: ID!
    name: String!
  }
`
