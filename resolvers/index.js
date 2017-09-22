const { merge } = require('lodash')
const userResolvers = require('./User')
const tourneyResolvers = require('./Tourney')
const playerResolvers = require('./Player')
const teamResolvers = require('./Team')

const resolvers = merge(userResolvers, tourneyResolvers, playerResolvers, teamResolvers)

module.exports = resolvers
