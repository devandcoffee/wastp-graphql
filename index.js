import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schemas';
import services from './services';
import config from './config';

require('./db/setup');

const app = express();

const buildOptions = async (req) => {
  const user = await services.authenticate(req);
  return {
    context: user && !user.errorInfo ? { user } : {},
    schema,
    formatError: (error) => {
      return {
        name: error.name,
        message: error.message,
      };
    },
  };
};

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(buildOptions),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    //passHeader: `'Authorization': 'bearer ${config.token}'`,
  }),
);

const { port } = config;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
