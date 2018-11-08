import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DropMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false
    };
  }

  render() {
    let hamburgerClasses = 'hamburger-menu';
    if (this.state.toggle) {
      hamburgerClasses = 'hamburger-menu open';
    }
    return (
      <div className="hamburger-icon" onClick={() => this.setState({ toggle: !this.state.toggle })}>
        <div className={hamburgerClasses}>
          {this.state.toggle && (
            <div>
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
          )}
        </div>
      </div>
    );
  }
}
