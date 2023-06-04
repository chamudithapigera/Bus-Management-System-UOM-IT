import "../Css/sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
//links to different pages
import { Link } from "react-router-dom";
import image from "./BUS_MANAGEMENT_SYSTEM.jpeg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">

        <Link to="/" style={{ textDecoration: "none" }}>
          <div>
            <img src={image} className="icontop" />
          </div>
          <span className="logo">Passenger</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>


          <Link to="/" style={{ textDecoration: "none" }}>
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

          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>

          <p className="title">USER</p>

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

    </div>
  );
};

export default Sidebar;
