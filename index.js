const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schemas')
const services = require('./services')
const config = require('./config')
const admin = require('firebase-admin')

require('./db/setup')

let app = express()

var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://wastp-5a602.firebaseio.com'
})

const buildOptions = async (req, res) => {
  const user = await services.authenticate(admin, req)
  return {
    context: user && !user.Error ? { user } : {},
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
    endpointURL: '/graphql'
  })
)

const port = config.port

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
