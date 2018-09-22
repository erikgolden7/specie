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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    const { showModal } = this.state;
    return (
      <div style={{ marginTop: 60 }}>
        <div className="add-transaction-container">
          <button
            onClick={() => this.setState({ showModal: !this.state.showModal })}
          >
            Add New Transaction
          </button>
          {showModal ? <TransactionModal toggleModal={this.toggleModal} /> : ''}
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
