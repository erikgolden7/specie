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
        checkErr: false,
        budgetErr: false,
        locationErr: false,
        amountErr: false
      },
      date: moment(),
      selectedBudget: '',
      location: '',
      amount: 0,
      incomeCheck: null
    };
  }

  componentDidMount = async () => {
    this.props.getTransactionData();
    const { value } = await this.props.getCurrentBudgets();
    this.setState({ budgets: value.data });
  };

  flagToggle = () => this.setState({ modalFlag: !this.state.modalFlag });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleCheck = e => this.setState({ incomeCheck: e });

  handleDate = date => this.setState({ date });

  formValidation = () => {
    const { budgetType, location, amount, incomeCheck } = this.state;

    this.setState(prevState => ({
      errors: { ...prevState.errors, checkErr: false, budgetErr: false, locationErr: false, amountErr: false }
    }));

    if (incomeCheck === null) {
      this.setState(prevState => ({ errors: { ...prevState.errors, checkErr: true } }));
    }
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
    const { date, location, amount, selectedBudget, incomeCheck } = this.state;

    await this.formValidation();
    const isFormError = this.validateObj();

    if (isFormError) {
      return;
    } else {
      await setTransactionFormData(selectedBudget, date, location, amount, incomeCheck);
      getTransactionData();
      this.flagToggle();
      this.setState({
        date: moment(),
        selectedBudget: '',
        location: '',
        amount: 0,
        incomeCheck: null
      });
    }
  };

  render() {
    const { modalFlag, budgets, date, errors, incomeCheck } = this.state;

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
                <label>Type of Transaction:</label>
                <div style={{ margin: '5px 0 20px 0' }}>
                  <input
                    type="radio"
                    value={true}
                    onChange={() => this.handleCheck(Boolean(true))}
                    name="incomeCheck"
                  />
                  Income
                  <input
                    style={{ marginLeft: 15 }}
                    type="radio"
                    value={false}
                    onChange={() => this.handleCheck(Boolean(false))}
                    name="incomeCheck"
                  />
                  Expense
                </div>

                {!incomeCheck && (
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
                )}
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
                {incomeCheck ? <label>Source of Income:</label> : <label>Enter Vendor/Business:</label>}

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
