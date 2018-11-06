import React, { Component } from 'react';
import './credit.css';

class Credit extends Component {
  render() {
    return (
      <div>
        Credit
        <ul className="chart-credit">
          <li>
            <span>300</span>
          </li>
          <li>
            <span>500</span>
          </li>
          <li>
            <span>600</span>
          </li>
          <li>
            <span>650</span>
          </li>
          <li>
            <span>700</span>
          </li>
          <li>
            <span>750</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Credit;
