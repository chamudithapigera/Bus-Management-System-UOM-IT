import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/home.scss";
import image from '../Css/back 3.jpeg'
import image2 from "../Css/BUS_MANAGEMENT_SYSTEM.jpeg";
import { useNavigate,Link } from 'react-router-dom';
import UnRegMap from "../Components/UnRegMap";


const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="items">
        <div className="item">
        <div>
        <Link to="/" style={{ textDecoration: "none" }}>
            <img src={image2} className="icontop" />
            </Link>
          </div>
          <div className="name"><p>TRAVO</p></div>
        </div>
    
        <div className="item">
            <button  onClick={()=> {navigate('/login')}}><span></span>Login</button>
          </div>
          <div className="item">
            <button  onClick={()=> {navigate('/register')}}><span></span>Sign Up</button>
          </div>
        </div>
       
        <div className="map">
        <UnRegMap/>
        </div>
            
      </div>

      
      
    </div>
  );
};

export default Home;


