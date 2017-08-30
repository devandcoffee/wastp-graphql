const { makeExecutableSchema } = require('graphql-tools')
const Tourney = require('./Tourney')

const rootQuery = `
  type Query {
    tourneys: [Tourney]
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Tourney]
})

module.exports = schema
