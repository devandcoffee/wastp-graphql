const config = require('../config')

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : config.db.host,
      user : config.db.user,
      password : config.db.password,
      database : config.db.database
    },
    migrations: {
      directory: `${__dirname}/migrations`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    }
  },

  production: {
    // Production settings
  }

};
