import { gql } from 'apollo-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';

export const userSchema = makeExecutableSchema({
  typeDefs: gql`
  input SearchNamesRequest {
    id: String
    name: String
    surname: String
  }
  
  input UserRequest {
    id: String
    name: String!
    surname: String!
  }

  type UserResponse {
    data: User
    error: String
  }
  
  type UsersResponse {
    data: [User]
    error: String
  }
  
  type User {
    id: String!
    name: String!
    surname: String!
  }

  type Query {
    login(searchRequest :SearchNamesRequest!): UserResponse
    searchUsers(searchRequest :SearchNamesRequest!): UsersResponse
  }
  
  type Mutation{
    register(nameRequest :UserRequest!): UserResponse
  }
`
});

addMockFunctionsToSchema({ schema: userSchema })
