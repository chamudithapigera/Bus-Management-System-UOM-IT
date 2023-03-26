import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import "./home.scss";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
            <Widget type="welcome" />
            <Widget type="schedules" />
            <Widget type="collections" />
            <Widget type="comments" />
          </div>

          <div className="charts">
            <Featured/>
            <Chart title="Monthly Analytics" aspect={2 / 1} />

          </div>
          
          <div className="listContainer">
            <div className="listTitle">Latest Updates</div>
            <Table/>
          </div>
        </div>
    </div>
  );
};

export default Home;