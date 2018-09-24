import React, { Component } from 'react';

class BudgetBar extends Component {
  render() {
    console.log(this.props.budget);

    return (
      <button
        key={this.props.index}
        style={{ background: this.props.budget.light_color }}
        className="menu-item"
        onClick={() => this.props.addSelectedBudget(this.props.budget)}
      >
        {this.props.budget.type}
      </button>
    );
  }
}

export default BudgetBar;
