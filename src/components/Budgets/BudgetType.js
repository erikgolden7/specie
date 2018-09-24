import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { connect } from 'react-redux';
import * as budgetReducer from '../../redux/reducers/budgetsReducer';
import funcService from '../../services/funcService';

import BudgetBar from './BudgetBar';
import './budgets.css';

class BudgetType extends Component {
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

  addSelectedBudget = async ({ type, light_color, amount }) => {
    const { addCurrentBudget, getBudgetTypes } = this.props;
    await addCurrentBudget({
      selected: {
        type: type,
        light: light_color,
        amount: amount
      }
    });

    getBudgetTypes();
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
      <BudgetBar
        key={i}
        addSelectedBudget={this.addSelectedBudget}
        budget={e}
        index={i}
      />
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
            {showTypes ? (
              <input
                type="text"
                placeholder={
                  inputError ? 'Must Enter Budget Name' : 'Create New Budget...'
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
            ) : (
              false
            )}
            {showTypes ? (
              <button className="add-type-btn" onClick={this.saveBudgetType}>
                +
              </button>
            ) : (
              false
            )}
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

const mapStateToProps = ({ budgetsReducer }) => {
  return {
    budgetTypes: budgetsReducer.budgetTypes,
    showTypes: budgetsReducer.showTypes,
    typeInput: budgetsReducer.typeInput,
    inputError: budgetsReducer.inputError,
    currentBudgets: budgetsReducer.currentBudgets
  };
};

export default connect(
  mapStateToProps,
  budgetReducer
)(BudgetType);
