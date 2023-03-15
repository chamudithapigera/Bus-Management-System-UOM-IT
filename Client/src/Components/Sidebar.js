import "../Css/sidebar.scss";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from "@mui/icons-material/Dashboard";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import {Link} from "react-router-dom";



const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
       
       <Link to ="/" style={{textDecoration:"none"}}>
       <spank className="logo">Passenger</spank>
       </Link>
      </div>
      <hr/>
      <div className="center">
        <ul>
        <Link to ="/" style={{textDecoration:"none"}}>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to ="/searchbus" style={{textDecoration:"none"}}>
          <li>
            <TravelExploreIcon className="icon"/>
            <span>Search Bus</span>
          </li>
          </Link>
          <Link to ="/filteredbus" style={{textDecoration:"none"}}>
          <li>
            <TravelExploreIcon className="icon"/>
            <span>Filtered Bus</span>
          </li>
          </Link>
          <li>
            <NotificationsNoneOutlinedIcon className="icon"/>
            <span>Notifications</span>
          </li>
          
          <li>
            <SettingsIcon className="icon"/>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon"/>
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppOutlinedIcon className="icon"/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
