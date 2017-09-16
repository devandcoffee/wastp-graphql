const Model = require('./CustomModel')
const path = require('path')

class Player extends Model {
  static get tableName(){
    return 'players'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'players.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Player
