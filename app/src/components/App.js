import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h2>Welcome to React</h2>
          <Slider />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
