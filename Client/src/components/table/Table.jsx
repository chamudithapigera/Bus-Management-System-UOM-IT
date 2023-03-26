import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      customer: "Janith Perera",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      role: "Passenger",
      date: "3 March",
      from: "Colombo",
      status: "Approved",
    },
    {
      id: 2235235,
      customer: "Shenal Gunawardana",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      role: "Driver",
      date: "3 March",
      from: "Galle",
      status: "Pending",
    },
    {
      id: 2342353,
      customer: "Kavish Theekshana",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      role: "Driver",
      date: "2 March",
      from: "Jaffna",
      status: "Pending",
    },
    {
      id: 2357741,
      customer: "Chathura Basnayaka",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      role: "Passenger",
      date: "2 March",
      from: "Trincomalee",
      status: "Approved",
    },
    {
      id: 2342355,
      customer: "Pasinda Piyumal",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      role: "Depo Admin",
      date: "1 March",
      from: "Batticaloa",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Job Role</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">From</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.customer}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.role}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.from}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;