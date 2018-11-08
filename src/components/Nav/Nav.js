import React from 'react';
import { Link } from 'react-router-dom';
import DropMenu from './DropMenu';
import './nav.css';

export default () => {
  return (
    <div className="nav">
      <Link to="/" className="logo" />
      <DropMenu />
      <div className="nav-links">
        <Link className="hamburger-menu-item" to="/overview">
          Overview
        </Link>
        <Link className="hamburger-menu-item" to="/transactions">
          Transactions
        </Link>
        <Link className="hamburger-menu-item" to="/budgets">
          Budgets
        </Link>
        <Link className="hamburger-menu-item" to="/credit">
          Credit
        </Link>
      </div>

      <button className="login">Login</button>
    </div>
  );
};
