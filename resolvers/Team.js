const { transaction } = require('objection')
const Team = require('../models/Team')
const Tourney = require('../models/Tourney')
const Player = require('../models/Player')
const { Status } = require('../data-helper')
const { Unauthorized, Forbidden, NotFound, BadRequest, ServerError} = require('../utils')

const teamResolvers = {
  Query: {
    teamsWithCursor: async (_, args) => {
      let cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 'a'

      //Get teams
      const teams = await Team.query().orderBy('name').where('name', '>', cursor).limit(args.first).eager('[user, tourney, players]')

      //Fill edges array
      const edges = await teams.map((team) => {
        return {
          cursor: Buffer.from(team.name).toString('base64'),
          node: team
        }
      })

      const total = await Team.query().count().first()

      //Calculate hasNextPage
      let hasNextPage = false
      let endCursor = teams.length > 0 ? teams[teams.length -1].name : ''
      if (endCursor) {
        const restRows = await Team.query().orderBy('name').where('name', '>', endCursor)
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
    teamsWithOffset: async (_, args) => {
      const teams = await Team.query().orderBy('name').offset(args.offset * args.limit).eager('[user, tourney, players]')

      const total = await Team.query().count().first()

      return {
        teams,
        metaInfo: {
          totalCount: total.count,
          currentPage: args.offset
        }
      }
    },
    team: (_, args) => Team.query().eager('[user, tourney, players]').findById(args.id),
  },
  Mutation: {
    createTeam: async (_, args, context) => {
      if (context.user) {
        const tourney = await Tourney.query().eager('[user, fixtures]').findById(args.team.tourney_id)
        if (tourney && tourney.fixtures.length === 0) {
          if (tourney.user_id === context.user.id) {
            //Team owner create a team
            args.team.status = Status.ACCEPTED
          } else {
            //Check if the user already have a team in the tourney
            var teams = await Team.query().eager('[user]').where('tourney_id', tourney.id)
            teams.forEach((team) => {
              if (team.user_id === context.user.id){
                throw new Error(BadRequest)
              }
            })
            //TODO: set properties of the current user in this new player
            var userPlayer = {
              //name: context.user.name,
              //team_id: context.user.last_name,
              email: context.user.email,
            }
            args.team.players.push(userPlayer)
          }
          try {
            const createdTeam = await transaction(Team.knex(), async (trx) => {
              args.team.user_id = context.user.id
              args.team.players_qty = args.team.players.length
              let team = await Team.query(trx).insert(args.team).returning('*')

              args.team.players.forEach((player) => {
                //Team owner is adding players so their status are ACCEPTED
                player.user_id = context.user.id
                player.team_id = team.id
                player.status = Status.ACCEPTED
              })
              team.players = await Player.query(trx).insert(args.team.players).returning('*')

              return team
            })
            return createdTeam
          } catch (exception) {
            throw new Error(ServerError)
          }
        }
        throw new Error(NotFound)
      }
      throw new Error(Unauthorized)
    },
    updateTeam: async (_, args, context) => {
      if (context.user) {
        const team = await Team.query().eager('[user]').findById(args.id)
        if (team) {
          if (context.user.id === team.user.id) {
            return Team.query().eager('[user, tourney, players]').patchAndFetchById(args.id, args.team)
          }
          throw new Error(Forbidden)
        }
        throw new Error(NotFound)
      }
      throw new Error(Unauthorized)
    },
    updateTeamStatus: async (_, args, context) => {
      if (context.user) {
        const team = await Team.query().findById(args.id)
        if (team) {
          const tourney = await Tourney.query().eager('[user]').findById(team.tourney_id)
          if (context.user.id === tourney.user_id) {
            team.status = args.status
            return Team.query().eager('[user, tourney, players]').findById(args.id).patchAndFetchById(args.id, team)
          }
          throw new Error(Forbidden)
        }
        throw new Error(NotFound)
      }
      throw new Error(Unauthorized)
    },
    updateTeamStats: async (_, args, context) => {
      if (context.user) {
        const team = await Team.query().eager('[tourney]').findById(args.id)
        if (team) {
          if (team.tourney && team.status === Status.ACCEPTED) {
            const tourney = await Tourney.query().eager('[user]').findById(team.tourney_id)
            if (context.user.id === tourney.user_id) {
              return Team.query().eager('[user, tourney, players]').findById(args.id).patchAndFetchById(args.id, args.team)
            }
            throw new Error(Forbidden)
          }
          throw new Error(BadRequest)
        }
        throw new Error(NotFound)
      }
      throw new Error(Unauthorized)
    },
    deleteTeam: async (_, args, context) => {
      if (context.user) {
        const team = await Team.query().eager('[user, tourney, players]').findById(args.id)
        if (team) {
          if (context.user.id === team.user.id) {
            await Team.query().where('id', args.id).softDelete()
            return team
          }
          throw new Error(Forbidden)
        }
        throw new Error(NotFound)
      }
      return new Error(Unauthorized)
    }
  }
}

module.exports = teamResolvers
