const { merge } = require('lodash')
const userResolvers = require('./User')
const tourneyResolvers = require('./Tourney')
const playerResolvers = require('./Player')


const resolvers = merge(userResolvers, tourneyResolvers, playerResolvers)

module.exports = resolvers
