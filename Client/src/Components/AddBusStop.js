import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/forms.scss';

export default function AddBusRoute() {

    let navigate = useNavigate()


    const [busStop, setBusStop] = useState({

        busStopID: "",
        busStopName: "",
        busID: ""

    });

    const { busStopID, busStopName, busID } = busStop

    const onInputChange = (e) => {
        setBusStop({ ...busStop, [e.target.name]: e.target.value }
        )
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!busID) {
            alert("Please enter a value for Bus ID.")
        }
        else if (!busStopID) {
            alert("Please enter a value for Bus Stop ID.")
        }
        else if (!/^B\d{1,4}-S\d{1,2}$/.test(busStopID)) {
            alert("Bus Stop ID should be in the format B#-R#.(e.g., B8-S3) ");
        }
        else if (!busStopName) {
            alert("Please enter a value for Bus Stop Name.");
        } 
        else if (!/^[A-Za-z ]{1,100}$/.test(busStopName)) {
            alert("Bus Stop Name should only contain letters and have a maximum length of 100 characters.");
          }
        else {
            try {
                await axios.post("http://localhost:8080/api/v1/busStop/addBusStop", busStop)
                    .then((response) => {
                        console.log(response.data);
                        alert("Bus added successfully!");
                    })
                navigate("/busStop")
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert("An error occurred while adding the bus route.");
                }
            }

        }


    }

    return (
        <div className='container1'>
            <div className='detailsBox'>
                <div >
                    <h2 className='text-center m-4'>Add details of bus-stops</h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='busStopID' className='label'>Bus Stop ID</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='e.g., B8-S3'
                                name='busStopID'
                                value={busStopID}
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='busID' className='label'>Bus ID</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='e.g., B8'
                                name='busID'
                                value={busID}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="button">Submit</button>
                        <Link to="/busStop" style={{ textDecoration: "none" }}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
