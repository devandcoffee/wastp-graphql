const Tourney = require('../models/Tourney')
const TourneyType = require('../models/TourneyType')

const resolvers = {
  Query: {
    tourneys: () => Tourney.query().eager('tourney_type'),
    tourneysTypes: () => TourneyType.query(),
    tourneyType: (_, args) => TourneyType.query().findById(args.id)
  }
}

module.exports = resolvers
