import { gql } from 'apollo-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';

export const adminSchema = makeExecutableSchema({
  typeDefs: gql`
  input SearchUsersRequest {
    id: String
    name: String
    surname: String
  }
  
  type SearchUsersResponse {
    data: [SearchUser]
    error: String
  }

  type SearchUser {
    id: String!
    role: Int!
    name: String!
    surname: String!
    password: String!
  }
  
  type Query {
    searchUsers(searchRequest :SearchUsersRequest!): SearchUsersResponse
  }
  
`
});

addMockFunctionsToSchema({ schema: adminSchema })
