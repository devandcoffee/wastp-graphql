const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const Tourney = require('./Tourney')
const User = require('./User')
const Player = require('./Player')

const rootQuery = `
  type Query {
    tourneys: [Tourney]
    tourney(id: Int!): Tourney
    users: [User]
    user: User
    tourneysTypes: [TourneyType]
    tourneyType(id: Int!): TourneyType
    players: [Player]
    player(id: Int!): Player
  }

  type Mutation {
    createTourney(tourney: NewTourney): Tourney
    updateTourney(id: Int!, tourney: EditTourney): Tourney
    deleteTourney(id: Int!): Tourney
    createPlayer(player: NewPlayer): Player
    updatePlayer(id: Int!, player: EditPlayer): Player
    deletePlayer(id: Int!) : Player
    signUp(user: NewUser, authData: AuthData): User
    signIn(authData: AuthData): SignInPayload
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Tourney, User, Player],
  resolvers
})

module.exports = schema
