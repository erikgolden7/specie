import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as transactionsReducerActions from '../../redux/reducers/transactionsReducer';
import TransactionModal from './TransactionModal';

import './transactions.css';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <div style={{ marginTop: 60 }}>
        <div className="add-transaction-container">
          <button
            onClick={() => this.setState({ showModal: !this.state.showModal })}
          >
            Add New Transaction
          </button>
          <TransactionModal
            show={this.state.showModal}
            toggleModal={() =>
              this.setState({ showModal: !this.state.showModal })
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  transactionsReducerActions
)(Transactions);
