
import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import "./Attendance.scss";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';





const Attendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState({
    driverID: '',
    status: '',
  });

  const { driverID, status } = attendance;

  const onInputChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { driverID, status }; // create a new object with only the required fields
    await axios
      .post('http://localhost:8080/api/attendance', data)
      .then((response) => {
        console.log(response.data);
        alert('Attendance saved successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update attendance');
      });
    navigate('/turns/${driverID}'); // navigate to Turns route with driverID as parameter
  };
  

  const onPresentClick = () => {
    setAttendance({ ...attendance, status: 'present' });
  };

  const onAbsentClick = () => {
    setAttendance({ ...attendance, status: 'absent' });
  };

  return (
    <div className='attendance'>
      <Sidebar />
      <div className='attendanceContainer'>
        <Navbar />

        <div className='attendanceMark'>
          <h1>
            <center>Mark Your Attendance</center>
          </h1>
          <div className='id'>
            <label htmlFor='driverID'>Enter Driver ID: </label>
            <input type='text' id='driverID' name='driverID' onChange={onInputChange} />
          </div>

          <button className='btn' value="present" onClick={onPresentClick}>
            Present
          </button>
          <button className='btn' value="absent" onClick={onAbsentClick}>
            Absent
          </button>
          <button className='submit' value="submit" onClick={onSubmit}>
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
