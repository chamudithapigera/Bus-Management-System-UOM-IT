import "../Css/navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../Components/darkModeContext"
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ProfileImageContext } from "../Components/ProfileImageContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { profileImage } = useContext(ProfileImageContext);

  //used to dispatch actions to the reducer, triggering state updates based on the specified action type
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search"></div>
        <div className="items">
        
          <div className="item">
            <DarkModeOutlinedIcon 
            className="icon" 
            onClick={() => dispatch({ type: "TOGGLE" })} />
          </div>

          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" 
            onClick={()=> {navigate('/notification')}}/>
            <div className="counter">1</div>
          </div>
          
          <div className="item">
            <img
              src={profileImage}
              alt=""
              className="avatar"
              onClick={()=> {navigate('/profile')}}
            />
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
