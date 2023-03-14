import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddBusRoute() {

    let navigate = useNavigate()
    const [driver, setDriver] = useState({
        
        driverID:"",
        driverName:"",
        licenseNo: "",
        busID: ""
         
    });

    const{driverID,driverName,licenseNo, busID}=driver

    const onInputChange=(e)=>{
        setBusRoute({...driver,[e.target.name]:e.target.value}
            )};

        const onSubmit= async (e)=>{
            e.preventDefault();
            await axios.post("http://localhost:8080/api/v1/driver/addDriver",driver)
            navigate("/")
        }
    
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 0ffset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add details of drivers</h2>
                <form onSubmit={(e)=> onSubmit(e)}>
                <div className='mb-3'>

                <label htmlFor='driverID' className='form-label'>driverID</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder='Enter driver ID '
                        name='driverID'
                        value={driverID}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='driverName' className='form-label'>driverName</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder='Enter driver name'
                        name='driverName'
                       value={driverName}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='licenseNo' className='form-label'>licenseNo</label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder='Enter license number'
                        name='licenseNo'
                       value={licenseNo}
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
                <Link  className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}