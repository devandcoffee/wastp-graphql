const Tourney = require('../models/Tourney')
const TourneyType = require('../models/TourneyType')
const User = require('../models/User')
const services = require('../services')

const resolvers = {
  Query: {
    tourneys: () => Tourney.query().eager('[tourney_type, user]'),
    tourney: (_, args) => Tourney.query().eager('[tourney_type, user]').findById(args.id),
    users: () => User.query().eager('tourneys'),
    user: (_, args) => User.query().eager('tourneys').findById(args.id),
    tourneysTypes: () => TourneyType.query().eager('tourneys'),
    tourneyType: (_, args) => TourneyType.query().eager('tourneys').findById(args.id)
  },
  Mutation: {
    createTourney: (_, args) => {
      return Tourney.query().insert(args.tourney)
    },
    updateTourney: (_, args) => {
      return Tourney.query().patchAndFetchById(args.id, args.tourney)
    },
    deleteTourney: (_, args) => {
      return Tourney.query().findById(args.id).then((tourney) => {
        return Tourney.query().where('id', args.id).softDelete().then(() => tourney)
      })
    },
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

module.exports = resolvers
