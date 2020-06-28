import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import AppContainer from "./src/navigation";

export default function App() {
  const client = new ApolloClient({
    uri: "http://192.168.1.42:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
}
