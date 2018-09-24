import React from 'react';

const BudgetBar = props => {
  return (
    <button
      key={props.index}
      style={{ background: props.budget.light_color }}
      className="menu-item"
      onClick={() => props.addSelectedBudget(props.budget)}
    >
      {props.budget.type}
    </button>
  );
};

export default BudgetBar;
