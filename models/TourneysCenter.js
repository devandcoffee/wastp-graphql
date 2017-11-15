import path from 'path';
import Model from './CustomModel';

class TourneysCenter extends Model {
  static get tableName() {
    return 'tourneys_centers';
  }

  static get relationMappings() {
    return {
      sportsCenter: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/SportsCenter'),
        join: {
          from: 'tourneys_centers.sports_center_id',
          to: 'sports_centers.id',
        },
      },
      tourneys: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Tourney'),
        join: {
          from: 'tourneys_centers.tourney_id',
          to: 'tourneys.id',
        },
      },
    };
  }
}

export default TourneysCenter;
