import React, {Component} from "react"
import { Motion, spring } from 'react-motion';
import BudgetBar from './BudgetBar';
import './budgets.css';

class BudgetType extends Component {
  constructor(props){
    super(props)

    this.state = {
      
    }
  }

  render(){
    const {
      inputError,
      input,
      showMenu,
      budgetTypes,
      addCurrentBudget,
      addBudgetType,
      showMenuToggle,
      handleChange,
      inputEnterPress
    } = this.props;

    const types = budgetTypes.map((e, i) => (
      <BudgetBar key={i} addType={addCurrentBudget} type={e} index={i} />
    ));
    
    return (
      <div className="budgets-container">
        <div className="add-budget-container">
          <div>
            <button className="view-type-btn" onClick={showMenuToggle}>
              {!showMenu ? 'View Budget Types' : 'Hide Budget Types'}
            </button>
            <input
              type="text"
              placeholder={
                inputError ? 'Must Enter Budget Name' : 'Enter Budget Name...'
              }
              onChange={handleChange}
              value={input}
              name="input"
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
              x: spring(showMenu ? 0 : -200),
              opacity: spring(showMenu ? 1 : 0)
            }}
          >
            {style => (
              <div
                style={{
                  transform: `translateX(${style.x}px)`,
                  opacity: style.opacity
                }}
              >
                {showMenu && budgetTypes.length ? (
                  <div className="menu">{types}</div>
                ) : showMenu ? (
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
    )
  }
}

export default BudgetType
