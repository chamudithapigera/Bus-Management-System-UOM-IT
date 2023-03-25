import React, { useState, useEffect } from 'react';
import {  Link,useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateDriver() {

    let navigate = useNavigate();

    const { id } = useParams();
    
    const [driver, setDriver] = useState({
        
        driverID:"",
        driverName:"",
        licenseNo: ""
         
    });
    
    const{driverID , driverName, licenseNo}=driver

    const onInputChange=(e)=>{
        setDriver({...driver,[e.target.name]:e.target.value}
            )};
      
    useEffect(() => {
        loadDriver();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        await axios.put(`http://localhost:8080/api/v1/driver/${id}`, driver)
        .then((response) => {
            console.log(response.data);
            alert("Driver updated successfully!");
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to update driver");
          });
        navigate('/driver');
        
    };

    const loadDriver = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/driver/${id}`);
        setDriver(result.data);
    };

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
    
                    
                    <button type="submit" className="button">Submit</button>
                    <Link  to="/driver" style={{textDecoration:"none"}}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
      )
    }