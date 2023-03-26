import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext);
  return (
    
    <div className='sidebar'>
        <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEuM3rN_-bXaJFFWebQkvOjYqUKkcePl2uhQ&usqp=CAU"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="logo1"> TRAVO admin</h1>
            
            </div>
            
        </Link>
        </div>
        <hr/>

        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to="/" style={{ textDecoration: "none" }}>

                <li>
                    <DashboardIcon className="icon"/>
                    <span>Dashboard</span>
                </li>
                </Link>

                <p className="title">LISTS</p>
                <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                    
                    <PeopleOutlineOutlinedIcon className="icon"/>
                    <span>Users</span>
                    
                </li>
                </Link>
                
                
                <li>
                    <TableViewOutlinedIcon className="icon" />
                    <span>Tables</span>
                </li>
                <li>
                    <InsertChartOutlinedIcon className="icon" />
                    <span>Charts</span>
                </li>

                <p className="title">USEFUL</p>
                <li>
                    <NotificationsActiveOutlinedIcon className="icon"/>
                    <span>Notifications</span>
                </li>

                <p className="title">SERVICES</p>
                <li>
                    <SettingsSystemDaydreamIcon className="icon"/>
                    <span>System Health</span>
                </li>

                <li>
                    <ReportIcon className="icon"/>
                    <span>Reports</span>
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
                    <LogoutOutlinedIcon className="icon"/>
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

export default Sidebar