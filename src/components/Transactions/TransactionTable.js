import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as transactionsReducer from '../../redux/reducers/transactionsReducer';

class TransactionTable extends Component {
  render() {
    const { sortTable } = this.props;

    const dataMap = this.props.data.map((e, i) => {
      return (
        <tr key={i}>
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
            <th name="type" onClick={sortTable}>
              Type
            </th>
            <th>Location</th>
            <th>Date</th>
            <th>Amount</th>
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
