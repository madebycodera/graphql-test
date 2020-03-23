import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; 

const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});

import { enableScreens } from 'react-native-screens';
enableScreens();

import Home from './src/screens/Home';

export default App = () => {
    return(
        <ApolloProvider client={client}>
            <Home />
        </ApolloProvider>
    );
}  
