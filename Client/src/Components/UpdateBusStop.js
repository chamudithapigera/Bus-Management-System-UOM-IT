import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/form.scss';

export default function UpdateBusStop() {

  let navigate = useNavigate();

  const { id } = useParams();

  const [stop, setStop] = useState({
    busStopID: "",
    busStopName: "",
  });

  const { busStopID, busStopName } = stop;

  const onInputChange = (e) => {
    setStop({ ...stop, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBusStop();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!busStopID) {
      alert("Please enter a value for Bus Stop ID.")
    }
    else if (!/^B\d{1,4}-S\d{1,2}$/.test(busStopID)) {
      alert("Bus Stop ID should be in the format B#-R#.(e.g., B8-S3) ");
    }
    else if (!busStopName) {
      alert("Please enter a value for Bus Stop Name.");
    }
    else if (!/^[A-Za-z ]{1,100}$/.test(busStopName)) {
      alert("Bus Stop Name should only contain letters and have a maximum length of 100 characters.");
    }
    else{
    if (window.confirm("Are you sure you want to update this bus stop?")) {
      await axios.put(`http://localhost:8080/api/v1/busStop/${id}`, stop)
        .then((response) => {
          console.log(response.data);
          alert("Bus stop updated successfully!");
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to update bus stop");
        });
      navigate('/busStop');
    }
  }
  };

  const loadBusStop = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/busStop/viewone/${id}`);
    setStop(result.data);
  };

  return (

    <div className='contrainer'>
      <div className="detailsBox">
        <div >
          <h2 className='text-center m-4'>Update details of bus-stops</h2>
          <form onSubmit={(e) => onSubmit(e)}>

            <div className='mb-3'>
              <label htmlFor='busStopID' className='label'>Bus Stop ID</label>
              <input
                type={"text"}
                className="input"
                placeholder='Enter bus  stop ID '
                name='busStopID'
                value={busStopID}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='busStopName' className='label'>Bus Stop Name</label>
              <input
                type={"text"}
                className="input"
                placeholder='Enter bus  stop name '
                name='busStopName'
                value={busStopName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="button">Submit</button>
            <Link to="/busStop" style={{ textDecoration: "none" }}>Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

