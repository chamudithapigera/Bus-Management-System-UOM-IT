import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import '../Css/notification.scss'



const Home = () => {
  return (
    <div className="notification">
      <Sidebar />
      <div className="notificationContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;


