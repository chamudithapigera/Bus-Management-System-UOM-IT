import React from 'react';

const MonthlyReport = ({ report }) => {
  return (
    <div>
      <h2>Monthly Report</h2>
      <ul>
        {Object.entries(report).map(([driverID, count]) => (
          <li key={driverID}>
            Driver ID: {driverID}, Count: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyReport;
