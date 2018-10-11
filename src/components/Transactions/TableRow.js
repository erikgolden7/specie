import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as TransactionReducer from '../../redux/reducers/transactionsReducer';

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowSelected: false,
      type: '',
      location: '',
      date: '',
      amount: 0
      // items: [],
      // itemsToAdd: []
    };
  }

  // addToList(item) {
  //   const items = [...this.state.items]
  //   const itemsToAdd = [...this.state.itemsToAdd];
  //   items.push(item);
  //   itemsToAdd.push(item);
  //   this.setState({ items, itemsToAdd})

  // }
  componentDidMount = () => {
    this.setState({
      type: this.props.e.type,
      location: this.props.e.location,
      date: this.props.e.date,
      amount: this.props.e.amount
    });
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  selectRow = () => this.setState({ rowSelected: true });

  closeRowEdit = () => this.setState({ rowSelected: false });

  onBlur = e => {
    const { type, location, date, amount } = this.state;
    const { id } = this.props.e;
    const currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.props.editTransactionData(id, type, location, amount, date);
        // this.props.getTransactionData();
        this.closeRowEdit();
      }
    }, 0);
  };
  // componentWillUnmount = () => {
  //   axios.post('/api/add_items', {items: this.state.itemsToAdd});

  //   req.body.items.forEach(val => {
  //     req.app.get('db').addItem(val.type, val.location, val.date);
  //   })
  // }

  render() {
    const { i, budgets } = this.props;
    const { type, location, date, amount, rowSelected } = this.state;

    const budgetList = budgets.map((e, i) => {
      return <option key={i}>{e.type}</option>;
    });

    if (rowSelected) {
      return (
        <tr tabIndex={i} onBlur={this.onBlur} style={{ background: '#676767' }} className="edit-row">
          <td onClick={this.closeRowEdit} style={{ width: 10, padding: '0 10px' }} className="row-close">
            <div className="row-close-img" />
          </td>
          <td>
            <select
              type="text"
              name="type"
              onChange={this.handleChange}
              value={type}
              className="row-input row-input-edit"
              style={{ height: 22 }}
            >
              {budgetList}
            </select>
          </td>

          <td>
            <input
              type="text"
              name="location"
              onChange={this.handleChange}
              value={location}
              className="row-input row-input-edit"
            />
          </td>

          <td>
            <input
              type="text"
              name="date"
              onChange={this.handleChange}
              value={date}
              className="row-input row-input-edit"
            />
          </td>

          <td>
            <input
              type="text"
              name="amount"
              onChange={this.handleChange}
              value={amount}
              className="row-input row-input-edit"
            />
          </td>
        </tr>
      );
    } else {
      return (
        <tr tabIndex={i} className="row" onClick={this.selectRow}>
          <td>{type}</td>
          <td>{location}</td>
          <td>{moment(date).format('MM/DD/YYYY')}</td>
          <td>{`$ ${amount}`}</td>
        </tr>
      );
    }
  }
}

const mapStateToProps = ({ transactionReducer }) => {
  return {
    ...transactionReducer
  };
};

export default connect(
  mapStateToProps,
  TransactionReducer
)(TableRow);
