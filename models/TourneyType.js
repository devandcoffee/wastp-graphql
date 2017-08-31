const { Model } = require('objection')
const path = require('path')

class TourneyType extends Model {
  static get tableName() {
    return 'tourneys_types'
  }

  static get relationMappings() {
    return {
      tourneys: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'tourneys_types.id',
          to: 'tourneys.tourney_type_id'
        }
      }
    }
  }
}

module.exports = TourneyType
