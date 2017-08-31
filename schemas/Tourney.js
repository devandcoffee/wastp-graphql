const Tourney = `
  type Tourney {
    id: ID!
    name: String!
    description: String
    start_date: String
    amount_teams: Int
    tourney_type: TourneyType
  }

  type TourneyType {
    id: ID!
    name: String!
  }
`
module.exports = Tourney
