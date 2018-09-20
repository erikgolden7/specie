import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

export default () => {
  return (
    <div className="nav">
      <Link to="/" className="logo" />
      <div className="nav-links">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-link" to="/transactions">
          Transactions
        </Link>
        <Link className="nav-link" to="/goals">
          Goals
        </Link>
        <Link className="nav-link" to="/budgets">
          Budgets
        </Link>
        <Link className="nav-link" to="/achievements">
          Achievments
        </Link>
      </div>

      <button className="login">Login</button>
    </div>
  );
};
