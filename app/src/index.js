import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

// material-ui dependency for onTouchTap
injectTapEventPlugin();

// Components
import App from './components/App';
import InnerApp from './components/innerApp';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="inner" component={InnerApp}/>
  </Router>
  ), document.getElementById('root')
);
