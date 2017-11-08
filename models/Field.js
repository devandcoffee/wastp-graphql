import path from 'path';
import Model from './CustomModel';

class Field extends Model {
  static get tableName() {
    return 'fields';
  }

  static get relationMappings() {
    return {
      sportsCenter: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/SportsCenter'),
        join: {
          from: 'fields.sports_center_id',
          to: 'sports_centers.id',
        },
      },
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Sport'),
        join: {
          from: 'fields.sport_id',
          to: 'sports.id',
        },
      },
      games: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Game'),
        join: {
          from: 'fields.id',
          to: 'games.field_id',
        },
      },
    };
  }
}

export default Field;
