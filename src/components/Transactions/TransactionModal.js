import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import {
  setTransactionFormData,
  getTransactionData,
  flagToggle,
  handleChange,
  handleDate
} from '../../redux/reducers/transactionsReducer';
import { getCurrentBudgets } from '../../redux/reducers/budgetsReducer';
import 'react-datepicker/dist/react-datepicker.css';
import './transactions.css';

class Modal extends Component {
  componentDidMount = () => {
    this.props.getCurrentBudgets();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { budgetType, date, location, amount, setTransactionFormData, flagToggle } = this.props;

    setTransactionFormData(budgetType, date, location, amount);
    flagToggle();
  };

  render() {
    const { budgetType, date, location, amount, flagToggle, handleChange, currentBudgets, handleDate } = this.props;

    const budgets = currentBudgets.map((e, i) => {
      return (
        <option key={i} value={e.type}>
          {e.type}
        </option>
      );
    });

    return (
      <div className="backdrop">
        <div className="modal">
          <form className="transaction-form" onSubmit={this.handleSubmit}>
            <div>
              <label>Select Budget Type:</label>
              <select className="transaction-select" name="budgetType" value={budgetType} onChange={handleChange}>
                {budgets}
              </select>
            </div>

            <div>
              <label>Select Date:</label>
              <DatePicker
                className="transaction-datepicker"
                // name="date"
                // value={date}
                selected={date}
                onChange={date => handleDate(date)}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Vendor/Business:</label>
              <input
                className="modal-input transaction-input"
                type="text"
                placeholder="Where your money went..."
                value={location}
                name="location"
                onChange={handleChange}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Amount:</label>
              <input
                className="modal-input transaction-input"
                type="text"
                placeholder="How much you spent..."
                value={amount}
                name="amount"
                onChange={handleChange}
              />
            </div>

            <input className="submit-btn" type="submit" value="Submit" />
          </form>

          <div className="footer">
            <button className="close-btn" onClick={flagToggle}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactionsReducer, budgetsReducer }) => ({
  ...transactionsReducer,
  ...budgetsReducer
});

export default connect(
  mapStateToProps,
  { setTransactionFormData, getTransactionData, flagToggle, getCurrentBudgets, handleChange, handleDate }
)(Modal);
