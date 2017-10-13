const Model = require('./CustomModel')
const path = require('path')

class Field extends Model {
  static get tableName() {
    return 'fields'
  }

  static get relationMappings() {
    return {
      sportsCenter: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'SportsCenter'),
        join: {
          from: 'fields.sports_center_id',
          to: 'sports_centers.id'
        }
      }
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'Sports'),
        join: {
          from: 'fields.sport_id',
          to: 'sports.id'
        }
      }
    }
  }
}
