import Home from "./Pages/Home";
import SearchBus from "./Pages/SearchBus";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilteredBuses from "./Pages/FilteredBuses";



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
            </Route>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
