import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


export default function EditBusStop() {
  let navigate = useNavigate();

  const { id } = useParams();// Extract the id parameter from the URL

  const [stop, setStop] = useState({
    busStopID: "",
    busStopName: "",
    longitude: ""
  });

  const { busStopID, busStopName, longitude } = stop;

  const onInputChange = (e) => {
    setStop({ ...stop, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadStop();
  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/busStop/${id}`, stop)
    .then((response) => {
        console.log(response.data);
        alert("Bus stop updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update bus stop");
      });
    navigate("/busStop");
  };
  
  const loadStop = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/busStop/${id}`);
    setStop(result.data);
  };
  

  return (
<div className='container1'>
        <div >
            <div >
                <h2 className='text-center m-4'>Edit details of bus-stops</h2>
                <form onSubmit={(e)=> onSubmit(e)}>

                <div className='mb-3'>
                <label htmlFor='busStopID' className='label'>Bus Stop ID</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter bus  stop ID '
                        name='busStopID'
                        value={busStopID}
                        onChange={(e)=>onInputChange(e)}
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
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='longitude' className='label'>Longitude</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter longitude'
                        name='longitude'
                       value={longitude}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>

                
                <button type="submit" className="button">Submit</button>
                <Link   to="/busStop" style={{textDecoration:"none"}}>Cancel</Link>
                </form>


        </div>
      </div>
    </div>
  );
}
