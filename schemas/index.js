const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const Tourney = require('./Tourney')
const User = require('./User')

const rootQuery = `
  type Query {
    tourneys: [Tourney]
    tourney(id: Int!): Tourney
    users: [User]
    user(id: Int!): User
    tourneysTypes: [TourneyType]
    tourneyType(id: Int!): TourneyType
  }

  type Mutation {
    createTourney(tourney: NewTourney): Tourney
    updateTourney(id: Int!, tourney: EditTourney): Tourney
    deleteTourney(id: Int!): Tourney
    signUp(user: NewUser, authData: AuthData): User
    signIn(authData: AuthData): SignInPayload
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Tourney, User],
  resolvers
})

module.exports = schema
