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
      },
      games: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Game'),
        join: {
          from: 'fixtures.id',
          to: 'games.fixture_id'
        }
      }
    }
  }
}
