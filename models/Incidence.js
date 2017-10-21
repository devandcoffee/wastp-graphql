const Model = require('./CustomModel')
const path = require('path')

class Incidence extends Model {
  static get tableName() {
    return 'incidences'
  }

  static get relationMappings() {
    return {
      incidence_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/IncidenceType'),
        join: {
          from: 'incidences.incidences_type_id',
          to: 'incidence_types.id'
        }
      },
      player: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Player'),
        join: {
          from: 'incidences.player_id',
          to: 'players.id'
        }
      }
    }
  }
}

module.exports = Incidence
