const Model = require('./CustomModel')
const path = require('path')

class IncidenceType extends Model {
  static get tableName() {
    return 'incidence_types'
  }

  static get relationMappings() {
    return {
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Sport'),
        join: {
          from: 'incidence_types.sport_id',
          to: 'sports.id'
        }
      }
      incidences: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Incidence'),
        join: {
          from: 'incidence_types.id',
          to: 'incidences.incidence_type_id'
        }
      }
    }
  }
}

module.exports = IncidenceType
