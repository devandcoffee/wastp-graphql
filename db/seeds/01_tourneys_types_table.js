const casual = require('casual')
const { TourneyTypes } = require('../../data-helper')

exports.seed = function(knex, Promise) {
  return knex('tourneys_types').del().then(() => {
    const promises = Object.values(TourneyTypes).map((elem) => {
      return knex('tourneys_types').insert([{
        name: elem,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
    })

    return Promise.all(promises)
  })
}
