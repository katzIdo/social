import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const localGraphQL = "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: localGraphQL
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app </h2>
    </div>
  </ApolloProvider>
);

export default App;
