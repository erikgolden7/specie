import React, { Component } from 'react';

class BudgetBar extends Component {
  render() {
    console.log(this.props.type.light_color, this.props.type.type);

    return (
      <button
        key={this.props.index}
        style={{ background: this.props.type.light_color }}
        className="menu-item"
        // onClick={() => this.props.addType(this.props.type)}
      >
        {this.props.type.type}
      </button>
    );
  }
}

export default BudgetBar;
