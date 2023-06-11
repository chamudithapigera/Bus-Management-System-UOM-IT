import "../Css/widget.scss"
import React, { useEffect, useState } from 'react';
import axios from "axios";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const WidgetDriver = () => {

  const [driver, setDriver] = useState([]);
  useEffect(() => {
    loadDriver();

  }, []);

  const loadDriver = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/drivers/count");
    setDriver(result.data);
  };

  return (

    <div className="widget">
      <div className="left">
        <span className="title">Driver Information</span>
        <span className="title">No of Drivers</span>
      </div>
      <div className="right">
        <PersonRoundedIcon />
        <span className="counter">{driver}</span>
      </div>
    </div>
  );
}

export default WidgetDriver