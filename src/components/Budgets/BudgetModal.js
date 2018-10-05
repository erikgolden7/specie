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
    const { showEdit, nameInput, amountInput, flagToggle, handleChange } = this.props;

    if (!showEdit) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          <button className="delete-icon" style={{ float: 'right' }} onClick={this.deleteBudget} />
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
            <input className="modal-submit-btn" type="submit" value="Submit" />
          </form>

          <div className="footer">
            <button
              className="close-btn"
              style={{
                float: 'right',
                marginTop: 121
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

const mapStateToProps = ({ budgetsReducer }) => ({
  ...budgetsReducer
});

export default connect(
  mapStateToProps,
  budgetReducer
)(BudgetModal);
