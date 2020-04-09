import * as bodyParser from 'body-parser';
import {
  API_KEY,
  PROJECT_ID,
  MESSAGING_SENDER_ID,
  AUTH_DOMAIN, APP_ID, DATABASE_URL, STORAGE_BUCKET
} from './helpers/config';

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const firebase = require('firebase/app');
require('firebase/database');

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

const app = express();

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


const typeDefs = gql`
  input SetNameRequest {
      name: String!
      surname: String!
  }

  input SearchNamesRequest {
    name: String!
  }
  
  type SetNameResponse {
      result: Boolean!
  }

  type SearchNamesResponse {
    name: String!
    surname: String!
  }

  type Query {
    hello: String
    searchNames(searchRequest :SearchNamesRequest!): [SearchNamesResponse]
  }
  
  type Mutation{
    setName(nameRequest :SetNameRequest!): SetNameResponse
  }
`;

const firebaseUsers = database.ref('users/');

const resolvers = {
  Query: {
    hello: () => 'Hello roger!',
    searchNames: async(parent, { searchRequest }, { me }) => {
      const {name} = searchRequest;
      return new Promise(resolve => {
        firebaseUsers.orderByChild('name').once('value', (response)=>{
          // console.log('dbResponse', response.val())
          resolve(Object.values(response.val()));
        });
      });

    }
  },
  Mutation: {
    setName: async(parent, { nameRequest }, { me }) => {
      const {name, surname} = nameRequest;

      if (!name || !surname) return ({
        result: false
      });

      await firebaseUsers.push({
        name,
        surname
      }).catch((err)=>{
        console.log('fire base error', err)
      })

      return {
        result: true
      }
    }
  }
};

function gqlServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true
  })

  const app = express()
  server.applyMiddleware({ app, path: '/', cors: true })

  return app
}

const server = gqlServer();
const port = process.env.PORT || 4000

server.listen({ port: port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
)
