import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Css/report.scss';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import image from "../Css/bus.jpg"

{/*export default function ReportGenerationForm() {

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

 function generateReport() {
    // Fetch data and generate the report based on the selectedMonth and selectedYear values
    console.log(`Generating report for ${selectedMonth} ${selectedYear}`);
  }

 // Generate years dynamically
 const currentYear = new Date().getFullYear();
 const yearOptions = Array.from({ length: 20 }, (_, index) => currentYear - index);

  return (
    <div className='bus'>
      <Sidebar></Sidebar>
      <div className='busContainer'>
        <Navbar></Navbar>
       
      <div className='h'>
        <h3>Monthly Report of Drivers</h3>
      </div>
    
      <div>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Select Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      </div>

      <div>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">Select Year</option>
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      </div>
      <div >
      <button className='button' onClick={generateReport}>Generate Report</button>
      </div>
    </div>
    </div>
    
  )
}
*/}




export default function ReportGenerationForm() {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  function generateReport() {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Generate the report content
    doc.text('Monthly Report', 10, 10);
    doc.text(`From: ${format(fromDate, 'dd/MM/yyyy')}`, 10, 20);
    doc.text(`To: ${format(toDate, 'dd/MM/yyyy')}`, 10, 30);

    // Save the PDF
    doc.save('monthly_report.pdf');
  }

  return (
    
    <div className='bus'>
      <Sidebar></Sidebar>
      <div className='busContainer'>
        <Navbar></Navbar>
        <div className="imageWrapper">
  
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
    </div>
    </div>
    </div>
  
  );
}






