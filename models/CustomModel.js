const { Model, QueryBuilder } = require('objection')

class SoftDeleteQueryBuilder extends QueryBuilder {
  constructor(modelClass) {
    super(modelClass);

    this.onBuild(builder => {
      if (!builder.context().withTrashed) {
        builder.whereNull('deleted_at');
      }
    })
  }

  withTrashed(withTrashed) {
    this.context().withTrashed = withTrashed
    return this
  }

  softDelete() {
    return this.patch({ deleted_at: new Date().toISOString() });
  }
}

class CustomModel extends Model {

  $beforeInsert() {
    const now = new Date().toISOString()
    this.created_at = now
    this.updated_at = now
  }

  $beforeUpdate() {
    const now = new Date().toISOString()
    this.updated_at = now
  }

}

CustomModel.QueryBuilder = SoftDeleteQueryBuilder;
CustomModel.RelatedQueryBuilder = SoftDeleteQueryBuilder;

module.exports = CustomModel
