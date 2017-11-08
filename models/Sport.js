import path from 'path';
import Model from './CustomModel';

class Sport extends Model {
  static get tableName() {
    return 'sports';
  }

  static get relationMappings() {
    return {
      tourneys: {
        relation: Model.HasManyRelation,
        modelclass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'sports.id',
          to: 'tourneys.sport_id',
        },
      },
      fields: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Field'),
        join: {
          from: 'sports.id',
          to: 'fields.sport_id',
        },
      },
      incidence_types: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/IncidenceType'),
        join: {
          from: 'sports.id',
          to: 'incidence_types.sport_id',
        },
      },
    };
  }
}

export default Sport;
