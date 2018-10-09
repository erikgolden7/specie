import React, { Component } from 'react';
import moment from 'moment';

export default class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      rowSelected: false,
      type: this.props.e.type,
      location: this.props.e.location,
      date: this.props.e.date,
      amount: this.props.e.amount
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  selectRow = () => {
    this.setState({ rowSelected: true });
  };

  closeRowEdit = () => this.setState({ rowSelected: false });

  render() {
    const { e, i } = this.props;
    const { type, location, date, amount, rowSelected } = this.state;

    if (rowSelected) {
      return (
        <tr style={{ background: '#676767' }} className="row">
          <td onClick={this.closeRowEdit} style={{ width: 20 }} className="row-close">
            <div className="row-close-img" />
          </td>
          <td>
            <input type="text" name="type" onChange={this.handleChange} value={type} className="row-input" />
          </td>

          <td>
            <input type="text" name="location" onChange={this.handleChange} value={location} className="row-input" />
          </td>

          <td>
            <input type="text" name="date" onChange={this.handleChange} value={date} className="row-input" />
          </td>

          <td>
            <input type="text" name="amount" onChange={this.handleChange} value={amount} className="row-input" />
          </td>
        </tr>
      );
    } else {
      return (
        <tr className="row" onClick={this.selectRow}>
          <td>{e.type}</td>
          <td>{e.location}</td>
          <td>{moment(e.date).format('MM/DD/YYYY')}</td>
          <td>{`$ ${e.amount}`}</td>
        </tr>
      );
    }
  }
}
