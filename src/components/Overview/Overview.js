import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionData } from '../../redux/reducers/transactionsReducer';
import { getCurrentBudgets } from '../../redux/reducers/budgetsReducer';
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

class Overview extends Component {
  componentDidMount = async () => {
    this.props.getTransactionData();
    this.props.getCurrentBudgets();
  };

  calculateBarChartData = (month, year) => {
    const { transactions } = this.props;
    let chartData = [];
    let monthKey = {
      1: 'Jan',
      2: 'Feb',
      3: 'Mar',
      4: 'Apr',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'Aug',
      9: 'Sept',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec'
    };

    while (month > 0) {
      if (!chartData.includes(monthKey[month])) {
        chartData.unshift({ name: monthKey[month], income: 0, spent: 0 });
      }
      month--;
    }

    transactions.forEach(e => {
      let transMonth = monthKey[parseInt(e.month, 10)];

      if (year === e.year) {
        if (e.income === true) {
          chartData.forEach(el => (el.name === transMonth ? (el.income += e.amount) : false));
        } else {
          chartData.forEach(el => (el.name === transMonth ? (el.spent -= e.amount) : false));
        }
      }
    });

    return chartData;
  };

  calculatePieChartData = (month, year) => {
    const { currentBudgets, transactions } = this.props;
    let pieChartData = [];

    currentBudgets.forEach(e => {
      pieChartData.push({ name: e.type, value: 0, color: e.light_color });
    });

    transactions.map(e => {
      if (parseInt(e.month, 10) === month && year === e.year) {
        pieChartData.forEach(el => {
          if (e.type === el.name) {
            el.value += e.amount;
          }
        });
      }
    });

    return pieChartData.filter(e => e.value > 0);
  };

  render() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let barData = this.calculateBarChartData(month, year);
    let pieData = this.calculatePieChartData(month, year);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 120 }}>
        <div>
          <h2 style={{ marginLeft: 35 }}>{year} Transaction History</h2>

          <BarChart width={600} height={400} data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="income" fill="#4EC375" />
            <Bar dataKey="spent" fill="#EB615F" />
          </BarChart>
        </div>

        <div>
          <h2 style={{ textAlign: 'center' }}>Current Month Budgets</h2>
          <PieChart width={400} height={400}>
            <Pie isAnimationActive={false} data={pieData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
              {pieData.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = ({ transactionsReducer, budgetsReducer }) => {
  return {
    ...transactionsReducer,
    ...budgetsReducer
  };
};

export default connect(
  mapDispatchToProps,
  { getTransactionData, getCurrentBudgets }
)(Overview);
