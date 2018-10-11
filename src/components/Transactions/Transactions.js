import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionData, setTransactionFormData } from '../../redux/reducers/transactionsReducer';
import budgetsReducer, { getCurrentBudgets } from '../../redux/reducers/budgetsReducer';

import TransactionTable from './TransactionTable';
import moment from 'moment';
import Modal from '../Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './transactions.css';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalFlag: false,
      budgets: [],
      errors: {
        budgetErr: false,
        locationErr: false,
        amountErr: false
      },
      date: moment(),
      selectedBudget: '',
      location: '',
      amount: 0
    };
  }

  componentDidMount = async () => {
    this.props.getTransactionData();
    const { value } = await this.props.getCurrentBudgets();
    this.setState({ budgets: value.data });
  };

  flagToggle = () => this.setState({ modalFlag: !this.state.modalFlag });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleDate = date => this.setState({ date });

  formValidation = () => {
    const { budgetType, location, amount } = this.state;

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

  handleSubmit = async () => {
    const { setTransactionFormData, getTransactionData } = this.props;
    const { date, location, amount, selectedBudget } = this.state;

    await this.formValidation();
    const isFormError = this.validateObj();

    if (isFormError) {
      return;
    } else {
      await setTransactionFormData(selectedBudget, date, location, amount);
      getTransactionData();
      this.flagToggle();
      this.setState({
        date: moment(),
        selectedBudget: '',
        location: '',
        amount: 0
      });
    }
  };

  render() {
    const { modalFlag, budgets, date, errors } = this.state;

    const budgetList = budgets.map((e, i) => {
      return <option key={i}>{e.type}</option>;
    });

    return (
      <div style={{ marginTop: 60 }}>
        <div className="add-transaction-container">
          <button className="add-transaction-btn" onClick={this.flagToggle}>
            Add Transaction
          </button>
          {modalFlag && (
            <Modal title="Add Transaction" toggleModal={this.flagToggle} handleSubmit={this.handleSubmit}>
              <div>
                <label>Select Budget:</label>
                <select
                  style={errors.budgetErr ? { border: 'solid 1px red' } : { border: 'solid 1px gray' }}
                  defaultValue="default"
                  className="transaction-select"
                  name="selectedBudget"
                  onChange={this.handleChange}
                >
                  <option value="default" disabled="disabled">
                    Select a Budget
                  </option>
                  {budgetList}
                </select>
              </div>

              <div>
                <label>Select Date:</label>
                <DatePicker
                  style={{ color: 'black' }}
                  className="transaction-datepicker"
                  selected={date}
                  onChange={date => this.handleDate(date)}
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <label>Enter Vendor/Business:</label>

                <input
                  className="text-input"
                  style={{ border: 'solid red 1px' }}
                  style={errors.locationErr ? { border: 'solid 1px red' } : { border: 'solid 1px gray' }}
                  type="text"
                  placeholder="Must enter location"
                  name="location"
                  onChange={this.handleChange}
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <label>Enter Amount:</label>

                <input
                  className="text-input"
                  type="number"
                  style={errors.amountErr ? { border: 'solid 1px red' } : { border: 'solid 1px gray' }}
                  placeholder="Must enter amount"
                  name="amount"
                  onChange={this.handleChange}
                />
              </div>
            </Modal>
          )}
        </div>
        <div className="display-transactions">
          <TransactionTable budgets={budgets} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transactionsReducer }) => ({
  ...transactionsReducer,
  ...budgetsReducer
});

export default connect(
  mapStateToProps,
  { getTransactionData, getCurrentBudgets, setTransactionFormData }
)(Transactions);
