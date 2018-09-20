import React, { Component } from 'react';
// import axios from 'axios';
import BudgetType from "./BudgetType"
import Modal from './Modal';
import './budgets.css';

class Budgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      budgetTypes: [],
      currentBudgets: [],
      color: {},
      input: '',
      inputError: false,
      nameInput: '',
      amountInput: '',
      selectedBudget: {}
    };
  }

  getRandomColor = () => {
    const h = Math.floor(Math.random() * 360),
      s = Math.floor(Math.random() * 60) + '%',
      light = '50%',
      dark = '30%';

    return { light: `hsl(${h},${s},${light})`, dark: `hsl(${h},${s},${dark})` };
  };



  inputEnterPress = e => {
    if (e.keyCode === 13) {
      this.addBudgetType(e);
    }
  };

  showMenuToggle = e => {
    e.preventDefault();
    this.setState({ showMenu: !this.state.showMenu });
  };

  addBudgetType = e => {
    if (!this.state.input) {
      this.setState({ inputError: true });
      return;
    }

    const hue = this.getRandomColor();
    const types = this.state.budgetTypes.slice();

    types.push({
      type: this.state.input,
      color: { light: hue.light, dark: hue.dark },
      amount: `$ ${0}`
    });

    this.setState({
      budgetTypes: types,
      inputError: false,
      showMenu: true,
      isOpen: false,
      input: ''
    });
  };

  addCurrentBudget = type => {
    const tempTypes = [...this.state.budgetTypes];
    const tempBudgets = [...this.state.currentBudgets];
    tempBudgets.push(type);

    tempTypes.forEach((e, i, arr) => {
      if (e.type === type.type && e.color.light === type.color.light) {
        tempTypes.splice(i, 1);
      }
    });

    this.setState({ currentBudgets: tempBudgets, budgetTypes: tempTypes });
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

    this.setState({
      currentBudgets: tempBudgets,
      isOpen: !this.state.isOpen,
      selectedBudget: temp
    });
  };

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
          temp.amount = `$ ${Number(this.state.amountInput)}`;
        }
        tempBudgets.splice(i, 1, temp);
      }
    });

    this.setState({
      currentBudgets: tempBudgets,
      selectedBudget: {},
      amountInput: '',
      nameInput: '',
      isOpen: !this.state.isOpen
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      inputError,
      input,
      showMenu,
      budgetTypes,
      currentBudgets,
      nameInput,
      amountInput
    } = this.state;

    const budgets = currentBudgets.map((e, i) => {
      // <BudgetBar type={e} index={i} />;
      return (
        <button
          key={i}
          className="current-budget-item"
          style={{ background: e.color.light }}
          onClick={() => this.editBudgetAmount(e)}
        >
          {e.type}
          {e.amount ? <span>{e.amount}</span> : false}
        </button>
      );
    });

    return (
      <div className="budgets-view">
        <BudgetType showMenuToggle={this.showMenuToggle} showMenu={showMenu} handleChange={this.handleChange} input={input} inputEnterPress={this.inputEnterPress}  budgetTypes={budgetTypes} addBudgetType={this.addBudgetType} addCurrentBudget={this.addCurrentBudget} inputError={inputError}/>
          <div className="current-budgets">
            <h3 style={{ marginLeft: '2%' }}>Current Budgets</h3>
            <hr />
            <div className="current-budget-list">{budgets}</div>
            <Modal show={this.state.isOpen} onClose={this.toggleModal} handleChange={this.handleChange} submit={this.submitForm} name={nameInput} amount={amountInput} />
          </div>
      </div>
    );
  }
}

export default Budgets;
