const Tourney = require('../models/Tourney')
const TourneyType = require('../models/TourneyType')

const tourneyResolvers = {
  Query: {
    tourneys: async (_, args) => {
      let cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 'a'
      let limit = args.limit ? args.limit : 10

      // Get tourneys
      const tourneys = await Tourney.query().orderBy('name').where('name', '>', cursor).limit(limit).eager('[tourney_type, user]')

      // Fill edges array
      const edges = await tourneys.map((tourney) => {
        return {
          cursor: Buffer.from(tourney.name).toString('base64'),
          node: tourney
        }
      })

      // Get total rows
      const total = await Tourney.query().count().first()

      // Calculate hasNextPage
      let hasNextPage = false
      let endCursor = tourneys.length > 0 ? tourneys[tourneys.length - 1].name : ''
      if (endCursor) {
        const restRows = await Tourney.query().orderBy('name').where('name', '>', endCursor)
        endCursor = Buffer.from(endCursor).toString('base64')
        if (restRows.length > 0) {
          hasNextPage = true
        }
      }

      return {
        totalCount: total.count,
        edges,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      }
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
