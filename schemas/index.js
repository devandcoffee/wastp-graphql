const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const Tourney = require('./Tourney')
const User = require('./User')
const Player = require('./Player')
const Team = require('./Team')
const CommonTypes = require('./CommonTypes')

const rootQuery = `
  type Query {
    tourneysWithCursor(
      # Amount of tourneys to fetch
      first: Int!

      # Get records after this cursor
      after: String
    ): Tourneys

    tourney(id: Int!): Tourney

    users: [User]

    user: User

    tourneysTypes: [TourneyType]

    tourneyType(id: Int!): TourneyType

    players: [Player]

    player(id: Int!): Player
    teams: [Team]
    team(id: Int!): Team
  }

  type Mutation {
    createTourney(tourney: NewTourney): Tourney
    updateTourney(id: Int!, tourney: EditTourney): Tourney
    deleteTourney(id: Int!): Tourney
    createPlayer(player: NewPlayer): Player
    updatePlayer(id: Int!, player: EditPlayer): Player
    deletePlayer(id: Int!) : Player
    createTeam(team: NewTeam) : Team
    updateTeam(id: Int!, team: EditTeam) : Team
    deleteTeam(id: Int!) : Team
    signUp(user: NewUser, authData: AuthData): User
    signIn(authData: AuthData): SignInPayload
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Tourney, User, Player, Team, CommonTypes],
  resolvers
})

module.exports = schema
