import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/table.scss';
import '../Css/forms.scss';


export default function AddTurn() {

    let navigate = useNavigate()
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
        else if(!turnTime){
            alert("Please enter a value for Turn Time.")
        }
        else if(!routeName){
            alert("Please enter a value for Route Name.")
        }
        else{
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
                                placeholder='Enter turn no '
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
                                placeholder='Enter turn time'
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
                                placeholder='Enter route name'
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

