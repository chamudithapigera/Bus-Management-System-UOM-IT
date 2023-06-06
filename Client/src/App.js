import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Navbar from "./Pages/Navbar";





function App() {
  
  return (
  
     <BrowserRouter>
      <Routes>
        <Route path='/navbar'>
        <Route index element={<Navbar />} />
            
           
        </Route>
      </Routes>
     </BrowserRouter>
    
  );
}

export default App;