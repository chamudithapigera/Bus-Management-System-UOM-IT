import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import '../Css/viewpage.scss';


export default function ViewDriver() {
    const [driver, setDrivers] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/drivers/viewone/${id}`);
            setDrivers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!driver) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="detailsBox">
                <div className='h'>
                    <h1>Driver - {driver.driverId}</h1>
                </div>
                <p><strong>Name :</strong> {driver.firstName} {driver.lastName}</p>
                <p><strong>Email:</strong> {driver.email}</p>
                <p><strong>Phone No:</strong> {driver.telephone}</p>
                <p><strong>Bus ID:</strong> {driver.busId}</p>

            </div>
        </div>
    );
}