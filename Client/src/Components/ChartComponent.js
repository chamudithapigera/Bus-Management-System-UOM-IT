import React from 'react';
import { Line } from 'react-chartjs-2';


const ChartComponent = ({ data }) => {

  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: 'Present',
        data: data.map((entry) => entry.status === 'present' ? 1 : 0),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Absent',
        data: data.map((entry) => entry.status === 'absent' ? 1 : 0),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
