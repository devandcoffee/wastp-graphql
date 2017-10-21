const { transaction } = require('objection')
const Fixture = require('../models/Fixture')
const Tourney = require('../models/Tourney')
const Team = require('../models/Team')
const Game = require('../models/Game')
const { TourneyTypes, createSchedule } = require('../data-helper')
const { Unauthorized, Forbidden, NotFound, BadRequest, ServerError } = require('../utils')

const fixtureResolvers = {
  Query: {
    tourneySchedule: (_, args) => Fixture.query().where('tourney_id', args.id).eager('[games.[local_team, visitant_team]]')
  },
  Mutation: {
    createTourneySchedule: async (_, args, context) => {
    if (context.user) {
      const tourney = await Tourney.query().eager('[user, tourney_type, fixtures]').findById(args.id)
      if (tourney) {
        if (context.user.id === tourney.user.id) {
          const teams = await Team.query().where('tourney_id', args.id)
          if (tourney.fixtures.length === 0 && tourney.tourney_type.name === TourneyTypes.LEAGUE && teams.length > 1) {
            try {
              const tourneyFixtures = createSchedule(teams)
              await transaction(Fixture.knex(), async (trx) => {
                const tourneyFixturesLength = tourneyFixtures.length
                for (let i=0; i<tourneyFixturesLength; i++) {
                  await Fixture.query(trx).insertGraph({
                    name: i,
                    tourney_id: args.id,
                    games: tourneyFixtures[i]
                  })
                }
              })
              return Fixture.query().where('tourney_id', args.id).eager('[games.[local_team, visitant_team]]')
            } catch (exception) {
              console.log(exception);
              throw new Error(ServerError)
            }
          }
          throw new Error(BadRequest)
        }
        throw new Error(Forbidden)
      }
      throw new Error(NotFound)
    }
    throw new Error(Unauthorized)
  },
  deleteTourneySchedule: async (_, args, context) => {
    if (context.user) {
      var tourney = await Tourney.query().findById(args.id).eager('[user, fixtures]')
      if (tourney) {
        if (context.user.id === tourney.user.id) {
          if (tourney.fixtures.length > 0 ) {
            var scheduleDeleted = await Fixture.query().where('tourney_id', args.id).eager('[games]')
            await Fixture.query().where('tourney_id', args.id).delete()
            return scheduleDeleted
          }
          throw new Error(BadRequest)
        }
        throw new Error(Forbidden)
      }
      throw new Error(NotFound)
    }
    throw new Error(Unauthorized)
  }
 }
}

module.exports = fixtureResolvers
