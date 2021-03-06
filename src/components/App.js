import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Nav from './Nav/Nav';
import Landing from './Landing/Landing';
import Overview from './Overview/Overview';
import Transactions from './Transactions/Transactions';
import Budgets from './Budgets/Budgets.js';
import Credit from './Credit/Credit';
import RouteError from './RouteError/RouteError';
import ErrorBoundary from './ErrorBoundary';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ErrorBoundary>
            <Nav />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/overview" component={Overview} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/budgets" component={Budgets} />
              <Route path="/credit" component={Credit} />
              <Route path="/404" component={RouteError} />
              <Redirect from="*" to="/404" />
            </Switch>
          </ErrorBoundary>
        </div>
      </Router>
    );
  }
}

export default App;
