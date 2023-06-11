import "../Css/widget.scss"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import DirectionsBusFilledRoundedIcon from '@mui/icons-material/DirectionsBusFilledRounded';

const WidgetBus = () => {

    const [bus, setBus] = useState([]);
    useEffect(() => {
        loadBus();

    }, []);

    const loadBus = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/bus_detail/count");
        setBus(result.data);
    };

    return (

        <div className="widget">
            <div className="left">
                <span className="title">Bus Information</span>
                <span className="title">No of Buses</span>
            </div>
            <div className="right">
                <DirectionsBusFilledRoundedIcon />
                <span className="counter">{bus}</span>
            </div>
        </div>
    );
}

export default WidgetBus