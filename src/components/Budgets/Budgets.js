import React, { Component } from 'react';
import { connect } from 'react-redux';

import BudgetType from './BudgetType';
import BudgetModal from './BudgetModal';
import * as budgetReducer from '../../redux/reducers/budgetsReducer';

import './budgets.css';

class Budgets extends Component {
  componentDidMount = () => {
    this.props.getBudgetTypes();
    this.props.getCurrentBudgets();
  };

  render() {
    const { currentBudgets, flagToggle, selectBudget } = this.props;

    const budgets = currentBudgets.map((e, i) => {
      return (
        <button
          key={i}
          className="current-budget-item"
          style={{ background: e.light_color }}
          onClick={() => {
            flagToggle('showEdit');
            selectBudget(e);
          }}
        >
          {e.type}
          <span>{e.amount}</span>
        </button>
      );
    });

    return (
      <div className="budgets-view">
        <BudgetType />
        <div className="current-budgets">
          <h3 style={{ marginLeft: '2%' }}>Current Budgets</h3>
          <hr />
          <div className="current-budget-list">{budgets}</div>
          <BudgetModal />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ budgetsReducer }) => {
  return {
    currentBudgets: budgetsReducer.currentBudgets
  };
};

export default connect(
  mapStateToProps,
  budgetReducer
)(Budgets);
