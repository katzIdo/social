import * as express from 'express';
import { gqlServer } from './graphql';


const server = gqlServer(express);
const port = process.env.PORT || 4000

server.listen({ port: port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
)
