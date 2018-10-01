import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionData, flagToggle } from '../../redux/reducers/transactionsReducer';
import budgetsReducer, { getCurrentBudgets } from '../../redux/reducers/budgetsReducer';

import TransactionTable from './TransactionTable';
import TransactionModal from './TransactionModal';

import './transactions.css';

class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactionData();
    this.props.getCurrentBudgets();
  }

  render() {
    const { transactionModal, flagToggle, transactions } = this.props;
    return (
      <div style={{ marginTop: 60 }}>
        <div className="add-transaction-container">
          <button className="add-transaction-btn" onClick={flagToggle}>
            Add New Transaction
          </button>
          {transactionModal && <TransactionModal />}
        </div>
        <div className="display-transactions">
          <TransactionTable data={transactions} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactionsReducer }) => ({
  ...transactionsReducer,
  ...budgetsReducer
});

export default connect(
  mapStateToProps,
  { getTransactionData, getCurrentBudgets, flagToggle }
)(Transactions);
