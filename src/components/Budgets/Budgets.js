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

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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
    var hue = this.getRandomColor();
    // var pastel = 'hsl(' + hue + ', 100%, 87.5%)';
    // const hue = '#' + Math.floor(Math.random() * 16777215).toString(16);

    let types = this.state.billTypes.slice();

    types.push({
      topic: this.state.input,
      color: { light: hue.light, dark: hue.dark }
    });

    this.setState({ billTypes: types });
  };

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

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
        <button className="add-type-btn" onClick={this.showMenu}>
          View Budget Types
        </button>
        <input
          type="text"
          placeholder="Add Type"
          onChange={this.handleTypeInput}
          value={this.state.input}
        />
        <button className="add-type-btn" onClick={this.addBillType}>
          Add New Budget
        </button>

        {this.state.showMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            {types}
          </div>
        ) : null}
        <div
          style={{
            width: 400,
            height: 400,
            background: this.state.color.light
          }}
        />
        <div
          style={{ width: 400, height: 400, background: this.state.color.dark }}
        />
      </div>
    );
  }
}

export default Budgets;
