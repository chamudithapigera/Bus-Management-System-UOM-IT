import React, { useState, useEffect } from 'react';
import {  Link,useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/form.scss';

export default function UpdateBusRoute() {

    let navigate = useNavigate();

    const { id } = useParams();
    
    const [route, setRoute] = useState({
        routeID: "",
        routeNO : "",
        routeName: ""
      });
    
      const { routeID, routeNO,routeName  } = route;

      const onInputChange = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value });
      };
      
    useEffect(() => {
        loadBusRoute();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to update this bus route?")) {
        await axios.put(`http://localhost:8080/api/v1/busRoute/${id}`, route)
        .then((response) => {
            console.log(response.data);
            alert("Bus route updated successfully!");
          })
          .catch((error) => {
            console.error(error);
            alert("Failed to update bus route");
          });}
        navigate('/busRoute');
        
    };

    const loadBusRoute = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/busRoute/${id}`);
        setRoute(result.data);
    };

    

    return (
     
        <div className='contrainer' >
             <div className="detailsBox">
           
                <h2 className='text-center m-4'>
                    Update Bus Route
               </h2>
                <form onSubmit={(e)=> onSubmit(e)}>
                <div className='mb-3'>
                <label htmlFor='routeID' className='label'rm>Route ID</label>
                    <input
                        type={"text"}
                        className="input"
                        placeholder='Enter route ID '
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
                        placeholder='Enter route no'
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
                        placeholder='Enter route name'
                        name='routeName'
                       value={routeName}
                       onChange={(e)=>onInputChange(e)}
                    />
                </div>
                
              
                
                    <button type='submit' className='button'>Update</button>
                    <Link   to="/busRoute" style={{textDecoration:"none"}}>Cancel</Link>
                </form>
            </div>
        </div>
      
    );
}
