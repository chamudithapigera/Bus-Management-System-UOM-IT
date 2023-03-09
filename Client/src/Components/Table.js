import React from 'react';

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>BusID</th>
          <th>Capacity</th>
          <th>HaltNames</th>
        </tr>
      </thead>
      <tbody>
        {data.map(bus => (
          <tr key={bus.busID}>
            <td>{bus.busID}</td>
            <td>{bus.capacity}</td>
            <td>
            {bus.busHalts.map(BusHalt => (
                <div key={BusHalt.haltName}>{BusHalt.haltName}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
