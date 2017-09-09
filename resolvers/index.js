const { merge } = require('lodash')
const userResolvers = require('./User')
const tourneyResolvers = require('./Tourney')

const resolvers = merge(userResolvers, tourneyResolvers)

module.exports = resolvers
