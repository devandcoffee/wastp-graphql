import path from 'path';
import Model from './CustomModel';

class TourneyType extends Model {
  static get tableName() {
    return 'tourneys_types';
  }

  static get relationMappings() {
    return {
      tourneys: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'tourneys_types.id',
          to: 'tourneys.tourney_type_id',
        },
      },
    };
  }
}

export default TourneyType;
