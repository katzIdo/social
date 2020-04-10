import { gql } from 'apollo-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';

export const userSchema = makeExecutableSchema({
  typeDefs: gql`
  input SearchNamesRequest {
    name: String!
  }
  
  
  input SetNameRequest {
    name: String!
    surname: String!
  }

  type User {
    name: String!
    surname: String!
  }

  type Query {
    hello: String
    searchNames(searchRequest :SearchNamesRequest!): [User]
  }
  
  type Mutation{
    setName(nameRequest :SetNameRequest!): User
  }
`
});

addMockFunctionsToSchema({ schema: userSchema })
