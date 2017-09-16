const Player = require('../models/Player')

const playerResolvers = {
  Query: {
    players: () => Player.query().eager('[user]'),
    player: (_, args) => Player.query().eager('[user]').findById(args.id),
  },
  Mutation: {
    createPlayer: (_, args, context) => {
      if (context.user) {
        return Player.query().eager('[user]').insert(args.player)
      }
      throw new Error(`User not authorized`)
    },
    updatePlayer: (_, args, context) => {
      if (context.user) {
        return Player.query().eager('[user]').patchAndFetchById(args.id, args.player)
      }
      throw new Error('User not authorized')
    },
    deletePlayer: (_, args, context) => {
      if (context.user) {
        return Player.query().eager('[user]').findById(args.id).then((player) => {
          return Player.query().where('id', args.id).softDelete().then(() => player)
        })
      }
      throw new Error('User not authorized');
    }
  }
}

module.exports = playerResolvers
