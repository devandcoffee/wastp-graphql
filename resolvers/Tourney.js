const Tourney = require('../models/Tourney')
const TourneyType = require('../models/TourneyType')

const tourneyResolvers = {
  Query: {
    tourneys: (_, args) => {
      let cursor = args.after ? Buffer.from(args.after, 'base64 ').toString('ascii') : 'a'
      let limit = args.limit ? args.limit : 10

      const tourneys = await Tourney.query().where('name', '>', cursor).limit(limit).eager('[tourney_type, user]')
      const totalCount = await Tourney.query()
      console.log(tourneys)
    },
    tourney: (_, args) => Tourney.query().eager('[tourney_type, user]').findById(args.id),
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

module.exports = tourneyResolvers
