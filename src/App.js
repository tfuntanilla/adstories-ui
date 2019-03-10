import React, { Component } from 'react';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './ReducerIndex.js';

import './css/App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import Home from './components/Home';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  }
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MuiThemeProvider theme={theme}>
            <Home/>
          </MuiThemeProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
