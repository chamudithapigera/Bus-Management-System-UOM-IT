import "../Css/widget.scss"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';

const WidgetDriverAttendance = () => {

    const [attendance, setAttendance] = useState([]);
    useEffect(() => {
        loadAttendance();

    }, []);

    const loadAttendance = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/attendance/present-driver-count");
        setAttendance(result.data);
    };

    return (

        <div className="widget">
            <div className="left">
                <span className="title">Today Driver Attendance</span>
                <span className="title">No of present drivers</span>
            </div>
            <div className="right">
                <ContactMailRoundedIcon />
                <span className="counter">{attendance}</span>
            </div>
        </div>
    );
}

export default WidgetDriverAttendance