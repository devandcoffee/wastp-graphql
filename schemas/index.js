const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const Tourney = require('./Tourney')

const rootQuery = `
  type Query {
    tourneys: [Tourney]
    tourneysTypes: [TourneyType]
    tourneyType(id: Int!): TourneyType
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Tourney],
  resolvers
})

module.exports = schema
