import "../Css/home.scss";
import image2 from "../Css/BUS_MANAGEMENT_SYSTEM.jpeg";
import { useNavigate } from 'react-router-dom';
import UnRegMap from "../Components/UnRegMap";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";


const Home = () => {

  const navigate = useNavigate();

  return (
    
    <div className="container">
    <div className="home">
      <div className="homeContainer">
        <div className="items">

          <div className="item">
            <div>
              {/* image source is set to the image2 variable */}
              <img src={image2} className="icontop" />
            </div>
            <div className="name"><p>TRAVO</p></div>
          </div>

          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon"
            onClick={()=> {navigate('/chat')}} />
            <div className="counter">2</div>
          </div>

          <div className="item">
            <button onClick={() => { navigate('/login') }}><span></span>Login</button>
          </div>

          <div className="item">
            <button onClick={() => { navigate('/register') }}><span></span>Sign Up</button>
          </div>

        </div>

        <div className="map">
          <UnRegMap />
        </div>

      </div>

      </div>

    </div>
  );
};

export default Home;


