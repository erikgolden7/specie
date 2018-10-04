import React, { Component } from 'react';
// import { BarChart } from 'recharts';
import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
      </div>
    );
  }
}

export default Dashboard;
