import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import './index.css';

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
