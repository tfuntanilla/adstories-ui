import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import MainApp from './Main';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <MainApp/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
