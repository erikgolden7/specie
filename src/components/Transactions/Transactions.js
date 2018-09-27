import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as transactionsReducer from '../../redux/reducers/transactionsReducer';
import TransactionModal from './TransactionModal';

import './transactions.css';

class Transactions extends Component {
  componentDidMount() {
    this.props.getTransactionData();
  }

  render() {
    const dataMap = this.props.transactions.map((e, i) => {
      return (
        <tr key={i}>
          <td>{e.type}</td>
          <td>{e.location}</td>
          <td>{e.date}</td>
          <td>{`$ ${e.amount}`}</td>
        </tr>
      );
    });

    const { showModal, flagToggle } = this.props;
    return (
      <div style={{ marginTop: 60 }}>
        <div className="add-transaction-container">
          <button onClick={flagToggle}>Add New Transaction</button>
          {showModal && <TransactionModal />}
        </div>
        <div className="display-transactions">
          <tr>
            <th>Type</th>
            <th>Location</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
          {dataMap}
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
