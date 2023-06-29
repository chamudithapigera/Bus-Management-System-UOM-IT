
import SearchBus from "./Pages/SearchBus";
import FilteredBuses from "./Pages/FilteredBuses";
import ViewBus from "./Pages/ViewBus";
import Notification from "./Pages/Notification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import { DarkModeContext } from "./Components/darkModeContext";
import "./Css/dark.scss"
import { useContext } from "react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Pages/Home";
import UnRegFilteredBuses from "./Pages/UnRegFilteredBuses";
import UnRegViewBus from "./Pages/UnRegViewBus";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (

    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            
            <Route path="searchbus">
              <Route index element={<SearchBus />} />
              <Route path="unregfilteredbus" element={<UnRegFilteredBuses />} />
              <Route path="filteredbus" element={<FilteredBuses />} />
            </Route>

            <Route path="searchbus/filteredbus">
              <Route index element={<FilteredBuses />} />
              <Route path="viewbus" element={<ViewBus/>}/>
            </Route>

            <Route path="searchbus/unregfilteredbus">
              <Route index element={<UnRegFilteredBuses />} />
              <Route path="unregviewbus" element={<UnRegViewBus/>}/>
            </Route>

            <Route path="notification">
              <Route index element={<Notification />} />
            </Route>

            <Route path="settings">
              <Route index element={<Settings />} />
            </Route>
          
            <Route path="profile">
              <Route index element={<Profile />} />
            </Route>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
