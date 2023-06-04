import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import '../Css/notification.scss'



const Notification = () => {
  return (
    <div className="notification">
      <Sidebar />
      <div className="notificationContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default Notification;


