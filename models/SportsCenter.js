import path from 'path';
import Model from './CustomModel';

class SportsCenter extends Model {
  static get tableName() {
    return 'sports_centers';
  }

  static get relationMappings() {
    return {
      tourneysCenter: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/TourneysCenter'),
        join: {
          from: 'sports_centers.id',
          to: 'tourneys_centers.sports_center_id',
        },
      },
      fields: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Field'),
        join: {
          from: 'sports_centers.id',
          to: 'fields.sports_center_id',
        },
      },
    };
  }
}

export default SportsCenter;
