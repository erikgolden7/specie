import React, { Component } from 'react';
import './budgets.css';

class Budgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      billTypes: [],
      color: {},
      input: '',
      inputError: false
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

  addBillType = e => {
    if (!this.state.input) {
      this.setState({ inputError: true });
      return;
    }

    const hue = this.getRandomColor();
    const types = this.state.billTypes.slice();

    types.push({
      topic: this.state.input,
      color: { light: hue.light, dark: hue.dark }
    });

    this.setState({ billTypes: types, inputError: false, input: '' });
  };

  inputEnterPress = e => {
    if (e.keyCode === 13) {
      this.addBillType(e);
    }
  };

  showMenu = e => {
    e.preventDefault();
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    const { inputError, input, showMenu } = this.state;

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
          <button className="view-type-btn" onClick={this.showMenu}>
            View Budget Types
          </button>
          <input
            type="text"
            placeholder={
              inputError ? 'Must Enter Budget Type' : 'Add Budget Type...'
            }
            onChange={this.handleTypeInput}
            value={this.state.input}
            className="type-input"
            style={
              inputError
                ? { border: 'solid 1px red' }
                : { border: 'solid 1px gray' }
            }
            onKeyDown={this.inputEnterPress}
          />
          <button className="add-type-btn" onClick={this.addBillType}>
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
