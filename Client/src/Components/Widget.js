import "../Css/widget.scss"
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import DirectionsBusFilledRoundedIcon from '@mui/icons-material/DirectionsBusFilledRounded';

const Widget = ({type}) => {
let data;

//temp
const amount=100;
const diff=20;

    switch(type){
        case "Buses":
            data={
                title:"Buses",
                amount:"10",
                link:"view buses",
                icon: 
                    <DirectionsBusFilledRoundedIcon className="icon"></DirectionsBusFilledRoundedIcon>
                
            };
            break;
            case "BusTurns":
            data={
                title:"Bus Turns",
                amount:"100",
                link:"view bus turns",
                icon: 
                    <PersonRoundedIcon className="icon"></PersonRoundedIcon>
                
            };
            break;
            case "DriverAttendance":
            data={
                title:"Driver Attendance",
                amount:"1200",
                link:"see all users",
                icon: 
                    <PersonRoundedIcon className="icon"></PersonRoundedIcon>
                
            };
            break;
           
            default:
                break;
    }
    return (
        <div className="widget"> 
          <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter"> {data.amount}</span>
                <span className="link">{data.link}</span>
          </div>
          <div className="right">
            <div className="icon">
            {data.icon}
               
            </div>
            
          </div>
        </div>
    )
}

export default Widget
