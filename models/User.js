const Model = require('./CustomModel')
const path = require('path')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    return {
      tourneys: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'users.id',
          to: 'tourneys.user_id'
        }
      }
    }
  }
}

module.exports = User
