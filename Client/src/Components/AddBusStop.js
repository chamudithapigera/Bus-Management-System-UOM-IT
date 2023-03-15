import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddBusRoute() {

    let navigate = useNavigate()
    const [busStop, setBusStop] = useState({
        
        busStopName:"",
        longitude:"",
        busID: ""
         
    });

    const{busStopName,longitude, busID}=busStop

    const onInputChange=(e)=>{
        setBusRoute({...busStop,[e.target.name]:e.target.value}
            )};

        const onSubmit= async (e)=>{
            e.preventDefault();
            await axios.post("http://localhost:8080/api/v1/busStop/addbusStop",busStop)
            navigate("/busStop")
        }
    
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 0ffset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add details of bus-stops</h2>
                <form onSubmit={(e)=> onSubmit(e)}>
                <div className='mb-3'>
                <label htmlFor='busStopName' className='form-label'>busStopName</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder='Enter bus  stop name '
                        name='busStopName'
                        value={busStopName}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='longitude' className='form-label'>longitude</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder='Enter longitude'
                        name='longitude'
                       value={longitude}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='busID' className='form-label'>Bus ID</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder='Enter bus ID'
                        name='busID'
                       value={busID}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>
                
                <button type="submit" className="btn btn-outline-primary">Submit</button>
                <Link   to="/busStop" style={{textDecoration:"none"}}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
