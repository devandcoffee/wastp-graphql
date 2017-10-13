const Model = require('./CustomModel')
const path = require('path')

class Fixture extends Model {
  static get tableName() {
    return 'fixtures'
  }

  static get relationMappings() {
    return {
      tourney: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'fixtures.tourney_id',
          to: 'tourneys.id'
        }
      }
    }
  }
}
