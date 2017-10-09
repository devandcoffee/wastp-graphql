const Player = require('../models/Player')
const User = require('../models/User')
const Team = require('../models/Team')
const Tourney = require('../models/Tourney')
const { Status, Unauthorized, Forbidden, NotFound, BadRequest } = require('../utils')

const playerResolvers = {
  Query: {
    playersWithCursor: async (_, args) => {
      let cursor = args.after ? Buffer.from(args.after, 'base64').toString('ascii') : 'a'
      let limit = args.first ? args.first : 10

      //Get players
      const players = await Player.query().orderBy('email').where('email', '>', cursor).limit(limit).eager('[user, team]')

      //Fill edges array
      const edges = await players.map((player) => {
        return {
          cursor: Buffer.from(player.email).toString('base64'),
          node: player
        }
      })

      //Get total rows
      const total = await Player.query().count().first()

      //Calculate hasNextPage
      let hasNextPage = false
      let endCursor = players.length > 0 ? players[players.length - 1].email : ''
      if (endCursor) {
        const restRows = await Player.query().orderBy('email').where('email', '>', endCursor)
        endCursor = Buffer.from(endCursor).toString('base64')
        if(restRows.length > 0) {
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
    playersWithOffset: async (_, args) => {
      const players = await Player.query().orderBy('email').offset(args.offset * args.limit).limit(args.limit).eager('[user, team]')

      const total = await Player.query().count().first()

      return {
        players,
        metaInfo: {
          totalCount: total.count,
          currentPage: args.offset
        }
      }
    },
    player: (_, args, context) => Player.query().eager('[user, team]').findById(args.id)
  },
  Mutation: {
    createPlayer: async (_, args, context) => {
      if (context.user) {
        const team = await Team.query().eager('[user]').findById(args.player.team_id)
        if (team) {
          //Team owner create a player
          if (team.user.id === context.user.id) {
            args.player.status = Status.ACCEPTED
          }
          //Match a player with a valid user
          if (args.player.user_id) {
            const user = await User.query().findById(args.player.user_id)
            if (!user) {
              throw new Error(NotFound)
            }
          }
          return Player.query().eager('[user, team]').insert(args.player)
        }
        throw new Error(NotFound)
      }
      throw new Error(Unauthorized)
    },
    updatePlayer: async (_, args, context) => {
      if (context.user) {
        const player = await Player.query().eager('[user]').findById(args.id)
        if (player) {
          const team = await Team.query().eager('[user]').findById(player.team_id)
          if (context.user.id === team.user.id) {
            //Match a player with a valid user
            if (args.player.user_id) {
              const user = await User.query().findById(args.player.user_id)
              if (!user) {
                throw new Error(NotFound)
              }
            }
            args.player.updated_by = context.user.id
            return Player.query().eager('[user, team]').findById(args.id).patchAndFetchById(args.id, args.player)
          }
          throw Error(Forbidden)
        }
        throw Error(NotFound)
      }
      throw new Error(Unauthorized)
    },
    updatePlayerStats: async (_, args, context) => {
      if (context.user) {
        const player = await Player.query().eager('[team]').findById(args.id)
        if (player) {
          if (player.team && player.team.tourney_id && player.status === Status.ACCEPTED) {
              const tourney = await Tourney.query().eager('[user]').findById(player.team.tourney_id)
              if (context.user.id === tourney.user.id) {
                args.player.updated_by = context.user.id
                return Player.query().eager('[user, team]').findById(args.id).patchAndFetchById(args.id, args.player)
              }
              throw new Error(Forbidden)
          }
          throw new Error(BadRequest)
        }
        throw new Error(NotFound)
      }
      throw new Error(Unauthorized)
    },
    deletePlayer: async (_, args, context) => {
      if (context.user) {
        const player = await Player.query().eager('[user, team]').findById(args.id)
        if (player) {
          if (context.user.id === player.user.id) {
            await Player.query().where('id', args.id).softDelete()
            return player
          }
          throw Error(Forbidden)
        }
        throw Error(NotFound)
      }
      throw new Error(Unauthorized)
    }
  }
}

module.exports = playerResolvers
