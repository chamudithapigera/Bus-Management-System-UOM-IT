
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import '../Css/bus.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';




const columns = [
  { field: "busID", headerName: "BUS ID", width: 100 },
  { field: "capacity", headerName: "capacity", width: 130 },
];

const BusNew = () => {

  const [buses, setBuses] = useState([]);
  useEffect(() => {
    loadBuses();

  }, []);

  const loadBuses = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/bus_detail/viewBus");
    setBuses(result.data);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle"></div>
      <DataGrid
        className="datagrid"
        rows={buses.map((bus, index) => ({
          busID: bus.busID,
          capacity: bus.capacity,

        }))}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default BusNew;