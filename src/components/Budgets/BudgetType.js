import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import { connect } from 'react-redux';
import * as budgetReducer from '../../redux/reducers/budgetsReducer';

import BudgetBar from './BudgetBar';
import './budgets.css';

class BudgetType extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.getBudgetTypes();
  };

  render() {
    const {
      inputError,
      typeInput,
      showTypes,
      budgetTypes,
      addCurrentBudget,
      addBudgetType,
      flagToggle,
      handleChange,
      inputEnterPress
    } = this.props;

    console.log(this.props.budgetTypes);
    console.log(this.props.showTypes);

    const types = budgetTypes.map((e, i) => (
      <BudgetBar key={i} addType={addCurrentBudget} type={e} index={i} />
    ));

    return (
      <div className="budgets-container">
        <div className="add-budget-container">
          <div>
            <button
              className="view-type-btn"
              onClick={() => flagToggle('showTypes')}
            >
              {!showTypes ? 'View Budget Types' : 'Hide Budget Types'}
            </button>
            <input
              type="text"
              placeholder={
                inputError ? 'Must Enter Budget Name' : 'Enter Budget Name...'
              }
              onChange={handleChange}
              value={typeInput}
              name="typeInput"
              className="type-input"
              style={
                inputError
                  ? { border: 'solid 1px red' }
                  : { border: 'solid 1px gray' }
              }
              onKeyDown={inputEnterPress}
            />
            <button className="add-type-btn" onClick={addBudgetType}>
              +
            </button>
          </div>

          <Motion
            defaultStyle={{ x: 0, opacity: 0 }}
            style={{
              x: spring(showTypes ? 0 : -200),
              opacity: spring(showTypes ? 1 : 0)
            }}
          >
            {style => (
              <div
                style={{
                  transform: `translateX(${style.x}px)`,
                  opacity: style.opacity
                }}
              >
                {showTypes && budgetTypes.length ? (
                  <div className="menu">{types}</div>
                ) : showTypes ? (
                  <div className="menu">
                    <button
                      style={{ background: 'white', color: 'gray' }}
                      className="menu-item"
                    >
                      Please Add Budgets...
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </Motion>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.budgetsReducer);

  return {
    budgetTypes: state.budgetsReducer.budgetTypes,
    showTypes: state.budgetsReducer.showTypes,
    typeInput: state.budgetsReducer.typeInput,
    inputError: state.budgetsReducer.inputError
  };
}

export default connect(
  mapStateToProps,
  budgetReducer
)(BudgetType);
