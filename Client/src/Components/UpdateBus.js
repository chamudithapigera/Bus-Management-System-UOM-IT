import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/form.scss';


export default function UpdateBus() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [bus, setBus] = useState({

        busID: "",
        capacity: ""

    });

    const { busID, capacity } = bus;

    const onInputChange = (e) => {
        setBus({ ...bus, [e.target.name]: e.target.value }
        )
    };

    useEffect(() => {
        loadBus();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!busID) {
            alert("Please enter a value for Bus ID.")
        }
        else if (!/^B\d{1,4}$/.test(busID)) {
            alert("Bus ID should be in the format B#### with a maximum length of 5 characters. (e.g., B8)");
        }
        else if (capacity && (!/^\d+$/.test(capacity) || Number(capacity) >= 100)) {
            alert("Capacity should be a number less than 100.");
        }
        else {
            if
            (window.confirm("Are you sure you want to update this bus ?")) {
                await axios.put(`http://localhost:8080/api/v1/bus_detail/${id}`, bus)
                    .then((response) => {
                        console.log(response.data);
                        alert("Bus  updated successfully!");
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("Failed to update bus ");
                    });
            }
            navigate('/bus');
        
        }
    };

    const loadBus = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/bus_detail/${id}`);
        setBus(result.data);
    };

    return (

        <div className='contrainer'>
            <div className="detailsBox">

                <div >
                    <h2 className=' m-4'>Update details of buses</h2>
                    <form onSubmit={(e) => onSubmit(e)} >

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

                        <div className='mb-3'>
                            <label htmlFor='capacity' className='label'>Capacity</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter no of seats'
                                name='capacity'
                                value={capacity}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="button">Submit</button>
                        <Link style={{ textDecoration: "none" }} to="/bus"><button>Cancel</button></Link>
                    </form>
                </div>
            </div>
        </div>

    )
}

