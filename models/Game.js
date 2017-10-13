const Model = require('/CustomModel')
const path = require('path')

class Game extends Model {
  static get tableName() {
    return 'games'
  }

  static get relationMappings() {
    return {
      fixture: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Fixture'),
        join: {
          from: 'games.tourney_id',
          to: 'tourneys.id'
        }
      },
      field: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Field'),
        join: {
          from: 'games.field_id',
          to: 'fields.id'
        }
      },
      local_team: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Team'),
        join: {
          from: 'games.local_id',
          to: 'teams.id'
        }
      },
      visitant_team: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Team'),
        join: {
          from: 'games.visitant_id',
          to: 'teams.id'
        }
      },
    }
  }
}
