import '../Css/navbar.scss'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import image from '../Css/icon.jpeg'
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
        <img
              src={image}
              alt=""
              className="avatar"
            />
        </div>
        <div className="items">
          
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>

         <div className='login'>
         <Link to="/login" style={{ textDecoration: "none" }}>
          <button>Login</button>
          </Link>
         </div>
        
         <div className='register'>
         <Link to="/register" style={{ textDecoration: "none" }}>
          <button>Register</button>
          </Link>
         </div>
          
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;