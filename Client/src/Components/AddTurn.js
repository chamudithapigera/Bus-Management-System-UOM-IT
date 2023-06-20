import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/table.scss';
import '../Css/forms.scss';


export default function AddTurn() {

    let navigate = useNavigate()

    const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    const routeNameRegex = /^[a-z]+(?:-[a-z]+)*$/;


    const [busTurn, setBusTurn] = useState({
        turnNo: "",
        turnTime: "",
        routeName: ""
    });

    const { turnNo, turnTime, routeName } = busTurn

    const onInputChange = (e) => {
        setBusTurn({ ...busTurn, [e.target.name]: e.target.value }
        )
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!turnNo) {
            alert("Please enter a value for Turn No.")
        }
        else if (!/^T\d{1,3}$/.test(turnNo)) {
            alert("Turn No. should be in the format T#, T##, or T###.(e.g., T8))");
        }
        else if (!turnTime) {
            alert("Please enter a value for Turn Time.")
        }
        else if (!timeRegex.test(turnTime)) {
            alert("Turn Time should be in the format HH:MM (e.g., 09:30).");
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
            await axios.post("http://localhost:8080/api/v1/turn/addTurn", busTurn)
                .then((response) => {
                    console.log(response.data);
                    alert("Bus route updated successfully!");

                })
                .catch((error) => {
                    console.error(error);
                    alert("Failed to update bus route");
                });
            navigate("/turn")
        }
    }



    return (
        <div className='container1'>
            <div className='detailsBox'>
                <div className='col-md-6 0ffset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add details of bus-turns</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='turnNo' className='label' rm>Turn No</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='e.g. "T5"  '
                                name='turnNo'
                                value={turnNo}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='turnTime' className='label'>Turn Time</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='time format HH:MM.  (16.30)'
                                name='turnTime'
                                value={turnTime}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='routeName' className='label'>Route Name</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='use simple letters  "katubedda-moratuwa"'
                                name='routeName'
                                value={routeName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="button"  >Submit</button>
                        <Link to="/turn" style={{ textDecoration: "none" }}><button>Cancel</button></Link>

                    </form>
                </div>
            </div>
        </div>
    )

}

