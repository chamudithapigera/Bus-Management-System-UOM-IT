import "../Css/widget.scss"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';

const WidgetTurn = () => {

    const [turn, setTurn] = useState([]);
    useEffect(() => {
        loadTurn();

    }, []);

    const loadTurn = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/turn/count");
        setTurn(result.data);
    };

    return (

        <div className="widget">
            <div className="left">
                <span className="title">Turn Information</span>
                <span className="title">No of Turns</span>
            </div>
            <div className="right">
          
                <FactCheckRoundedIcon />
         
                <span className="counter">{turn}</span>
            </div>
        </div>
    );
}

export default WidgetTurn