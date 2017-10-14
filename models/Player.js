const Model = require('./CustomModel')
const path = require('path')

class Player extends Model {

  static get tableName() {
    return 'players'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'players.user_id',
          to: 'users.id'
        }
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Team'),
        join: {
          from: 'players.team_id',
          to: 'teams.id'
        }
      },
      incidences: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Incidence'),
        join: {
          from: 'players.id',
          to: 'incidences.player_id'
        }
      }
    }
  }
}

module.exports = Player
