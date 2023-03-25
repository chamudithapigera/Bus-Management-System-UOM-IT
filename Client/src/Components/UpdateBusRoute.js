import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import '../Css/form.scss';

export default function UpdateBusRoute() {

    let navigate = useNavigate()

    const { id } = useParams();

    const [busRoute, setBusRoute] = useState({
        
        routeID:"",
        routeNO:"",
        routeName: "",
               
    });

    const{routeID,routeNO,routeName}=busRoute

    const onInputChange=(e)=>{
        setBusRoute({...busRoute,[e.target.name]:e.target.value}
            )};

    useEffect(() => {
        loadBusRoute();
    }, []);

        const onSubmit= async (e)=>{
            e.preventDefault();
            await axios.put(`http://localhost:8080/api/v1/busRoute/${id}`,busRoute);
            navigate("/busRoute")
        };
    
    const loadBusRoute = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/busRoute/${id}`);
        setBusRoute(result.data);
    };       


  return (
    <div className='container1'>
        <div >
            <div className='col-md-6 0ffset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Update details of bus-routes</h2>
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
           
                
                <button type="submit" className="button"  >Submit</button>
                <Link   to="/busRoute" style={{textDecoration:"none"}}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
