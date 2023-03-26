import "./widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';

const Widget = ({ type }) => {
    let data = {};
  
    //temporary
    const amount = 100;
    const diff = 20;
  
    switch (type) {
      case "welcome":
        data = {
          title: "WELCOME",
          isMoney: false,
          link: "See all users",
          icon: (
            <PersonOutlineOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        };
        break;
      case "schedules":
        data = {
          title: "SCHEDULES",
          isMoney: false,
          link: "View the schedules",
          icon: (
            <DateRangeOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
      case "collections":
        data = {
          title: "COLLECTIONS",
          isMoney: false,
          link: "View the collections",
          icon: (
            <CollectionsIcon
              className="icon"
              style={{
                 backgroundColor: "rgba(0, 128, 0, 0.2)", 
                 color: "green"
                 }}
            />
          ),
        };
        break;
      case "comments":
        data = {
          title: "COMMENTS",
          isMoney: false,
          link: "See all comments",
          icon: (
            <CommentRoundedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;
      default:
        break;
    }
  
    return (
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">
            {data.isMoney && "$"} {amount}
          </span>
          <span className="link">{data.link}</span>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
            {diff} %
          </div>
          {data.icon}
        </div>
      </div>
    );
  };
  
export default Widget;