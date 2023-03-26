export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    {
    field: "jobrole",
    headerName: "Job Role",
    width: 100,
    }

  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "Kavish",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "kavish@gmail.com",
      age: 35,
      jobrole: "Passenger",
    },
    {
      id: 2,
      username: "Chathura",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "chathura@gmail.com",
      status: "passive",
      age: 42,
      jobrole: "Driver",
    },
    {
      id: 3,
      username: "Pasinda",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "pasinda@gmail.com",
      status: "pending",
      age: 45,
      jobrole: "Passenger",
    },
    {
      id: 4,
      username: "Janith",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "janith@gmail.com",
      status: "active",
      age: 16,
      jobrole: "Driver",
    },
    {
      id: 5,
      username: "Kirishantha",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "kirishantha@gmail.com",
      status: "passive",
      age: 22,
      jobrole: "Driver",
    },
    {
      id: 6,
      username: "Himasha",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "himasha@gmail.com",
      status: "active",
      age: 15,
      jobrole: "Passenger",
    },
    {
      id: 7,
      username: "Vidath",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "vidath@gmail.com",
      status: "passive",
      age: 44,
      jobrole: "Depo Admin",
    },
    {
      id: 8,
      username: "Nithya",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "nithya@gmail.com",
      status: "active",
      age: 36,
      jobrole: "Depo Admin",
    },
    {
      id: 9,
      username: "Ahinsa",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "ahinsa@gmail.com",
      status: "pending",
      age: 65,
      jobrole: "Passenger",
    },
    {
      id: 10,
      username: "Shenal",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "shenal@gmail.com",
      status: "active",
      age: 65,
      jobrole: "Depo Admin",
    },
  ];