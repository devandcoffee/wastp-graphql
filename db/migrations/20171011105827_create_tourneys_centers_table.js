exports.up = function(knex, Promise) {
  return knex.schema.createTable('tourneys_centers', (table) => {
    table.integer('tourney_id').references('tourneys.id').unsigned()
    table.integer('sports_center_id').references('sports_centers.id').unsigned()
    table.primary(['tourney_id', 'sports_center_id'])
    table.timestamps(true)
    table.timestamp('deleted_at')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tourneys_centers')
}
