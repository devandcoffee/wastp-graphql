const Tourney = `
  type Tourney {
    id: ID!
    name: String!
    description: String
    start_date: String
    amount_teams: Int
    user: User
    tourney_type: TourneyType
  }

  type TourneyType {
    id: ID!
    name: String!
    tourneys: [Tourney]
  }
`
module.exports = Tourney
