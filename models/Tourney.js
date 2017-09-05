const Model = require('./CustomModel')
const path = require('path')

class Tourney extends Model {

  static get tableName() {
    return 'tourneys'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'tourneys.user_id',
          to: 'users.id'
        }
      },
      tourney_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/TourneyType'),
        join: {
          from: 'tourneys.tourney_type_id',
          to: 'tourneys_types.id'
        }
      }
    }
  }
}

module.exports = Tourney
