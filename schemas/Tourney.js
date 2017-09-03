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

  input NewTourney {
    name: String!
    description: String
    start_date: String
    amount_teams: Int
    user_id: Int!
    tourney_type_id: Int!
  }

  input EditTourney {
    name: String
    description: String
    start_date: String
    amount_teams: Int
  }
`
module.exports = Tourney
