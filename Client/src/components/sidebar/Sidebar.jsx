import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {Link} from "react-router-dom";
import image from "./logo.jpeg";
import { DarkModeContext } from "../../context/darkModeContext";
import React,{ useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (

    <div className="sidebar">
      <div className="top">
       <img src={image} alt="app logo" className="icontop"/>
       <span className="logo">Driver</span>
      </div>
      <hr/>

      <div className="center">
        <ul>

          <Link to="/" style={{textDecoration:"none"}}>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          </Link>
          
          <Link to ="/attendance" style={{textDecoration:"none"}}>
          <li>
            <TravelExploreIcon className="icon"/>
            <span>Attendance</span>
          </li>
          </Link>
          

          <Link to ="/turns" style={{textDecoration:"none"}}>
          <li>
            <NotificationsNoneOutlinedIcon className="icon"/>
            <span>View Turns</span>
          </li>
          </Link>


          <Link to ="/breakdown" style={{textDecoration:"none"}}>
          <li>
            <NotificationsNoneOutlinedIcon className="icon"/>
            <span>Breakdown</span>
          </li>
          </Link>
          
          <li>
            <SettingsIcon className="icon"/>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <Link to ="/single" style={{textDecoration:"none"}}>
          <li>
            <AccountCircleOutlinedIcon className="icon"/>
            <span>Profile</span>
          </li>
          </Link>
          
          <li>
            <ExitToAppOutlinedIcon className="icon"/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
        

        </div>
    </div>
  );
};

export default Sidebar;