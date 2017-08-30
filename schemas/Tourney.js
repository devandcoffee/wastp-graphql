module.exports = `
  type Tourney {
    id: ID!
    name: String!
    description: String
    startDate: String
    amountTeams: Int
    type: Tourneytype
  }

  type Tourneytype {
    id: ID!
    name: String!
  }
`
