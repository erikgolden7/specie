import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import BudgetBar from './BudgetBar';
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

    this.setState({
      billTypes: types,
      inputError: false,
      input: '',
      showMenu: true
    });
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
    const { inputError, input, showMenu, billTypes } = this.state;

    const types = billTypes.map((e, i) => <BudgetBar type={e} index={i} />);

    return (
      <div className="budgets-view">
        <div className="budgets-container">
          <div className="add-budget-container">
            <div>
              <button className="view-type-btn" onClick={this.showMenu}>
                {!showMenu ? 'View Budget Types' : 'Hide Budget Types'}
              </button>
              <input
                type="text"
                placeholder={
                  inputError ? 'Must Enter Budget Name' : 'Enter Budget Name...'
                }
                onChange={this.handleTypeInput}
                value={input}
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
            </div>

            <Motion
              defaultStyle={{ x: 0, opacity: 0 }}
              style={{
                x: spring(showMenu ? 0 : -200),
                opacity: spring(showMenu ? 1 : 0)
              }}
            >
              {style => (
                <div
                  style={{
                    transform: `translateX(${style.x}px)`,
                    opacity: style.opacity
                  }}
                >
                  {showMenu && billTypes.length ? (
                    <div className="menu">{types}</div>
                  ) : showMenu ? (
                    <div className="menu">
                      <button
                        style={{ background: 'white', color: 'gray' }}
                        className="menu-item"
                      >
                        Please Add Budgets...
                      </button>
                    </div>
                  ) : null}
                </div>
              )}
            </Motion>
          </div>
          <div className="current-budgets">Display Current Budgets</div>
        </div>
      </div>
    );
  }
}

export default Budgets;

// <Motion
// defaultStyle={{ y: -200, opacity: 0 }}
// style={{
//   y: spring(showMenu ? 0 : -200),
//   opacity: spring(showMenu ? 1 : 0)
// }}
// >
// {style => (
//   <div
//     style={{
//       transform: `translateY(${style.y}px)`,
//       opacity: style.opacity
//     }}
//   >
//     {showMenu && billTypes.length ? (
//       <div className="menu">{types}</div>
//     ) : showMenu ? (
//       <div className="menu">
//         <button
//           style={{ background: 'white', color: 'gray' }}
//           className="menu-item"
//         >
//           Please Add Budgets...
//         </button>
//       </div>
//     ) : null}
//   </div>
// )}
// </Motion>
