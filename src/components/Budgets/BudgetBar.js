import React, { Component } from 'react';

class BudgetBar extends Component {
  render() {
    return (
      <button
        key={this.props.index}
        style={{ background: this.props.type.color.light }}
        className="menu-item"
      >
        {this.props.type.topic}
      </button>
    );
  }
}

export default BudgetBar;
