import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ContextProvider from './Context/ContextProvider';

const client = new ApolloClient({
  uri: '/graphql'
});

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: pink
  },
  typography: {
    useNextVariants: true
  }
});
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
