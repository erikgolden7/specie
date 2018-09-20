import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './transactions.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment()
    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal">
          <form className="transaction-form" onSubmit={this.props.submit}>
            <div>
              <label>Select Budget Type:</label>
              <select className="transaction-select">
                <option defaultValue value="grapefruit">
                  Groceries
                </option>
                <option value="lime">Entertainment</option>
                <option value="coconut">Automobile</option>
                <option value="mango">Education</option>
              </select>
            </div>

            <div>
              <label>Select Date:</label>
              <DatePicker
                className="transaction-datepicker"
                selected={this.state.date}
                onChange={date => this.setState({ date })}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Vendor/Business:</label>
              <input
                className="modal-input transaction-input"
                type="text"
                placeholder="Where your money went..."
                value={this.props.amount}
                name="amountInput"
                onChange={this.props.handleChange}
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <label>Enter Amount:</label>
              <input
                className="modal-input transaction-input"
                type="text"
                placeholder="How much you spent..."
                value={this.props.name}
                name="nameInput"
                onChange={this.props.handleChange}
              />
            </div>

            <input className="submit-btn" type="submit" value="Submit" />
          </form>

          <div className="footer">
            <button className="close-btn" onClick={this.props.toggleModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
