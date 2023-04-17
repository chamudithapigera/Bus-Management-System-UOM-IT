import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/form.scss';

export default function AddBusRoute() {

    let navigate = useNavigate()
    const [busStop, setBusStop] = useState({
        
        busStopID: "",
        busStopName:"",
        longitude:"",
        latitude:"",
        busID: ""
         
    });

    const{busStopID,busStopName,longitude,latitude, busID}=busStop

    const onInputChange=(e)=>{
        setBusStop({...busStop,[e.target.name]:e.target.value}
            )};

        const onSubmit= async (e)=>{
            e.preventDefault();
            if (!busID) {
                alert("Please enter a value for Bus ID.")
            } else {
                try {
                    await axios.post("http://localhost:8080/api/v1/busStop/addBusStop",busStop)
                    navigate("/busStop")
                } catch (error) {
                    alert(error.response.data.message)
                }
                
            }
            
            
        }
    
  return (
    <div className='container1'>
        <div >
            <div >
                <h2 className='text-center m-4'>Add details of bus-stops</h2>
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

                <div className='mb-3'>
                    <label htmlFor='latitude' className='label'>latitude</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter latitude'
                        name='latitude'
                       value={latitude}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='busID' className='label'>Bus ID</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter bus ID'
                        name='busID'
                       value={busID}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>
                
                <button type="submit" className="button">Submit</button>
                <Link   to="/busStop" style={{textDecoration:"none"}}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
