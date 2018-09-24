import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as budgetReducer from '../../redux/reducers/budgetsReducer';

class BudgetModal extends Component {
  submitForm = async e => {
    const {
      flagToggle,
      selectedBudget,
      editCurrentBudget,
      getCurrentBudgets,
      getBudgetTypes,
      nameInput,
      amountInput
    } = this.props;

    e.preventDefault();

    flagToggle('showEdit');
    await editCurrentBudget(selectedBudget, nameInput, amountInput);
    getCurrentBudgets();
    getBudgetTypes();
  };

  render() {
    const {
      showEdit,
      nameInput,
      amountInput,
      flagToggle,
      handleChange
    } = this.props;

    if (!showEdit) {
      return null;
    }

    return (
      <div
        className="backdrop"
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 200
        }}
      >
        <div
          className="modal"
          style={{
            backgroundColor: '#fff',
            borderRadius: 3,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
          }}
        >
          <form onSubmit={this.submitForm}>
            <h3 style={{ margin: '5px 0 5px 0' }}>Change Name:</h3>
            <input
              className="modal-input"
              type="text"
              placeholder="Enter Name..."
              value={nameInput}
              name="nameInput"
              onChange={handleChange}
            />
            <h3 style={{ margin: '25px 0 10px 0' }}>Change Amount:</h3>
            <input
              className="modal-input"
              type="text"
              placeholder="Enter Amount..."
              value={amountInput}
              name="amountInput"
              onChange={handleChange}
            />
            <input
              style={{
                display: 'block',
                marginTop: 73,
                width: 150,
                height: 30,
                padding: 5,
                background: '#77B070',
                fontSize: 14,
                color: '#fff'
              }}
              type="submit"
              value="Submit"
            />
          </form>

          <div className="footer">
            <button
              style={{
                display: 'block',
                marginTop: 10,
                width: 150,
                height: 30,
                padding: 5,
                background: '#E16753',
                fontSize: 14,
                color: '#fff'
              }}
              onClick={() => flagToggle('showEdit')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showEdit: state.budgetsReducer.showEdit,
    nameInput: state.budgetsReducer.nameInput,
    amountInput: state.budgetsReducer.amountInput,
    selectedBudget: state.budgetsReducer.selectedBudget
  };
}

export default connect(
  mapStateToProps,
  budgetReducer
)(BudgetModal);
