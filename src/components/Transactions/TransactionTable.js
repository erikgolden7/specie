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

  onSort = key => {
    const { sortAsc } = this.state;
    const { data, sortData } = this.props;

    if (key === 'amount') {
      if (sortAsc) {
        data.sort((a, b) => a[key] - b[key]);
      } else {
        data.sort((a, b) => b[key] - a[key]);
      }
    } else {
      if (sortAsc) {
        data.sort((a, b) => a[key].localeCompare(b[key]));
      } else {
        data.sort((a, b) => b[key].localeCompare(a[key]));
      }
    }

    this.setState({ sortAsc: !sortAsc });
    sortData(data);
  };

  render() {
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
          <tr
            style={{
              position: 'sticky',
              top: 120
            }}
          >
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
