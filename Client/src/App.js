import Home from "./Pages/Home";
import SearchBus from "./Pages/SearchBus";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilteredBuses from "./Pages/FilteredBuses";
import ViewBus from "./Pages/ViewBus";
import ViewTurn from "./Pages/ViewTurn";
import SaveLocation from "./Pages/SaveLocation";



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
          
            <Route path="viewturn">
              <Route index element={<ViewTurn />} />
              <Route path="savelocation" element={<SaveLocation />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
