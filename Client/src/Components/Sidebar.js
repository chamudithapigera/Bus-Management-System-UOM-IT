import "../Css/sidebar.scss";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
//links to different pages
import { Link } from "react-router-dom";
import image from "../Css/BUS_MANAGEMENT_SYSTEM.jpeg"
import { DarkModeContext } from "../Components/darkModeContext";
import { useContext } from "react";
import { UserContext } from '../Components/UserContext';


const Sidebar = ( ) => {

  const { userData } = useContext(UserContext);
  const { userName1, userName2 } = userData || {};
  const concatenatedUserName = userName1 + " " + userName2;

  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">

        <Link to="/searchbus" style={{ textDecoration: "none" }}>
          <div className="icon">
            <img src={image} className="icontop" />
          </div>
         <div className="logo">Welcome !</div> 
         <div className="name">{concatenatedUserName}</div> 
        </Link>
      </div>
     <hr/>

      <div className="center">
        
        <ul>
          <Link to="/searchbus" style={{ textDecoration: "none" }}>
            <li>
              <TravelExploreIcon className="icon" />
              <span>Search Bus</span>
            </li>
          </Link>
          

          <Link to="/notification" style={{ textDecoration: "none" }}>
            <li>
              <NotificationsNoneOutlinedIcon className="icon" />
              <span>Notifications</span>
            </li>
          </Link>

          <Link to="/profile" style={{ textDecoration: "none" } } >
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
          
        </ul>  
        
      </div>
      

   
      <p className="title">Theme</p>

      <div className="bottom">
      
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>

    </div>
  );
};

export default Sidebar;
