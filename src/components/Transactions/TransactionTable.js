import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as transactionsReducer from '../../redux/reducers/transactionsReducer';
import './transactions.css';

class TransactionTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortAsc: true
    };
  }

  onSort = sortKey => {
    const { sortAsc } = this.state;
    let tempData = [...this.props.data];
    console.log(tempData);

    if (this.state.sortAsc) {
      tempData.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    } else {
      tempData.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
    }
    this.setState({ sortAsc: !sortAsc });

    this.props.sortData(tempData);
  };

  render() {
    console.log(this.props.data);

    const dataMap = this.props.data.map((e, i) => {
      return (
        <tr className="row" key={i}>
          <td>{e.type}</td>
          <td>{e.location}</td>
          <td>{moment(e.date).format('MM/DD/YYYY')}</td>
          <td>{`$ ${e.amount}`}</td>
        </tr>
      );
    });

    return (
      <table>
        <tbody>
          <tr>
            <th onClick={() => this.onSort('type')} name="type">
              Type
              <div className="sort" />
            </th>
            <th onClick={() => this.onSort('location')}>
              Location <div className="sort" />
            </th>
            <th onClick={() => this.onSort('date')}>
              {' '}
              Date <div className="sort" />
            </th>
            <th onClick={() => this.onSort('amount')}>
              {' '}
              Amount <div className="sort" />
            </th>
          </tr>
          {dataMap}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ transactionsReducer }) => {
  return {
    ...transactionsReducer
  };
};

export default connect(
  mapStateToProps,
  transactionsReducer
)(TransactionTable);
