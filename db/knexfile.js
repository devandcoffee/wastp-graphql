// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : 'postgres',
      user : 'admin',
      password : 'admin',
      database : 'wastpdb'
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
