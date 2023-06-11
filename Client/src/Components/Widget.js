import "../Css/widget.scss"





const Widget = ({ title, count }) => {
let data;
{/*
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
*/}
return (
  
        <div className="widget">
          <div className="left">
            <span className="title">{title}</span>
            <span className="counter">{count}</span>
            <span className="link">View Details</span>
          </div>
          <div className="right">
            {/* Add any additional content for the right section of the card */}
          </div>
        </div>
      );
}

export default Widget
