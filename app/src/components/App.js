import React, { Component } from 'react';
import Style from '../style';
import Grid from 'react-bootstrap/lib/Grid';

// custom components
import AlignInput from './AlignInput';

class App extends Component {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  };

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  render() {
    var width;
    if (this.state.windowWidth < Style.xsCutoff) {
      width = '100%'
    } else if (this.state.windowWidth < Style.smCutoff) {
      width = '723px'
    } else if (this.state.windowWidth < Style.mdCutoff) {
      width = '933px'
    } else {
      width = '1127px'
    }

    return (
      <Grid style={{width: width, height: '500px', border: '1px solid black' }}>
        <AlignInput />
      </Grid>
    );
  }
}

export default App;
