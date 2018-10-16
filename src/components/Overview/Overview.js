import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionData } from '../../redux/reducers/transactionsReducer';
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
  constructor(props) {
    super(props);

    this.state = {
      transactions: []
    };
  }

  componentDidMount = async () => {
    await this.props.getTransactionData();
  };

  calculateChartData = date => {
    const { transactions } = this.props;
    let month = date.getMonth();
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
        chartData.push({ name: monthKey[month], income: 0, spent: 0 });
      }
      month--;
    }

    transactions.forEach((e, i) => {
      let transMonth = monthKey[parseInt(e.month, 10)];

      if (e.income === true) {
        chartData.forEach(el => (el.name === transMonth ? (el.income += e.amount) : false));
      } else {
        chartData.forEach(el => (el.name === transMonth ? (el.spent -= e.amount) : false));
      }
    });

    return chartData;
  };

  render() {
    const date = new Date();
    const year = date.getFullYear();
    let data = this.calculateChartData(date);

    const data1 = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 }
    ];
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
      <div style={{ marginTop: 80, display: 'flex', marginTop: 120 }}>
        <h2>{year}</h2>

        <BarChart width={600} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="spent" fill="#EB615F" />
          <Bar dataKey="income" fill="#4EC375" />
        </BarChart>

        <PieChart width={400} height={400}>
          <Pie isAnimationActive={false} data={data1} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
            {data1.map((e, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    );
  }
}

const mapDispatchToProps = ({ transactionsReducer }) => {
  return {
    ...transactionsReducer
  };
};

export default connect(
  mapDispatchToProps,
  { getTransactionData }
)(Overview);
