import * as firebase from 'firebase/app';
import 'firebase/database';
import { ApolloServer, gql } from 'apollo-server-express';
import { mergeSchemas } from 'graphql-tools';

import { userSchema } from './gqlSchema/User';
import { userResolver } from './resolvers/User';

import {
  API_KEY,
  PROJECT_ID,
  MESSAGING_SENDER_ID,
  AUTH_DOMAIN, APP_ID, DATABASE_URL, STORAGE_BUCKET
} from '../helpers/config';


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const schema = mergeSchemas({
  schemas: [userSchema],
  resolvers: [userResolver(database)],
});

export const gqlServer = (express) => {
  const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true
  })

  const app = express();
  server.applyMiddleware({ app, path: '/', cors: true });

  return app
}
