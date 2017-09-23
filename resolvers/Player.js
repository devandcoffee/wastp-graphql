const Player = require('../models/Player')
const Team = require('../models/Team')
const { Unauthorized, Forbidden, NotFound } = require('../utils/errors')

const playerResolvers = {
  Query: {
    players: () => Player.query().eager('[user, team]'),
    player: (_, args, context) => Player.query().eager('[user, team]').findById(args.id)
  },
  Mutation: {
    createPlayer: async (_, args, context) => {
      if (context.user) {
        let player = args.player
        player.user_id = context.user.id
        if (player.team_id) {
          const team = await Team.query().eager('[user]').findById(player.team_id)
          if (team) {
              return Player.query().eager('[user, team]').insert(args.player)
          }
          throw new Error(NotFound)
        }
        return Player.query().eager('[user]').insert(args.player)
      }
      throw new Error(Unauthorized)
    },
    updatePlayer: async (_, args, context) => {
      if (context.user) {
        const player = await Player.query().eager('[user]').findById(args.id)
        if (player) {
          if (context.user.id === player.user.id) {
            if (args.team_id) {
              const team = await Team.query().eager('[user]').findById(player.team_id)
              if (team) {
                return Player.query().eager('[user, team]').findById(args.id).patchAndFetchById(args.id, args.player)
              }
              throw new Error(NotFound)
            }
            return Player.query().eager('[user]').findById(args.id).patchAndFetchById(args.id, args.player)
          }
          throw Error(Forbidden)
        }
        throw Error(NotFound)
      }
      throw new Error(Unauthorized)
    },
    updatePlayerStatus: async (_, args, context) => {
      if (context.user) {
        const player = await Player.query().eager('[user]').findById(args.id)
        if (player && player.team_id) {
          const team = await Team.query().eager('[user]').findById(player.team_id)
          if (context.user.id === team.user_id) {
            player.status = args.status
            return Player.query().eager('[user, team]').findById(args.id).patchAndFetchById(args.id, player)
          }
          throw new Error(Forbidden)
        }
        throw new Error(NotFound)
      }
      throw new Error(Unauthorized)
    }
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
