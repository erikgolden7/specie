import React, { Component } from 'react';
import { connect } from 'react-redux';

import BudgetType from './BudgetType';
import Modal from '../Modal';
import {
  selectBudget,
  editCurrentBudget,
  getBudgetTypes,
  getCurrentBudgets,
  removeBudgetType
} from '../../redux/reducers/budgetsReducer';
import { getTransactionData } from '../../redux/reducers/transactionsReducer';

import './budgets.css';

export class Budgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editFlag: false,
      budget: '',
      amount: ''
    };
  }

  componentDidMount = () => {
    const { getBudgetTypes, getCurrentBudgets, getTransactionData } = this.props;

    getBudgetTypes();
    getCurrentBudgets();
    getTransactionData();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  flagToggle = () => {
    this.setState({ editFlag: !this.state.editFlag });
  };

  deleteBudget = async () => {
    const { removeBudgetType, selectedBudget, getCurrentBudgets } = this.props;

    await removeBudgetType(selectedBudget);
    this.flagToggle();
    getCurrentBudgets();
  };

  handleSubmit = async e => {
    const { selectedBudget, editCurrentBudget, getCurrentBudgets, getBudgetTypes } = this.props;
    const { budget, amount } = this.state;

    await editCurrentBudget(selectedBudget, budget, amount);
    getCurrentBudgets();
    getBudgetTypes();

    this.setState({ budget: '', amount: '', editFlag: false });
  };

  render() {
    const { currentBudgets, selectBudget, transactions } = this.props;
    const { editFlag } = this.state;

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
              this.flagToggle();
              selectBudget(e);
            }}
          >
            <div className="dark" style={{ background: e.dark_color }}>
              <div className="text-left">{e.type}</div>

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
              style={
                percent > 100
                  ? {
                      color: 'red',
                      fontWeight: 'bold',
                      marginLeft: 7
                    }
                  : {
                      color: 'green',
                      fontWeight: 'bold',
                      marginLeft: 7
                    }
              }
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
          {editFlag && (
            <Modal
              trash
              title="Edit Budget"
              toggleModal={this.flagToggle}
              handleSubmit={this.handleSubmit}
              handleDelete={this.deleteBudget}
            >
              <div style={{ marginTop: 20 }}>
                <label>Change Name:</label>
                <input
                  className="text-input"
                  type="text"
                  placeholder="Enter Name..."
                  name="budget"
                  onChange={this.handleChange}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <label>Change Amount:</label>
                <input
                  className="text-input"
                  type="text"
                  placeholder="Enter Amount..."
                  name="amount"
                  onChange={this.handleChange}
                />
              </div>
            </Modal>
          )}
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
  {
    selectBudget,
    getTransactionData,
    editCurrentBudget,
    getBudgetTypes,
    getCurrentBudgets,
    removeBudgetType
  }
)(Budgets);
