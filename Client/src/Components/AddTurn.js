import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/form.scss';
import '../Css/bus.scss';


export default function AddTurn() {

    let navigate = useNavigate()
    const [busTurn, setBusTurn] = useState({
        turnNo:"",
        turnTime: [],
        routeName: []
    });

    const{turnNo,turnTime,routeName}=busTurn

    const onInputChange=(e)=>{
        if (e.target.name === "turnTime" || e.target.name === "routeName") {
            // if the input being changed is turnTime or routeName, split the input value by comma to get an array of values
            setBusTurn({...busTurn,[e.target.name]: e.target.value.split(",")});
        } else {
            setBusTurn({...busTurn,[e.target.name]:e.target.value});
        }
    };

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/api/v1/turn/addTurn",busTurn)
        navigate("/turn")
    }
    
    return (
        <div className='container1'>
            <div >
                <div className='col-md-6 0ffset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add details of bus-routes</h2>
                    <form onSubmit={(e)=> onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='turnNo' className='label'rm>Route ID</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter no of '
                                name='turnNo'
                                value={turnNo}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='turnTime' className='label'>Route NO</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter comma-separated values'
                                name='turnTime'
                                value={turnTime.join(",")}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='routeName' className='label'>Route Name</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter comma-separated values'
                                name='routeName'
                                value={routeName.join(",")}
                                onChange={(e)=>onInputChange(e)}
                            />
                        </div>
                
                        <button type="submit" className="button"  >Submit</button>
                        <Link   to="/busRoute" style={{textDecoration:"none"}}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

