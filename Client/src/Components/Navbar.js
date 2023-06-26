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
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileImageContext } from "../Components/ProfileImageContext";
import HomeIcon from '@mui/icons-material/Home';


const Navbar = () => {
  const navigate = useNavigate();
  const { profileImage } = useContext(ProfileImageContext);
  //used to dispatch actions to the reducer, triggering state updates based on the specified action type
  const { dispatch } = useContext(DarkModeContext);
  const location = useLocation();

  const isFilteredBusesPage =
    location.pathname.includes("filteredbus") ||
    location.pathname.includes("viewbus");

  const pathSegments = location.pathname.split("/");
  const lastIndex = pathSegments.length - 1;

  const handleNavigate = (index) => {
    if(index === lastIndex){
      return; // Do nothing
    }
    else{
      if (index === 1) {
        navigate("/searchbus");
      }
      else if(index === 2){
        navigate(-1);
      }
    }
    
  
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <div className="item2">
            <HomeIcon
              className="iconHome"
              onClick={() => { navigate('/searchbus') }} />
          </div>
          <div className="currentPage">
            {pathSegments.map((segment, index) => (
              <span
              key={index}
              className={
                isFilteredBusesPage && index < lastIndex ? "highlighted" : ""
              }

              onClick={() => handleNavigate(index)}
            >
              {index > 0 && " / "}
              {segment}
            </span>
            ))}
          </div>       
           </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })} />
          </div>

          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon"
              onClick={() => { navigate('/notification') }} />
            <div className="counter">1</div>
          </div>

          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon"
              onClick={() => { navigate('/chat') }} />
            <div className="counter">2</div>
          </div>

          <div className="item">
            <img
              src={profileImage}
              alt=""
              className="avatar"
              onClick={() => { navigate('/profile') }}
            />
          </div>


        </div>
      </div>
      <style>{`
        .navbar .currentPage span.highlighted {
          color: gray;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
