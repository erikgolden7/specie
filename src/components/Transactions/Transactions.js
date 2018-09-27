import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as transactionsReducer from '../../redux/reducers/transactionsReducer';
import TransactionModal from './TransactionModal';

import './transactions.css';

const testData = [
  { type: 'Shopping', location: 'Walmart', date: '4/30/2018', amount: 200 },
  { type: 'Home Improvement', location: 'Home Depot', date: '6/13/2018', amount: 300 },
  { type: 'Food', location: 'Chilis', date: '4/23/2018', amount: 600 },
  { type: 'Clothes', location: 'Mr Mac', date: '12/22/2018', amount: 800 },
  { type: 'Shopping', location: 'RC Willey', date: '7/04/2018', amount: 100 }
];

class Transactions extends Component {
  render() {
    const dataMap = testData.map(e => {
      return (
        <tr>
          <td>{e.type}</td>
          <td>{e.location}</td>
          <td>{e.date}</td>
          <td>{e.amount}</td>
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
          <th>
            <td>Type</td>
            <td>Location</td>
            <td>Date</td>
            <td>Amount</td>
          </th>
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
