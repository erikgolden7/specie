import React, { Component } from 'react';
import { connect } from 'react-redux';

import BudgetType from './BudgetType';
import BudgetModal from './BudgetModal';
import { flagToggle, selectBudget, getBudgetTypes, getCurrentBudgets } from '../../redux/reducers/budgetsReducer';
import { getTransactionData } from '../../redux/reducers/transactionsReducer';

import './budgets.css';

export class Budgets extends Component {
  componentDidMount = () => {
    this.props.getBudgetTypes();
    this.props.getCurrentBudgets();
    this.props.getTransactionData();
  };

  render() {
    const { currentBudgets, flagToggle, selectBudget, transactions } = this.props;

    const budgets = currentBudgets.map((e, i) => {
      let total = 0;

      transactions.forEach(ele => {
        if (ele.type === e.type) {
          total += ele.amount;
        }
      });
      const percent = (total / e.amount) * 100;
      console.log(percent);

      return (
        // <div style={{ background: e.light_color, height: '100%', width: '100%', zIndex: 5 }}>
        <button
          key={i}
          className="current-budget-item"
          // style={{ background: e.light_color }}
          onClick={() => {
            flagToggle('showEdit');
            selectBudget(e);
          }}
        >
          <div className="dark" style={{ background: e.dark_color }}>
            <div className="text-left">{e.type}</div>
            <div className="text-right">{e.amount}</div>
            <div className="light" style={{ background: e.light_color, width: `${percent}%` }} />
          </div>

          <div />
        </button>
        // </div>
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

const mapStateToProps = ({ budgetsReducer, transactionsReducer }) => {
  return {
    ...budgetsReducer,
    ...transactionsReducer
  };
};

export default connect(
  mapStateToProps,
  { flagToggle, selectBudget, getTransactionData, getBudgetTypes, getCurrentBudgets }
)(Budgets);
