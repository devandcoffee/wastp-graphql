const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const Tourney = require('./Tourney')
const User = require('./User')
const Player = require('./Player')
const Team = require('./Team')
const Fixture = require('./Fixture')
const Game = require('./Game')
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

    tourneySchedule(id: Int!): [Fixture]
  }

  type Mutation {
    createTourney(tourney: NewTourney): Tourney
    updateTourney(id: Int!, tourney: EditTourney): Tourney
    deleteTourney(id: Int!): Tourney
    createPlayer(player: NewPlayer): Player
    updatePlayer(id: Int!, player: EditPlayer): Player
    updatePlayerStats(id: Int!, player: EditPlayerStats): Player
    deletePlayer(id: Int!): Player
    createTeam(team: NewTeam): Team
    updateTeam(id: Int!, team: EditTeam): Team
    updateTeamStatus(id: Int!, status: Status): Team
    updateTeamStats(id: Int!, team: EditTeamStats): Team
    deleteTeam(id: Int!): Team
    signUp(user: NewUser): User
    createTourneySchedule(id: Int!): [Fixture]
    deleteTourneySchedule(id: Int!): [Fixture]
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Tourney, User, Player, Team, Fixture, Game, CommonTypes],
  resolvers
})

module.exports = schema
