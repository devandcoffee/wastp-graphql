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

    tourneysWithOffset(
      limit: Int!

      offset: Int!
    ): TourneysWithMeta

    tourney(id: Int!): Tourney

    users: [User]

    user: User

    tourneysTypes: [TourneyType]

    tourneyType(id: Int!): TourneyType

    playersWithCursor(
      #Amount of players to fetch
      first: Int!

      #Get records after this cursor
      after: String
    ): Players

    playersWithOffset(
      limit: Int!

      offset: Int!
    ): PlayersWithMeta

    player(id: Int!): Player

    teamsWithCursor (
      #Amount of teams to fetch
      first: Int!

      #Get records after this cursor
      after: String
    ): Teams

    teamsWithOffset (
      limit: Int!
      offset: Int!
    ): TeamsWithMeta

    team(id: Int!): Team
  }

  type Mutation {
    createTourney(tourney: NewTourney): Tourney
    updateTourney(id: Int!, tourney: EditTourney): Tourney
    deleteTourney(id: Int!): Tourney
    createPlayer(player: PlayerMutation): Player
    updatePlayer(id: Int!, player: PlayerMutation): Player
    updatePlayerStatus(id: Int!, status: Status): Player
    updatePlayerStats(id: Int!, player: EditPlayerStats): Player
    deletePlayer(id: Int!): Player
    createTeam(team: TeamMutation): Team
    updateTeam(id: Int!, team: TeamMutation): Team
    updateTeamStatus(id: Int!, status: Status): Team
    updateTeamStats(id: Int!, team: EditTeamStats): Team
    deleteTeam(id: Int!): Team
    signUp(user: NewUser, authData: AuthData): User
    signIn(authData: AuthData): SignInPayload
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Tourney, User, Player, Team, CommonTypes],
  resolvers
})

module.exports = schema
