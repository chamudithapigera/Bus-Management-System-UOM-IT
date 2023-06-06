import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";





function App() {
  
  return (

  <div className="app">
     <BrowserRouter>
      <Routes>
        <Route path='/'>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
           
        </Route>
      </Routes>
     </BrowserRouter>
     </div>
    
  );
}

export default App;