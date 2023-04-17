import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/form.scss';

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
        setDriver({...driver,[e.target.name]:e.target.value}
            )};

        const onSubmit= async (e)=>{
            e.preventDefault();
            if (!busID) {
                alert("Please enter a value for Bus ID.")
            } else {
                try {
                    await axios.post("http://localhost:8080/api/v1/driver/addDriver",driver)
                    navigate("/driver")
                } catch (error) {
                    alert(error.response.data.message)
                }
                
            }
            
        }
    
  return (
    <div className='container1'>
        <div >
            <div >
                <h2 className='text-center m-4'>Add details of drivers</h2>
                <form onSubmit={(e)=> onSubmit(e)}>
                <div className='mb-3'>

                <label htmlFor='driverID' className='label'>Driver ID</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter driver ID '
                        name='driverID'
                        value={driverID}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='driverName' className='label'>Driver Name</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter driver name'
                        name='driverName'
                       value={driverName}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='licenseNo' className='label'>License No</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter license number'
                        name='licenseNo'
                       value={licenseNo}
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
                <Link  to="/driver" style={{textDecoration:"none"}}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}