import React from 'react';
import './nav.css';

export default () => {
  return (
    <div className="nav">
      <div className="logo" />
      <div className="nav-links">
        <div>Dashboard</div>
        <div>Goals</div>
        <div>Budgets</div>
        <div>Achievments</div>
      </div>
      <button className="login">Login</button>
    </div>
  );
};
