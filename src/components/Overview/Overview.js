import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactionData } from '../../redux/reducers/transactionsReducer';
import { getCurrentBudgets } from '../../redux/reducers/budgetsReducer';
import { monthNames } from '../../services/constService';
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

import './overview.css';
// import Transactions from '../Transactions/Transactions';

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pieMonth: 0
    };
  }

  componentDidMount() {
    var date = new Date();
    var month = date.getMonth() + 1;

    this.setState({ pieMonth: month });

    this.props.getTransactionData();
    this.props.getCurrentBudgets();
  }

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
      let transMonth = monthKey[parseInt(e.month, month)];

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

    currentBudgets.forEach(e => pieChartData.push({ name: e.type, value: 0, color: e.light_color }));

    transactions.forEach(e => {
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

  changeMonth = type => {
    if (type === 'inc') {
      if (this.state.pieMonth < 12) {
        this.setState({ pieMonth: this.state.pieMonth + 1 });
      }
    } else {
      if (this.state.pieMonth > 1) {
        this.setState({ pieMonth: this.state.pieMonth - 1 });
      }
    }
  };

  getCurrentMonth = year => {
    let { transactions } = this.props;
    let data = [];

    transactions.forEach(e => {
      if (parseInt(e.month, 10) === this.state.pieMonth && year === e.year && e.type !== '') {
        data.push(e);
      }
    });

    return data;
  };

  findMaxBudget = (data, year) => {
    let max = { name: '', value: 0 };
    let monthTransactions = this.getCurrentMonth(year);

    if (monthTransactions.length === 0) return { max: 'none', top: 'none', topAmount: 0 };

    let modeMap = {};
    let maxEl = monthTransactions[0].type;
    let maxCount = 1;

    for (let i = 0; i < monthTransactions.length; i++) {
      let el = monthTransactions[i].type;

      if (!modeMap[el] && el !== '') modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }

    data.forEach(e => {
      e.value >= max.value ? ((max.value = e.value), (max.name = e.name)) : false;
    });

    return { max: max, top: maxEl, topAmount: modeMap[maxEl] };
  };

  downloadCSV = (args, pieData) => {
    pieData.map(e => console.log(e));

    let data, filename, link;
    let csv = this.convertArrayOfObjectsToCSV({
      data: pieData
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  };

  convertArrayOfObjectsToCSV = args => {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(item => {
      ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  render() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let barData = this.calculateBarChartData(month, year);
    let pieData = this.calculatePieChartData(this.state.pieMonth, year);
    let maxInfo = this.findMaxBudget(pieData, year);
    console.log(maxInfo);

    let total = pieData.reduce((sum, val) => (sum += val.value), 0);

    let summary = pieData.map((e, i) => {
      return (
        <div key={i} style={{ borderBottom: 'dotted black 1px' }}>
          <div className="budget-summary-row">
            <p>{e.name}</p>
            <p>{`$${e.value.toFixed(2)}`}</p>
          </div>
        </div>
      );
    });

    return (
      <div style={{ marginTop: 60 }}>
        <div className="summary-section">
          <div className="chart-year">
            <h2 style={{ marginLeft: 50, textAlign: 'center' }}>{year} Transaction Overview</h2>

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

          <div className="chart-month">
            <div className="pie-header">
              <div className="left-arrow" onClick={this.changeMonth} />
              <h2 style={{ textAlign: 'center' }}>{monthNames[this.state.pieMonth - 1]} Spending by Category</h2>
              <div className="right-arrow" onClick={() => this.changeMonth('inc')} />
            </div>

            {pieData.length > 0 ? (
              <PieChart width={450} height={400}>
                <Pie isAnimationActive={true} data={pieData} cx={220} cy={200} outerRadius={120} fill="#8884d8" label>
                  {pieData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <div className="no-data-message"> No chart data available... </div>
            )}
          </div>
        </div>

        <div className="month-section">
          <div className="budget-summary">
            <h3 style={{ textAlign: 'left' }}>Your Spending</h3>
            <div className="budget-summary-row">
              <h6>Category</h6>
              <h6>Spending</h6>
            </div>
            {summary}
            <div className="budget-summary-row">
              <h4>Total</h4>
              <h4>{`$${total.toFixed(2)}`}</h4>
            </div>
            <p className="csv" onClick={() => this.downloadCSV({ filename: 'budget-data.csv' }, pieData)}>
              Download CSV
            </p>
          </div>
          <div>
            <div className="budget-summary" style={{ marginBottom: 15 }}>
              <h3>Most Spent</h3>
              <div style={{ fontSize: 17, fontWeight: 'bold', marginTop: 6 }}>${maxInfo.max.value}</div>
              <div style={{ marginBottom: 10, marginTop: 1, color: 'gray' }}>on {maxInfo.max.name}</div>
            </div>
            <div className="budget-summary">
              <h3>Most Purchases</h3>
              <div style={{ fontSize: 17, fontWeight: 'bold', marginTop: 6 }}>{maxInfo.topAmount}</div>
              <div style={{ marginBottom: 10, marginTop: 1, color: 'gray' }}>on {maxInfo.top}</div>
            </div>
          </div>
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
