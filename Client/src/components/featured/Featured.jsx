import "./featured.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";


const Featured = () => {
  return (
    <div className="featured">
        <div className="top">
            <h1 className="title">Followers</h1>
            <MoreVertIcon fontSize="small" />
        
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />

            </div>
            <p className="title">Total users made today</p>
            <p className="amount">2500</p>
            <p className="desc">
            Previous users processing. Last hour users may not be included.
            </p>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Two Days Before</div>
                    <div className="itemResult negative">
                        <KeyboardArrowDownIcon fontSize="small"/>   
                        <div className="resultAmount">2000</div>
                    </div>
                </div>
            
            
                <div className="item">
                    <div className="itemTitle">Day Before</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                        <div className="resultAmount">1800</div>
                    </div>
                </div>
            
           
                <div className="item">
                    <div className="itemTitle">Yesterday</div>
                    <div className="itemResult positive">
                        <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                        <div className="resultAmount">2200</div>
                    </div>
                </div>
            </div>


        </div>
    </div>

  );
};

export default Featured;