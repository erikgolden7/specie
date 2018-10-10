import React, { Component } from 'react';
import TableRow from './TableRow';
import { connect } from 'react-redux';
import * as transactionsReducer from '../../redux/reducers/transactionsReducer';
import './transactions.css';

class TransactionTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortAsc: true,
      data: this.props.data
    };
  }

  onSort = key => {
    const { sortAsc } = this.state;
    const { transactions, sortData } = this.props;

    const data = [...transactions];

    if (key === 'amount') {
      if (sortAsc) {
        data.sort((a, b) => a[key] - b[key] || a['type'] - b['type']);
      } else {
        data.sort((a, b) => b[key] - a[key] || a['type'] - b['type']);
      }
    } else {
      if (sortAsc) {
        data.sort((a, b) => a[key].localeCompare(b[key]) || a['type'].localeCompare(b['type']));
      } else {
        data.sort((a, b) => b[key].localeCompare(a[key]) || a['type'].localeCompare(b['type']));
      }
    }

    this.setState({ sortAsc: !sortAsc });
    sortData(data);
  };

  render() {
    const { budgets, transactions } = this.props;

    const dataMap = transactions.map((e, i) => {
      return <TableRow key={e.id} e={e} i={i} id={e.id} budgets={budgets} />;
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
              Date <div className="sort" />
            </th>
            <th onClick={() => this.onSort('amount')}>
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
