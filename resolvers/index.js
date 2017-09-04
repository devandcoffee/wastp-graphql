const Tourney = require('../models/Tourney')
const TourneyType = require('../models/TourneyType')
const User = require('../models/User')

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
    }
  }
}

module.exports = resolvers
