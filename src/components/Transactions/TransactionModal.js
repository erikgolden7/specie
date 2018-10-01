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
      },
      blur: {
        budgetBlur: false,
        locationBlur: false,
        amountBlur: false
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
    if (amount <= 0 || amount === '') {
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
              <DatePicker className="transaction-datepicker" selected={date} onChange={date => handleDate(date)} />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Vendor/Business:</label>
              {this.state.errors.locationErr ? (
                <input
                  className="modal-input transaction-input"
                  style={{ border: 'solid red 1px' }}
                  type="text"
                  placeholder="Where your money went..."
                  value={location}
                  name="location"
                  onChange={handleChange}
                  onBlur={() => console.log('clicked')}
                />
              ) : (
                <input
                  className="modal-input transaction-input"
                  style={{ border: 'solid black 1px' }}
                  type="text"
                  placeholder="Must enter location..."
                  value={location}
                  name="location"
                  onChange={handleChange}
                />
              )}
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
  {
    setTransactionFormData,
    getTransactionData,
    flagToggle,
    getCurrentBudgets,
    handleChange,
    handleDate
  }
)(Modal);
