import '../Css/sidebar.scss';
import DashboardIcon from "@mui/icons-material/Dashboard";
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
import { Link } from "react-router-dom";
import { DarkModeContext } from './darkModeContext';
import { useContext } from "react";

const Sidebar = () => {

  const {dispatch}= useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration:"none"}}>
        <spank className="logo">depo admin</spank>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
            <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          <p className="title">Features</p>
          <Link to="/users" style={{textDecoration:"none"}}>

          <Link to="/driver" style={{textDecoration:"none"}}>
          <li>
            <Person2OutlinedIcon className="icon"/>
            <span>Drivers</span>
          </li>
          </Link>
          
          </Link>

          <Link to="/bus" style={{textDecoration:"none"}}>
          <li>
            <ProductionQuantityLimitsOutlinedIcon className="icon"/>
            <span>Bus</span>
          </li>
          </Link>

          <Link to="/busRoute" style={{textDecoration:"none"}}>
          <li>
            <CreditCardIcon className="icon"/>
            <span>Bus Routes</span>
          </li>
          </Link>

          <Link to="/busStop" style={{textDecoration:"none"}}>
          <li>
            <DeliveryDiningIcon className="icon"/>
            <span>Bus Stops</span>
          </li>
          </Link>

          <li>
            <DeliveryDiningIcon className="icon"/>
            <span>Driver-Attendance</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <QueryStatsIcon className="icon"/>
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneOutlinedIcon className="icon"/>
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <MonitorHeartOutlinedIcon className="icon"/>
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon"/>
            <span>Logs</span>
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
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({type: "LIGHT"})}></div>
        <div className="colorOption" onClick={() => dispatch({type: "DARK"})}></div>
      </div>
    </div>
  );
};

export default Sidebar;

