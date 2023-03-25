import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/buses'
});

export default api;

/*
<table className="table">
              <thead>
                <tr>
                  <th scope="col">BusID</th>
                  <th>Bus_Stop</th>
                  <th>Bus_RouteID</th>
                  <th>Bus_RouteNO</th>
                  <th>Bus_RouteName</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuses.map((bus) => (
                  <React.Fragment key={bus.id.timestamp}>
                    <tr>
                      <td >{bus.busID}</td>
                      <td>{busStopName}</td>
                      <td>{bus.busRouteID[0].routeID}</td>
                      <td>{bus.busRouteID[0].routeNO}</td>
                      <td>{bus.busRouteID[0].routeName}</td>
                      <Link to="/searchbus/viewbus" style={{textDecoration:"none"}}>
                      <td ><button>View</button></td>
                      </Link>
                      
                    </tr>
                    {bus.busRouteID.slice(1).map((route) => (
                      <tr key={route.r_id.timestamp}>
                        <td >{bus.busID}</td>
                        <td>{busStopName}</td>
                        <td>{route.routeID}</td>
                        <td>{route.routeNO}</td>
                        <td>{route.routeName}</td>
                        <Link to="/searchbus/filteredbuses/viewbus" style={{textDecoration:"none"}}>
                      <td ><button>View</button></td>
                      </Link>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
*/