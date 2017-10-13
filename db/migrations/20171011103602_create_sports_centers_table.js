
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sports_centers', (table) => {
    table.increments('id').primary().unsigned()
    table.string('name')
    table.string('address')
    table.string('phone')
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sports_centers')
}
