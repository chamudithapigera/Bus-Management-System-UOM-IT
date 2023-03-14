import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddBus() {

    let navigate = useNavigate()
    const [bus, setBus] = useState({
        
        busID:"",
        capacity:""

    });

    const{busID,capacity}=bus

    const onInputChange=(e)=>{
        setBus({...bus,[e.target.name]:e.target.value}
            )};

        const onSubmit= async (e)=>{
            e.preventDefault();
            await axios.post("http://localhost:8080/api/v1/bus_detail/addBus",bus)
            navigate("/")
        }
    
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 0ffset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add details of buses</h2>
                <form onSubmit={(e)=> onSubmit(e)}>
                    
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

                <div className='mb-3'>
                <label htmlFor='capacity' className='form-label'>Capacity</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder='Enter no of seats'
                        name='capacity'
                        value={capacity}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
                
                <button type="submit" className="btn btn-outline-primary">Submit</button>
                <Link  className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
