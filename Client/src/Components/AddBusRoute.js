import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/form.scss';

export default function AddBusRoute() {

    let navigate = useNavigate()
    const [busRoute, setBusRoute] = useState({
        
        routeID:"",
        routeNO:"",
        routeName: "",
        busID: ""
           
    });

    const{routeID,routeNO,routeName,busID}=busRoute

    const onInputChange=(e)=>{
        setBusRoute({...busRoute,[e.target.name]:e.target.value}
            )};

        const onSubmit= async (e)=>{
            e.preventDefault();
            await axios.post("http://localhost:8080/api/v1/busRoute/addRoute",busRoute)
            navigate("/busRoute")
        }
    
  return (
    <div className='container1'>
        <div >
            <div className='col-md-6 0ffset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add details of bus-routes</h2>
                <form onSubmit={(e)=> onSubmit(e)}>
                <div className='mb-3'>
                <label htmlFor='routeID' className='label'rm>Route ID</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter no of '
                        name='routeID'
                        value={routeID}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='routeNO' className='label'>Route NO</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter bus ID'
                        name='routeNO'
                       value={routeNO}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='routeName' className='label'>Route Name</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter bus ID'
                        name='routeName'
                       value={routeName}
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
                
                
                
                <button type="submit" className="button"  >Submit</button>
                <Link   to="/busRoute" style={{textDecoration:"none"}}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
