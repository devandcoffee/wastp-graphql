exports.up = function(knex, Promise) {
  Promise.all([
    knex.schema.createTable('tourneys', (table) => {
      table.increments('id').primary().unsigned()
      table.string('name')
      table.string('description')
      table.date('start_date')
      table.integer('amount_teams').unsigned()
      table.integer('tourney_type_id').unsigned()
    })
  ])
};

exports.down = function(knex, Promise) {
  Promise.all([
    knex.schema.dropTable('tourneys')
  ])
};
