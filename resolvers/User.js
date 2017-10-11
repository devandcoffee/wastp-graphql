const User = require('../models/User')
const services = require('../services')
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
    signUp: async (_, args) => {
      if (args.user) {
        try {
          const userRecord = await services.signUp(args.user)
          return User.query().insert({
            uid: userRecord.uid,
            email: userRecord.email
          })
        } catch (error) {
          return error
        }
      }
      throw new Error(BadRequest)
    }
  }
}

module.exports = userResolvers
