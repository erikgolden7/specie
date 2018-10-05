import React, { Component } from 'react';
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

class Dashboard extends Component {
  render() {
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
              <Cell fill={colors[i % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}

export default Dashboard;
