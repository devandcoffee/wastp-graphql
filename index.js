const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const admin = require('firebase-admin')
const schema = require('./schemas')
const services = require('./services')
const config = require('./config')
const serviceAccount = require('./serviceAccountKey.json')

require('./db/setup')

let app = express()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseUri
})

const buildOptions = async (req, res) => {
  const user = await services.authenticate(admin, req)
  return {
    context: user && !user.errorInfo ? { user } : {},
    schema,
    formatError: (error) => {
      return {
        name: error.name,
        message: error.message
      }
    }
  }
}

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(buildOptions)
)

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    //passHeader: `'Authorization': 'bearer ${config.token}'`,
  })
)

const port = config.port

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
