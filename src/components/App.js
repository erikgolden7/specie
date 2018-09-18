import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Nav from './Nav/Nav.js';
import Landing from './Landing/Landing.js';
import Dashboard from './Dashboard/Dashboard.js';
import Goals from './Goals/Goals.js';
import Budgets from './Budgets/Budgets.js';
import Achievements from './Achievements/Achievements.js';
import RouteError from './RouteError/RouteError';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/goals" component={Goals} />
            <Route path="/budgets" component={Budgets} />
            <Route path="/achievements" component={Achievements} />
            <Route path="/404" component={RouteError} />
            <Redirect from="*" to="/404" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
