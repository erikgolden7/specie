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

      return (
        <div key={i}>
          <button
            className="current-budget-item"
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
          <div
            style={{
              marginBottom: 10,
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '2px 5px 12px 0',
              fontSize: 14
            }}
          >
            <span
              style={{
                fontWeight: 'bold',
                marginRight: 5
              }}
            >
              ${total}
            </span>
            <span
              style={{
                fontStyle: 'italic'
              }}
            >
              of
            </span>
            <span
              style={{
                fontWeight: 'bold',
                marginLeft: 7
              }}
            >
              ${e.amount}
            </span>
          </div>
        </div>
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
