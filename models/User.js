import path from 'path';
import Model from './CustomModel';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      tourneys: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'users.id',
          to: 'tourneys.user_id',
        },
      },
      players: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Player'),
        join: {
          from: 'users.id',
          to: 'players.user_id',
        },
      },
      teams: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Team'),
        join: {
          from: 'users.id',
          to: 'teams.user_id',
        },
      },
    };
  }
}

export default User;
