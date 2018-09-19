import React, { Component } from 'react';
import './budgets.css';

class Budgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      billTypes: [],
      color: {},
      input: ''
    };
  }

  handleTypeInput = e => {
    this.setState({ input: e.target.value });
  };

  getRandomColor = () => {
    const h = Math.floor(Math.random() * 360),
      s = Math.floor(Math.random() * 60) + '%',
      light = '50%',
      dark = '30%';

    return { light: `hsl(${h},${s},${light})`, dark: `hsl(${h},${s},${dark})` };
  };

  addBillType = () => {
    if (!this.state.input) {
      alert('Unsuccessful, required field');
      return;
    }

    const hue = this.getRandomColor();
    const types = this.state.billTypes.slice();

    types.push({
      topic: this.state.input,
      color: { light: hue.light, dark: hue.dark }
    });

    this.setState({ billTypes: types });
  };

  showMenu = e => {
    e.preventDefault();
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    console.log(this.state.color, this.state.input);

    const types = this.state.billTypes.map((e, i) => (
      <button
        key={i}
        style={{ background: e.color.light }}
        className="menu-item"
      >
        {e.topic}
      </button>
    ));

    return (
      <div className="budgets-view">
        <div className="add-budget-container">
          <button className="add-type-btn" onClick={this.showMenu}>
            View Budget Types
          </button>
          <input
            type="text"
            placeholder="Add Budget Type..."
            onChange={this.handleTypeInput}
            value={this.state.input}
            className="search-bar"
          />
          <button className="add-menu-item" onClick={this.addBillType}>
            +
          </button>

          {this.state.showMenu && this.state.billTypes.length ? (
            <div className="menu">{types}</div>
          ) : this.state.showMenu ? (
            <div className="menu">
              <button
                style={{ background: 'white', color: 'gray' }}
                className="menu-item"
              >
                Please Add Budgets Types...
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Budgets;
