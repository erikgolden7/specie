import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import {
  setTransactionFormData,
  getTransactionData,
  flagToggle,
  handleChange,
  handleDate,
  transactionFormValidation
} from '../../redux/reducers/transactionsReducer';
import { getCurrentBudgets } from '../../redux/reducers/budgetsReducer';
import 'react-datepicker/dist/react-datepicker.css';
import './transactions.css';

class Modal extends Component {
  componentDidMount = () => {
    this.props.getCurrentBudgets();
  };

  formValidation = () => {
    const { budgetType, location, amount } = this.props;

    let errors = {
      budgetErr: false,
      locErr: false,
      amtErr: false,
      isErr: false
    };

    let { budgetErr, locErr, amtErr, isErr, errMsg } = errors;

    if (budgetType !== '') {
      budgetErr = true;
    }
    if (location !== '') {
      locErr = true;
    }
    if (amount > 0) {
      amtErr = true;
    }
    console.log(budgetErr, locErr, amtErr);

    if (budgetErr && locErr && amtErr === true) {
      isErr = true;
    }

    transactionFormValidation(errors);

    return isErr;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { budgetType, date, location, amount, setTransactionFormData, flagToggle } = this.props;

    const isFormError = this.formValidation();

    if (!isFormError.isErr) {
      console.log(isFormError.errMsg);
    } else {
      await setTransactionFormData(budgetType, date, location, amount);
      this.props.getTransactionData();
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
  {
    setTransactionFormData,
    getTransactionData,
    flagToggle,
    getCurrentBudgets,
    handleChange,
    handleDate,
    transactionFormValidation
  }
)(Modal);

// function validate(email, password) {
//   // true means invalid, so our conditions got reversed
//   return {
//     email: email.length === 0,
//     password: password.length === 0,
//   };
// }

// class SignUpForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',

//       touched: {
//         email: false,
//         password: false,
//       },
//     };
//   }

//   handleEmailChange = (evt) => {
//     this.setState({ email: evt.target.value });
//   }

//   handlePasswordChange = (evt) => {
//     this.setState({ password: evt.target.value });
//   }

//   handleBlur = (field) => (evt) => {
//     this.setState({
//       touched: { ...this.state.touched, [field]: true },
//     });
//   }

//   handleSubmit = (evt) => {
//     if (!this.canBeSubmitted()) {
//       evt.preventDefault();
//       return;
//     }
//     const { email, password } = this.state;
//     alert(`Signed up with email: ${email} password: ${password}`);
//   }

//   canBeSubmitted() {
//     const errors = validate(this.state.email, this.state.password);
//     const isDisabled = Object.keys(errors).some(x => errors[x]);
//     return !isDisabled;
//   }

//   render() {
//     const errors = validate(this.state.email, this.state.password);
//     const isDisabled = Object.keys(errors).some(x => errors[x]);

//     const shouldMarkError = (field) => {
//       const hasError = errors[field];
//       const shouldShow = this.state.touched[field];

//       return hasError ? shouldShow : false;
//     };

//     return (
//       <form onSubmit={this.handleSubmit}>
//         <input
//           className={shouldMarkError('email') ? "error" : ""}
//           type="text"
//           placeholder="Enter email"
//           value={this.state.email}
//           onChange={this.handleEmailChange}
//           onBlur={this.handleBlur('email')}
//         />
//         <input
//           className={shouldMarkError('password') ? "error" : ""}
//           type="password"
//           placeholder="Enter password"
//           value={this.state.password}
//           onChange={this.handlePasswordChange}
//           onBlur={this.handleBlur('password')}
//         />
//         <button disabled={isDisabled}>Sign up</button>
//       </form>
//     )
//   }
// }
