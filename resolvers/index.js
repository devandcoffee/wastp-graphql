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
  }
}

module.exports = resolvers
