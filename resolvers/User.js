const User = require('../models/User')
const { Unauthorized, BadRequest } = require('../utils')

const userResolvers = {
  Query: {
    users: (_, args, context) => {
      if (context.user) {
        return User.query().eager('[tourneys, teams, players]')
      }
      throw new Error(Unauthorized)
    },
    user: (_, args, context) => {
      if (context.user) {
        return User.query().eager('[tourneys, teams, players]').findById(context.user.id)
      }
      throw new Error(Unauthorized)
    }
  },
  Mutation: {
    signUp: (_, args) => {
      if (args.user) return User.query().insert(args.user)
      throw new Error(BadRequest)
    }
  }
}

module.exports = userResolvers
