import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/form.scss';

export default function AddBus() {
    //const AddBus = () => {
    let navigate = useNavigate()
    const [bus, setBus] = useState({
        
        busID:"",
        capacity:""

    });

    const{busID,capacity}=bus;

    const onInputChange=(e)=>{
        setBus({...bus,[e.target.name]:e.target.value}
            )};

        const onSubmit= async (e)=>{
            e.preventDefault();
            await axios.post("http://localhost:8080/api/v1/bus_detail/addBus",bus)
            navigate("/bus")
        }
    
  return (
    <div className='container1'>
        <div >
            <div >
                <h2 className=' m-4'>Add details of buses</h2>
                <form onSubmit={(e)=> onSubmit(e)} >
                    
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

                <div className='mb-3'>
                <label htmlFor='capacity' className='label'>Capacity</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter no of seats'
                        name='capacity'
                        value={capacity}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>
                
                <button type="submit" className="button">Submit</button>
                <Link  style={{textDecoration:"none"}} to="/bus">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

