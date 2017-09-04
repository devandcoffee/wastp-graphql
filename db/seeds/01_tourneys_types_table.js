const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('tourneys_types').del().then(() => {
    const promises = ['league', 'cup'].map((elem) => {
      return knex('tourneys_types').insert([{
        name: elem,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })

    return Promise.all(promises)
  })
}
