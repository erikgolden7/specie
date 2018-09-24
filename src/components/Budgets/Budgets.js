import React, { Component } from 'react';
import { connect } from 'react-redux';
import BudgetType from './BudgetType';
import Modal from './Modal';
import * as budgetReducer from '../../redux/reducers/budgetsReducer';

import './budgets.css';

class Budgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: {},
      inputError: false,
      nameInput: '',
      amountInput: 0,
      selectedBudget: {}
    };
  }

  componentDidMount = () => {
    this.props.getCurrentBudgets();
  };

  editBudgetAmount = budget => {
    const temp = Object.assign({}, budget);
    const tempBudgets = [...this.state.currentBudgets];
    temp.amount = `$ ${0}`;

    tempBudgets.forEach((e, i) => {
      if (e.type === budget.type && e.color.light === budget.color.light) {
        tempBudgets.splice(i, 1, temp);
      }
    });

    this.props.flagToggle('editModal');

    this.setState({
      currentBudgets: tempBudgets,
      selectedBudget: temp
    });
  };

  toggleModal = () => {
    this.props.flagToggle('editModal');
  };

  submitForm = e => {
    e.preventDefault();
    const temp = Object.assign({}, this.state.selectedBudget);
    const tempBudgets = [...this.state.currentBudgets];

    tempBudgets.forEach((e, i, arr) => {
      if (e.type === temp.type && e.color.light === temp.color.light) {
        if (this.state.nameInput) {
          temp.type = this.state.nameInput;
        }
        if (this.state.amountInput) {
          temp.amount = Number(this.state.amountInput);
        }
        tempBudgets.splice(i, 1, temp);
      }
    });

    this.props.flagToggle('editModal');

    this.setState({
      currentBudgets: tempBudgets,
      selectedBudget: {},
      amountInput: 0,
      nameInput: ''
    });
  };

  render() {
    const { nameInput, amountInput } = this.state;
    const { currentBudgets } = this.props;
    console.log(currentBudgets);

    const budgets = currentBudgets.map((e, i) => {
      // <BudgetBar type={e} index={i} />;
      return (
        <button
          key={i}
          className="current-budget-item"
          style={{ background: e.light_color }}
          onClick={() => this.editBudgetAmount(e)}
        >
          {e.type}
          {e.amount ? <span>{e.amount}</span> : false}
        </button>
      );
    });

    return (
      <div className="budgets-view">
        <BudgetType />
        <div className="current-budgets">
          <h3 style={{ marginLeft: '2%' }}>Current Budgets</h3>
          <hr />
          <div className="current-budget-list">{budgets}</div>
          <Modal
            show={this.state.showEdit}
            onClose={this.toggleModal}
            handleChange={this.handleChange}
            submit={this.submitForm}
            name={nameInput}
            amount={amountInput}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    budgetTypes: state.budgetsReducer.budgetTypes,
    showTypes: state.budgetsReducer.showTypes,
    typeInput: state.budgetsReducer.typeInput,
    inputError: state.budgetsReducer.inputError,
    currentBudgets: state.budgetsReducer.currentBudgets
  };
}

export default connect(
  mapStateToProps,
  budgetReducer
)(Budgets);
