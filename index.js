const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schemas')
const services = require('./services')
const config = require('./config')

require('./db/setup')

let app = express()

const buildOptions = async (req, res) => {
  const user = await services.authenticate(req)
  return {
    context: { user },
    schema,
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
