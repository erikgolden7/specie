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
  constructor(props) {
    super(props);

    this.state = {
      errors: {
        budgetErr: false,
        locationErr: false,
        amountErr: false
      }
    };
  }

  componentDidMount = () => {
    this.props.getCurrentBudgets();
  };

  formValidation = () => {
    const { budgetType, location, amount } = this.props;

    this.setState(prevState => ({
      errors: { ...prevState.errors, budgetErr: false, locationErr: false, amountErr: false }
    }));

    if (budgetType === '') {
      this.setState(prevState => ({ errors: { ...prevState.errors, budgetErr: true } }));
    }
    if (location === '') {
      this.setState(prevState => ({ errors: { ...prevState.errors, locationErr: true } }));
    }
    if (amount === 0) {
      this.setState(prevState => ({ errors: { ...prevState.errors, amountErr: true } }));
    }
  };

  validateObj = () => {
    const { errors } = this.state;

    for (let key in errors) {
      if (errors[key] === true) {
        return true;
      }
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { budgetType, date, location, amount, setTransactionFormData, getTransactionData, flagToggle } = this.props;

    await this.formValidation();
    const isFormError = this.validateObj();

    if (isFormError) {
      console.log('error found');
    } else {
      await setTransactionFormData(budgetType, date, location, amount);
      getTransactionData();
      flagToggle();
    }
  };

  render() {
    const { date, flagToggle, handleChange, currentBudgets, handleDate } = this.props;

    const budgets = currentBudgets.map((e, i) => {
      return <option key={i}>{e.type}</option>;
    });

    return (
      <div className="backdrop">
        <div className="modal">
          <form className="transaction-form" onSubmit={this.handleSubmit}>
            <div>
              <label>Select Budget:</label>
              <select
                style={{ border: 'solid 1px gray' }}
                defaultValue="default"
                className="transaction-select"
                name="budgetType"
                onChange={handleChange}
              >
                <option value="default" disabled="disabled">
                  Select a Budget
                </option>
                {budgets}
              </select>
            </div>

            <div>
              <label>Select Date:</label>
              <DatePicker
                style={{ color: 'black' }}
                className="transaction-datepicker"
                selected={date}
                onChange={date => handleDate(date)}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Vendor/Business:</label>
              {this.state.errors.locationErr ? (
                <input
                  className="text-input"
                  style={{ border: 'solid red 1px' }}
                  type="text"
                  placeholder="Must enter location"
                  name="location"
                  onChange={handleChange}
                />
              ) : (
                <input
                  className="text-input"
                  style={{ border: 'solid gray 1px' }}
                  type="text"
                  placeholder="Where your money went..."
                  name="location"
                  onChange={handleChange}
                />
              )}
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Amount:</label>

              {this.state.errors.amountErr ? (
                <input
                  className="text-input"
                  type="number"
                  style={{ border: 'solid red 1px' }}
                  placeholder="Must enter amount"
                  name="amount"
                  onChange={handleChange}
                />
              ) : (
                <input
                  className="text-input"
                  type="number"
                  style={{ border: 'solid gray 1px' }}
                  placeholder="How much you spent..."
                  name="amount"
                  onChange={handleChange}
                />
              )}
            </div>
            <div style={{ height: 70 }}>
              <button className="submit-btn" style={{ marginTop: 30 }} type="submit">
                Submit
              </button>
            </div>
          </form>

          <div className="footer">
            <button
              className="close-btn"
              style={{
                marginTop: -30,
                float: 'right'
              }}
              onClick={flagToggle}
            >
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
  {
    setTransactionFormData,
    getTransactionData,
    flagToggle,
    getCurrentBudgets,
    handleChange,
    handleDate
  }
)(Modal);
