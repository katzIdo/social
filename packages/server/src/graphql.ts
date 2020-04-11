import * as jwt from 'jsonwebtoken'
import { ApolloServer, gql, AuthenticationError } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';
import { userSchema } from './gqlSchema/User';
import { adminSchema } from './gqlSchema/Admin';
import { userResolver } from './resolvers/User';
import { adminResolver } from './resolvers/Admin';
import { getPayload } from './helpers/tokens';

const schema = mergeSchemas({
  schemas: [userSchema, adminSchema],
  resolvers: [userResolver, adminResolver],
});

export const gqlServer = (express) => {
  const server = new ApolloServer({
    schema,
    // introspection: true,
    playground: process.env.NODE_ENV !== 'production',
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization || '';
        console.log('token', token)
        const { payload: user, loggedIn } = getPayload(token);
        return { user, loggedIn };
      } catch (err) {
        console.log(err)
        return {}
      }
    }
  })

  const app = express();

  server.applyMiddleware({ app, path: '/', cors: true });

  return app
}

