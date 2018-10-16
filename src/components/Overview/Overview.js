import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionData } from '../../redux/reducers/transactionsReducer';

// import { BarChart } from 'recharts';
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
    const transactions = await this.props.getTransactionData();
    console.log(transactions.value.data);
    this.setState({ transactions: transactions.value.data });
  };

  calculateChartData = date => {
    const { transactions } = this.state;
    let month = date.getMonth();
    let chartData = {};
    let monthKey = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };

    while (month > 0) {
      if (!chartData[month]) {
        chartData[monthKey[month]] = 0;
      }
      month--;
    }

    transactions.map((e, i) => {
      let transMonth = monthKey[parseInt(e.month, 10)];
      if (chartData.hasOwnProperty(transMonth)) {
        chartData[transMonth] += e.amount;
      }
    });

    console.log(chartData);
    return chartData;
  };

  render() {
    const date = new Date();
    const year = date.getFullYear();
    console.log(this.state.transactions);
    let myData = this.calculateChartData(date);

    const data = [
      { name: 'January', income: 5000, spent: -2400, amt: 2400 },
      { name: 'February', income: 3000, spent: -1398, amt: 2210 },
      { name: 'March', income: 2000, spent: -8800, amt: 2290 },
      { name: 'April', income: 2780, spent: -3908, amt: 2000 },
      { name: 'May', income: 6890, spent: -4800, amt: 2181 },
      { name: 'June', income: 2390, spent: -3800, amt: 2500 },
      { name: 'July', income: 3490, spent: -4300, amt: 2100 }
    ];

    const data1 = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 }
    ];
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
      <div style={{ marginTop: 80 }}>
        <h2>{year}</h2>

        <BarChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="spent" fill="#EB615F" />
          <Bar dataKey="income" fill="#4EC375" />
        </BarChart>

        <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
          <Pie data={data1} cx={300} cy={200} label outerRadius={80} fill="#8884d8">
            {data1.map((e, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}

const mapDispatchToProps = ({ TransactionReducer }) => {
  return {
    ...TransactionReducer
  };
};

export default connect(
  mapDispatchToProps,
  { getTransactionData }
)(Overview);
