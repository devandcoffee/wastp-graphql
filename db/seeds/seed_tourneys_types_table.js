const casual = require('casual')

exports.seed = function(knex, Promise) {
  return knex('tourneys_types').del().then(() => {
    const promises = ['league', 'cup'].map((elem, id) => {
      return knex('tourneys_types').insert([{
        id,
        name: elem
      }])
    })

    return Promise.all(promises)
  })
}
