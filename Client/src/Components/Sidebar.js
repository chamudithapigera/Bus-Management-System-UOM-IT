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
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import image from '../Css/busIcon.jpg'

const Sidebar = () => {

  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="sidebar">
      <div className="top">

        <Link to="/" style={{ textDecoration: "none" }}>
        <div>
            <img src={image} className="icontop" />
          </div>
          <spank className="logo">depo admin</spank>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
        <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <GridViewTwoToneIcon className="icon" />
              <span>Home</span>
            </li>
          </Link>

          <p className="title">Features</p>

          <Link to="/attendance" style={{ textDecoration: "none" }}>
            <li>
              <FactCheckRoundedIcon className="icon" />
              <span>Driver Attendance</span>
            </li>
          </Link>

          <Link to="/turn" style={{ textDecoration: "none" }}>
            <li>
              <SaveAsRoundedIcon className="icon" />
              <span>Bus Turn Schedule</span>
            </li>
          </Link>

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


          <Link to="/viewreport" style={{ textDecoration: "none" }}>
            <li>
              <EventNoteRoundedIcon className="icon" />
              <span>Monthly Report</span>
            </li>
          </Link>


{/*}
          <li>
            <NotificationsNoneOutlinedIcon className="icon" />
            <span>Notification</span>
          </li>
  */}
          <p className="title">Service</p>


          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li> 
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>

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

