import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/forms.scss';

export default function AddBusRoute() {

    let navigate = useNavigate()

    const routeNameRegex = /^[a-z]+(?:-[a-z]+)*$/;

    const [busRoute, setBusRoute] = useState({

        routeID: "",
        routeNO: "",
        routeName: "",
        busID: ""

    });

    const { routeID, routeNO, routeName, busID } = busRoute

    const onInputChange = (e) => {
        setBusRoute({ ...busRoute, [e.target.name]: e.target.value }
        )
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!busID) {
            alert("Please enter a value for Bus ID.")
        }
        else if (!/^B\d{1,4}$/.test(busID)) {
            alert("Bus ID should be in the format B#### with a maximum length of 5 characters. (e.g., B8)");
        }
        else if (!routeID) {
            alert("Please enter a value for Bus Route ID.")
        }
        else if (!/^B\d{1,4}-R\d{1,2}$/.test(routeID)) {
            alert("Bus Route ID should be in the format B#-R#.(e.g., B8-R3) ");
        }
        else if (routeNO && (!/^\d{1,3}$/.test(routeNO))) {
            alert("Route Number should be a number with a maximum of three digits.");
          } 
        else if (!routeName) {
            alert("Please enter a value for Route Name.")
        }
        else if (
            routeName.length >= 100 || !routeNameRegex.test(routeName)) {
            alert(
                "Route Name should only contain simple letters and a hyphen (-), with a maximum length of 100 characters.(e.g., katubedda-moratuwa)"
            );
        }
        else {
            try {
                await axios.post("http://localhost:8080/api/v1/busRoute/addRoute", busRoute)
                    .then((response) => {
                        console.log(response.data);
                        alert("Bus route added successfully!");
                    })
                navigate("/busRoute")
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
                    <h2 className='text-center m-4'>Add details of bus-routes</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='routeID' className='label' rm>Route ID</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter route ID '
                                name='routeID'
                                value={routeID}
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
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
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>



                        <button type="submit" className="button"  >Submit</button>
                        <Link to="/busRoute" style={{ textDecoration: "none" }}>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
