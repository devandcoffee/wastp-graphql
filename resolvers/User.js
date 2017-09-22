const User = require('../models/User')
const services = require('../services')

const userResolvers = {
  Query: {
    users: (_, args, context) => {
      if (context.user) {
        return User.query().eager('[tourneys, teams, players]')
      }
      throw new Error(`User not authorized`)
    },
    user: (_, args, context) => {
      if (context.user) {
        return User.query().eager('[tourneys, teams, players]').findById(context.user.id)
      }
      throw new Error(`User not authorized`)
    }
  },
  Mutation: {
    signUp: (_, args) => {
      Object.assign(args.user, args.authData)
      args.user.avatar = 'http://www.gravatar.com/avatar/?s=200'
      return services.encryptPassword(args.user.password).then((hash) => {
        args.user.password = hash
        return User.query().insert(args.user)
      })
    },
    signIn: (_, args) => {
      const email = args.authData.email
      const password = args.authData.password
      return User.query().where('email', email).then((users) => {
        const user = users[0]
        return services.checkPassword(password, user.password).then((res) => {
          if (res) {
            return { token: services.createToken(user), user }
          }
        })
      })
    }
  }
}

module.exports = userResolvers
