import React, { Component } from 'react';
import { connect } from 'react-redux';
import BudgetType from './BudgetType';
import Modal from './Modal';
import {
  addBudgetType,
  getBudgetTypes
} from '../../redux/reducers/budgetsReducer';
import { getRandomColor } from '../../services/funcService';
import './budgets.css';

class Budgets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBudgets: [],
      color: {},
      inputError: false,
      nameInput: '',
      amountInput: 0,
      selectedBudget: {}
    };
  }

  inputEnterPress = e => {
    if (e.keyCode === 13) {
      this.addBudgetType(e);
    }
  };

  addBudgetType = async () => {
    const { typeInput, flagToggle } = this.props;

    if (!typeInput) {
      flagToggle('inputError');
      return;
    }

    const hue = getRandomColor();
    const typeData = {
      type: typeInput,
      color: { light: hue.light, dark: hue.dark },
      amount: 0
    };

    const types = await this.props
      .addBudgetType(typeData)
      .catch(err => console.log(err));

    console.log(types);

    flagToggle('editModal');
    flagToggle('showTypes');
    flagToggle('inputError');

    this.setState({
      typeInput: ''
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
      // showEdit: false
    });
  };

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  render() {
    const {
      // inputError,
      // typeInput,
      // showTypes,
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
        <BudgetType
          // flagToggle={this.flagToggle}
          // showTypes={showTypes}
          // handleChange={this.handleChange}
          // typeInput={input}
          inputEnterPress={this.inputEnterPress}
          budgetTypes={this.props.budgetTypes}
          addBudgetType={this.addBudgetType}
          addCurrentBudget={this.addCurrentBudget}
          // inputError={inputError}
        />
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
  // console.log(state.budgetsReducer);
  return {
    budgetTypes: state.budgetsReducer.budgetTypes,
    showTypes: state.budgetsReducer.showTypes,
    typeInput: state.budgetsReducer.typeInput,
    inputError: state.budgetsReducer.inputError
  };
}

export default connect(
  mapStateToProps,
  { addBudgetType, getBudgetTypes }
)(Budgets);
