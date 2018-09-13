import React, { Component } from 'react';
import Nav from './components/Nav/Nav.js';
import Landing from './components/Landing/Landing';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Landing />
      </div>
    );
  }
}

export default App;
