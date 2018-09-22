import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { setTransactionFormData } from '../../redux/reducers/transactionsReducer';
import 'react-datepicker/dist/react-datepicker.css';
import './transactions.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      budgetType: '',
      location: '',
      amount: 0
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { budgetType, date, location, amount } = this.state;
    const formatDate = moment(date).format('M/D/YY');

    this.props.setTransactionFormData(budgetType, formatDate, location, amount);
    this.props.toggleModal();
  };

  render() {
    const { budgetType, date, location, amount } = this.state;

    return (
      <div className="backdrop">
        <div className="modal">
          <form className="transaction-form" onSubmit={this.handleSubmit}>
            <div>
              <label>Select Budget Type:</label>
              <select
                className="transaction-select"
                name="budgetType"
                value={this.state.budgetType}
                onChange={this.handleInput}
              >
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
                selected={this.state.date}
                onChange={date => this.setState({ date })}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Vendor/Business:</label>
              <input
                className="modal-input transaction-input"
                type="text"
                placeholder="Where your money went..."
                value={this.props.amount}
                name="location"
                onChange={this.handleInput}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Amount:</label>
              <input
                className="modal-input transaction-input"
                type="text"
                placeholder="How much you spent..."
                value={this.props.name}
                name="amount"
                onChange={this.handleInput}
              />
            </div>

            <input className="submit-btn" type="submit" value="Submit" />
          </form>

          <div className="footer">
            <button className="close-btn" onClick={this.props.toggleModal}>
              Close
            </button>
          </div>
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
  { setTransactionFormData }
)(Modal);
