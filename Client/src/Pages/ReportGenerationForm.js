import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Css/report.scss';
import ReactToPrint from "react-to-print";
import axios from "axios";

export default function ReportGenerationForm() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [tableActive, setTableActive] = useState(false);
  const [reportActive, setReportActive] = useState(true);
  const [attendance, setAttendance] = useState([]);

  function Cancel() {
    setReportActive(!reportActive);
    setTableActive(!tableActive);
  }

  async function generateReport() {
    setReportActive(!reportActive);
    setTableActive(!tableActive);

    try {
      const response = await axios.get("http://localhost:8080/api/v1/attendance/filter", {
        params: {
          fromDate: fromDate,
          toDate: toDate
        }
      });

      const filteredAttendance = response.data;
      setAttendance(filteredAttendance);
    } catch (error) {
      console.error(error);
    }
  }


  const componentRef = useRef();


  return (
    <div className='bus'>
      <Sidebar></Sidebar>
      <div className='busContainer'>
        <Navbar></Navbar>
        <div className='print'>
          <ReactToPrint
            trigger={() => <button variant="primary" className='print-btn'>Print</button>}
            content={() => componentRef.current}
          />
        </div>
        <div responsive ref={componentRef} className="imageWrapper">
          {reportActive && (
            <div className="detailsBox">
              <div className='h'>
                <h1>Report of Drivers</h1>
              </div>
              <div className='date'>
                <div>
                  <label className='fromDate'>From: </label>
                  <input className='fromInput'
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className='toDate'>To: </label>
                  <input className='toInput'
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <div>
                  <button className='button' onClick={generateReport}>Generate Report</button>
                </div>
              </div>
            </div>
          )}

          {tableActive && (
            <div className='container'>
              <div >
                <div className='title'>
                  Driver Attendance
                </div>
                <div className="tableBorderShadow">
                  <table >

                    <thead>
                      <tr>
                        <th>#</th>
                        <th scope="col">Driver ID</th>
                        <th scope="col">Date</th>
                        <th scope="col">CheckIn Time</th>
                        <th scope="col"> Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {attendance.map((attendance, index) => (
                        <tr >
                          <th scope="row" key={index}>{index + 1}</th>
                          <td>{attendance.driverID}</td>
                          <td>{attendance.date}</td>
                          <td>{attendance.checkInTime}</td>
                          <td>{attendance.status}</td>
                        </tr>

                      ))}

                    </tbody>
                  </table>
                </div>
                <div className='cancel'>
                  <button onClick={Cancel} style={{ float: 'right' }} className='cancel-btn'>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}






