const Model = require('./CustomModel')
const path = require('path')

class Sport extends Model {
  static get tableName() {
    return 'sports'
  }

  static get relationMappings() {
    return {
      tourneys: {
        relation: Model.HasManyRelation,
        modelclass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'sports.id',
          to: 'tourneys.sport_id'
        }
      }
    }
  }
}
