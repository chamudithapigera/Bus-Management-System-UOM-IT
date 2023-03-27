import '../Css/sidebar.scss';
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from './darkModeContext';
import { useContext } from "react";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DirectionsBusFilledRoundedIcon from '@mui/icons-material/DirectionsBusFilledRounded';
import AddRoadRoundedIcon from '@mui/icons-material/AddRoadRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';

const Sidebar = () => {

  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">

        <Link to="/" style={{ textDecoration: "none" }}>
          <AccountCircleIcon className="icontop" />
          <spank className="logo">depo admin</spank>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">Features</p>


          <Link to="/driver" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddAlt1Icon className="icon" />
              <span>Drivers</span>
            </li>
          </Link>



          <Link to="/bus" style={{ textDecoration: "none" }}>
            <li>
              <DirectionsBusFilledRoundedIcon className="icon" />
              <span>Bus</span>
            </li>
          </Link>

          <Link to="/busRoute" style={{ textDecoration: "none" }}>
            <li>
              <AddRoadRoundedIcon className="icon" />
              <span>Bus Routes</span>
            </li>
          </Link>

          <Link to="/busStop" style={{ textDecoration: "none" }}>
            <li>
              <BlockRoundedIcon className="icon" />
              <span>Bus Stops</span>
            </li>
          </Link>

          <Link to="/attendance" style={{ textDecoration: "none" }}>
            <li>
              <FactCheckRoundedIcon className="icon" />
              <span>Driver Attendance</span>
            </li>
          </Link>

          <Link to="/turn" style={{ textDecoration: "none" }}>
            <li>
              <FactCheckRoundedIcon className="icon" />
              <span>Bus Turn Schedule</span>
            </li>
          </Link>


          <li>
            <NotificationsNoneOutlinedIcon className="icon" />
            <span>Notification</span>
          </li>

          <p className="title">SERVICE</p>

          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>

          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>

          <li>
            <ExitToAppOutlinedIcon className="icon" />
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

