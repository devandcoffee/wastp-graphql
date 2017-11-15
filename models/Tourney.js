import path from 'path';
import Model from './CustomModel';

class Tourney extends Model {
  static get tableName() {
    return 'tourneys';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/User'),
        join: {
          from: 'tourneys.user_id',
          to: 'users.id',
        },
      },
      tourney_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/TourneyType'),
        join: {
          from: 'tourneys.tourney_type_id',
          to: 'tourneys_types.id',
        },
      },
      sport: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Sport'),
        join: {
          from: 'tourneys.sport_id',
          to: 'sports.id',
        },
      },
      tourneysCenter: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/TourneysCenter'),
        join: {
          from: 'tourneys.id',
          to: 'tourneys_centers.tourney_id',
        },
      },
      teams: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Team'),
        join: {
          from: 'tourneys.id',
          to: 'teams.tourney_id',
        },
      },
      fixtures: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Fixture'),
        join: {
          from: 'tourneys.id',
          to: 'fixtures.tourney_id',
        },
      },
    };
  }
}

export default Tourney;
