const Model = require('./CustomModel')
const path = require('path')

class Team extends Model {
  static get tableName() {
    return 'teams'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'teams.user_id',
          to: 'users.id'
        }
      },
      tourney: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'teams.tourney_id',
          to: 'tourneys.id'
        }
      },
      players: {
        relation: Model.HasManyRelation,
        modelClass:path.join(__dirname, '/Player'),
        join: {
          from: 'teams.id',
          to: 'players.team_id'
        }
      },
      local_game: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Game'),
        join: {
          from: 'teams.id',
          to: 'games.local_id'
        }
      },
      visitant_game: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Game'),
        join: {
          from: 'teams.id',
          to: 'games.visitant_id'
        }
      }
    }
  }
}

module.exports = Team
