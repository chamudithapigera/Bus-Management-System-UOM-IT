import "../Css/sidebar.scss";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
//links to different pages
import { Link, NavLink } from "react-router-dom";
import image from "../Css/BUS_MANAGEMENT_SYSTEM.jpeg"
import { DarkModeContext } from "../Components/darkModeContext";
import { useContext, useState } from "react";
import { UserContext } from '../Components/UserContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { FaCaretDown } from "react-icons/fa";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Sidebar = () => {
  const { userData } = useContext(UserContext);
  const { userName1, userName2 } = userData || {};
  const concatenatedUserName = userName1 + " " + userName2;
  const { dispatch, darkMode } = useContext(DarkModeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  const closeDropdown = (e) => {
    if (!e.target.matches(".theme-span")) {
      setIsDropdownOpen(false);
    }
  };

  window.addEventListener("click", closeDropdown);


  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/searchbus" style={{ textDecoration: "none" }}>
          <div className="icon">
            <img src={image} className="icontop" alt="Logo" />
          </div>
          <div className="logo">Welcome !</div>
          <div className="name">{concatenatedUserName}</div>
        </Link>
      </div>
      <hr />

      <div className="center">
        <ul>
          <li>
            <NavLink
              to="/searchbus"

            >
              <TravelExploreIcon className="icon" />
              <span>Search Bus</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notification"

            >
              <NotificationsNoneOutlinedIcon className="icon" />
              <span>Notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"

            >
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"

            >
              <ExitToAppOutlinedIcon className="icon" />
              <span>Logout</span>
            </NavLink>
          </li>
          <li>
            <div className="dropdown">
              <NavLink
                to="#"
                onClick={toggleDropdown}
                activeClassName={!isDropdownOpen ? "active" : ""}
              >
                {darkMode ? (
                  <DarkModeIcon className="icon" />
                ) : (
                  <LightModeIcon className="icon" />
                )}
                <span className="theme-span">Theme</span>
              </NavLink>
              {isDropdownOpen && (
                <div className="dropdown-content">
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
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
