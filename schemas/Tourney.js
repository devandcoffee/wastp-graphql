const Tourney = `
  type Tourney {
    id: ID!
    name: String!
    description: String
    start_date: String
    amount_teams: Int
    created_at: String
    updated_at: String
    user: User
    tourney_type: TourneyType
  }

  type TourneyType {
    id: ID!
    name: String!
    created_at: String
    updated_at: String
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
