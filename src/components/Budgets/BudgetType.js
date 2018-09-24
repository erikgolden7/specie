import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { connect } from 'react-redux';
import * as budgetReducer from '../../redux/reducers/budgetsReducer';
import funcService from '../../services/funcService';

import BudgetBar from './BudgetBar';
import './budgets.css';

class BudgetType extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.getBudgetTypes();
  };

  saveBudgetType = async () => {
    const { typeInput, flagToggle, addBudgetType } = this.props;

    if (!typeInput) {
      flagToggle('inputError');
      return;
    }

    const hue = funcService.getRandomColor();

    const typeData = {
      type: typeInput,
      color: { light: hue.light, dark: hue.dark },
      amount: 0
    };

    addBudgetType(typeData);
  };

  inputEnterPress = e => {
    if (e.keyCode === 13) {
      this.saveBudgetType();
    }
  };

  addCurrentBudget = type => {
    const tempTypes = [...this.state.budgetTypes];
    const tempBudgets = [...this.state.currentBudgets];
    tempBudgets.push(type);

    tempTypes.forEach((e, i, arr) => {
      if (e.type === type.type && e.color.light === type.color.light) {
        tempTypes.splice(i, 1);
      }
    });

    this.setState({ currentBudgets: tempBudgets, budgetTypes: tempTypes });
  };

  render() {
    const {
      inputError,
      typeInput,
      showTypes,
      budgetTypes,
      flagToggle,
      handleChange
    } = this.props;

    const types = budgetTypes.map((e, i) => (
      <BudgetBar key={i} addType={this.addCurrentBudget} type={e} index={i} />
    ));

    return (
      <div className="budgets-container">
        <div className="add-budget-container">
          <div>
            <button
              className="view-type-btn"
              onClick={() => flagToggle('showTypes')}
            >
              {!showTypes ? 'View Budget Types' : 'Hide Budget Types'}
            </button>
            <input
              type="text"
              placeholder={
                inputError ? 'Must Enter Budget Name' : 'Enter Budget Name...'
              }
              onChange={handleChange}
              value={typeInput}
              name="typeInput"
              className="type-input"
              style={
                inputError
                  ? { border: 'solid 1px red' }
                  : { border: 'solid 1px gray' }
              }
              onKeyDown={this.inputEnterPress}
            />
            <button className="add-type-btn" onClick={this.saveBudgetType}>
              +
            </button>
          </div>

          <Motion
            defaultStyle={{ x: 0, opacity: 0 }}
            style={{
              x: spring(showTypes ? 0 : -200),
              opacity: spring(showTypes ? 1 : 0)
            }}
          >
            {style => (
              <div
                style={{
                  transform: `translateX(${style.x}px)`,
                  opacity: style.opacity
                }}
              >
                {showTypes && budgetTypes.length ? (
                  <div className="menu">{types}</div>
                ) : showTypes ? (
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.budgetsReducer);

  return {
    budgetTypes: state.budgetsReducer.budgetTypes,
    showTypes: state.budgetsReducer.showTypes,
    typeInput: state.budgetsReducer.typeInput,
    inputError: state.budgetsReducer.inputError
  };
}

export default connect(
  mapStateToProps,
  budgetReducer
)(BudgetType);
