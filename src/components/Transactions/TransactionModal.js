import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import * as transactionsReducer from '../../redux/reducers/transactionsReducer';
import 'react-datepicker/dist/react-datepicker.css';
import './transactions.css';
// import { flagToggle } from '../../redux/reducers/budgetsReducer';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      budgetType: '',
      location: '',
      amount: 0
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { budgetType, date, location, amount, setTransactionFormData, flagToggle } = this.props;
    const formatDate = moment(date).format('M/D/YY');

    setTransactionFormData(budgetType, formatDate, location, amount);
    flagToggle();
  };

  render() {
    const { budgetType, date, location, amount, flagToggle, handleChange } = this.props;

    return (
      <div className="backdrop">
        <div className="modal">
          <form className="transaction-form" onSubmit={this.handleSubmit}>
            <div>
              <label>Select Budget Type:</label>
              <select className="transaction-select" name="budgetType" value={budgetType} onChange={handleChange}>
                <option value="groceries">Groceries</option>
                <option value="entertainment">Entertainment</option>
                <option value="automotive">Automobile</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div>
              <label>Select Date:</label>
              <DatePicker
                className="transaction-datepicker"
                selected={date}
                onChange={date => this.setState({ date })}
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

const mapStateToProps = ({ transactionsReducer }) => ({
  ...transactionsReducer
});

export default connect(
  mapStateToProps,
  transactionsReducer
)(Modal);
