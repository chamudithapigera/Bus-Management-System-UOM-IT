
import "../Css/home.scss";
//import "../Css/filteredbus.scss"
import image2 from "../Css/BUS_MANAGEMENT_SYSTEM.jpeg";
import { useLocation,Link,useNavigate } from 'react-router-dom';
import '../Css/table.scss';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';



const UnRegFilteredBuses = () => {

  //By calling useLocation(), access the location object and extract the state property from it
  const location = useLocation();
  //previous route passed these values as part of the state when navigating.
  const { filteredBuses, busStopName, routeNO } = location.state;
  const navigate = useNavigate();


  return (
    <div className="home">
      <div className="homeContainer">
        <div className="items">
        <div className="item">
        <div>
          {/* When the link is clicked, it will navigate to the specified route */}
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
       
        <div className='containerTable'>
          <p className='text'>Available Buses</p>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th >Bus ID</th>
                  <th>Bus_Stop</th>
                  <th>Bus_RouteNO</th>
                  <th>Bus_RouteName</th>
                  <th>Arrival_Date</th>
                  <th>Arrival_Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                
                {filteredBuses.map((bus, index) => {
                  //generates table rows dynamically based on the data
                  return (
                    <tr>
                      {/* represents the first cell in each row, which displays the row number/index */}
                      <th scope="row" key={index}>{index + 1}</th>
                      <td>{bus.busLocation.busID}</td>
                      <td>{busStopName}</td>
                      <td>{routeNO}</td>
                      <td>{bus.busLocation.routeName}</td>
                      {/* extracts the date portion of the arrival time */}
                      <td>{bus.arrivalTime.substr(0, 10)}</td>
                      <td>{bus.arrivalTime.substring(11, 19)}</td>
                      <td>
                        <RemoveRedEyeRoundedIcon onClick={async () => {
                          const busID = bus.busLocation.busID;
                          const routeName = bus.busLocation.routeName;
                          const duration = bus.duration;
                          const distance = bus.distance;
                          const arrivalTime = bus.arrivalTime.substring(11, 19);
                          navigate('/searchbus/unregviewbus', { state: { busID, routeName, duration, distance, arrivalTime } });
                        }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
            
      </div>

      
      
    </div>
  );
};

export default UnRegFilteredBuses;


