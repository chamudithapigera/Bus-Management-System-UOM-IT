import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Css/report.scss';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import image from "../Css/bus.jpg"
import ReactToPrint from "react-to-print";
import axios from "axios";



export default function ReportGenerationForm() {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [tableActive, settableActive] = useState(false);
  const [reportActive, setreportActive] = useState(true);

  function Cancel() {
    setreportActive(!reportActive);
    settableActive(!tableActive);
  }

  function generateReport() {
    setreportActive(!reportActive);
    settableActive(!tableActive);
    // Create a new jsPDF instance
    const doc = new jsPDF();
    // Generate the report content
    doc.text('Monthly Report', 10, 10);
    doc.text(`From: ${format(fromDate, 'dd/MM/yyyy')}`, 10, 20);
    doc.text(`To: ${format(toDate, 'dd/MM/yyyy')}`, 10, 30);

    // Save the PDF
    doc.save('monthly_report.pdf');
  }

  const componentRef = useRef()
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    loadAttendance();

  }, []);

  const loadAttendance = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/attendance/viewAttendance");
    setAttendance(result.data);
  };


  return (

    <div className='bus'>
      <Sidebar></Sidebar>
      <div className='busContainer'>
        <Navbar></Navbar>
        <ReactToPrint
          trigger={() => <button variant="primary">Print</button>}
          content={() => componentRef.current}
        />
        <div responsive ref={componentRef} className="imageWrapper">
          {reportActive && (
            <div className="detailsBox">
              <div className='h'>
                <h1>Monthly Report of Drivers</h1>
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
              <div className='py-4'>
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
                <button onClick={Cancel} style={{ float: 'right' }}>
                  Cancel
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}






