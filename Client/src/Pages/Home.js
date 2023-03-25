import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;


