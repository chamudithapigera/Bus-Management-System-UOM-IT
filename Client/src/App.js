import Home from "./Pages/Home";
import SearchBus from "./Pages/SearchBus";
import FilteredBuses from "./Pages/FilteredBuses";
import ViewBus from "./Pages/ViewBus";
import Notification from "./Pages/Notification";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            
            <Route path="searchbus">
              <Route index element={<SearchBus />} />
              <Route path="filteredbus" element={<FilteredBuses />} />
              <Route path="viewbus" element={<ViewBus/>}/>
            </Route>

            <Route path="notification">
              <Route index element={<Notification />} />
            </Route>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
