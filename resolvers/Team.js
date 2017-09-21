const Team = require('../models/Team')

const teamResolvers = {
  Query: {
    teams: () => Team.query().eager('[user, tourney, players]'),
    team: (_, args) => Team.query().eager('[user, tourney, players]').findById(args.id),
  },
  Mutation: {
    createTeam: (_, args, context) => {
      if (context.user){
        return Team.query().eager('[user, tourney, players]').insert(args.team)
      }
      throw new Error('User not authorized')
    },
    updateTeam: (_, args, context) => {
      if (context.user) {
        return Team.query().eager('[user, tourney, players]').patchAndFetchById(args.id, args.team)
      }
      throw new Error('User not authorized')
    },
    deleteTeam: (_, args, context) => {
      if (context.user) {
        return Team.query().eager('[user, tourney, players]').findById(args.id).then((team) => {
          return Team.query().where('id', args.id).softDelete().then(() => team)
        })
      }
      return new Error('User not authorized');
    }
  }
}

module.exports = teamResolvers
