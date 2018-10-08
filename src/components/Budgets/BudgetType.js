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

    this.state = {
      addFlag: false,
      budgetType: '',
      inputError: false
    };
  }

  saveBudgetType = async () => {
    const { addBudgetType, getBudgetTypes } = this.props;
    const { budgetType } = this.state;

    if (!budgetType) {
      this.setState({ inputError: true });
      return;
    }

    const hue = funcService.getRandomColor();

    const typeData = {
      type: budgetType,
      color: { light: hue.light, dark: hue.dark },
      amount: 0
    };

    await addBudgetType(typeData);
    getBudgetTypes();
    this.setState({ inputError: false, budgetType: '' });
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

  flagToggle = () => this.setState({ addFlag: !this.state.addFlag });

  handleInput = e => this.setState({ budgetType: e.target.value });

  render() {
    const { budgetTypes } = this.props;
    const { addFlag, inputError, budgetType } = this.state;

    const types = budgetTypes.map((e, i) => (
      <BudgetBar key={i} addSelectedBudget={this.addSelectedBudget} budget={e} index={i} />
    ));

    return (
      <div className="budgets-container">
        <div className="add-budget-container">
          <div>
            <button className="view-type-btn" onClick={this.flagToggle}>
              {!addFlag ? 'View Budget Types' : 'Hide Budget Types'}
            </button>
            {addFlag ? (
              <input
                type="text"
                placeholder={inputError ? 'Must Enter Name...' : 'Create New Budget...'}
                onChange={this.handleInput}
                name="budgetType"
                value={budgetType}
                className="type-input"
                style={inputError ? { border: 'solid 1px red' } : { border: 'solid 1px gray' }}
                onKeyDown={this.inputEnterPress}
              />
            ) : (
              false
            )}
            {addFlag ? (
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
              x: spring(addFlag ? 0 : -200),
              opacity: spring(addFlag ? 1 : 0)
            }}
          >
            {style => (
              <div
                style={{
                  transform: `translateX(${style.x}px)`,
                  opacity: style.opacity
                }}
              >
                {addFlag && budgetTypes.length ? (
                  <div className="menu">{types}</div>
                ) : addFlag ? (
                  <div className="menu">
                    <button style={{ background: 'white', color: 'gray' }} className="menu-item">
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
    addFlag: budgetsReducer.addFlag,
    budgetType: budgetsReducer.budgetType,
    inputError: budgetsReducer.inputError,
    currentBudgets: budgetsReducer.currentBudgets
  };
};

export default connect(
  mapStateToProps,
  budgetReducer
)(BudgetType);
