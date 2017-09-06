const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schemas')
const config = require('./config')

const port = config.port

require('./db/setup')

let app = express()

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema
  })
)

app.use(
  '/graphiql',
  graphiqlExpress({ endpointURL: '/graphql' })
)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
