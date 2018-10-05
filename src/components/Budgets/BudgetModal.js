import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as budgetReducer from '../../redux/reducers/budgetsReducer';

class BudgetModal extends Component {
  deleteBudget = async () => {
    const { removeBudgetType, flagToggle, selectedBudget, getCurrentBudgets } = this.props;

    await removeBudgetType(selectedBudget);
    flagToggle('showEdit');
    getCurrentBudgets();
  };

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
    const { showEdit, flagToggle, handleChange } = this.props;

    if (!showEdit) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          <button className="delete-icon" style={{ float: 'right' }} onClick={this.deleteBudget} />
          <form onSubmit={this.submitForm}>
            <div style={{ marginTop: 20 }}>
              <label>Change Name:</label>
              <input
                className="text-input"
                type="text"
                placeholder="Enter Name..."
                name="nameInput"
                onChange={handleChange}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <label>Change Amount:</label>
              <input
                className="text-input"
                type="text"
                placeholder="Enter Amount..."
                name="amountInput"
                onChange={handleChange}
              />
            </div>

            <input className="submit-btn" type="submit" value="Submit" />
          </form>

          <div className="footer">
            <button className="close-btn" onClick={() => flagToggle('showEdit')}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ budgetsReducer }) => ({
  ...budgetsReducer
});

export default connect(
  mapStateToProps,
  budgetReducer
)(BudgetModal);
