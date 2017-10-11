const Model = require('./CustomModel')
const path = require('path')

const SportsCenter extends Model {
  static get tableName() {
    return 'sports_centers'
  }

  static get relationMappings() {
    return {
      tourneysCenter: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/TourneysCenter'),
        join: {
          from: 'sports_centers.id',
          to: 'tourneys_centers.sports_center_id'
        }
      }
    }
  }
}
