import React, { Component } from 'react';
import Nav from './Nav/Nav.js';
import Landing from './Landing/Landing.js';
import RouteError from './RouteError/RouteError';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/404" component={RouteError} />
            <Redirect from="*" to="/404" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
