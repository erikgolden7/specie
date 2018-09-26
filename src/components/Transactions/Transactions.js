import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as transactionsReducer from '../../redux/reducers/transactionsReducer';
import TransactionModal from './TransactionModal';

import './transactions.css';

class Transactions extends Component {
  render() {
    const { showModal, flagToggle } = this.props;
    return (
      <div style={{ marginTop: 60 }}>
        <div className="add-transaction-container">
          <button onClick={flagToggle}>Add New Transaction</button>
          {showModal ? <TransactionModal /> : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactionsReducer }) => ({
  ...transactionsReducer
});

export default connect(
  mapStateToProps,
  transactionsReducer
)(Transactions);
