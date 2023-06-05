
import SearchBus from "./Pages/SearchBus";
import FilteredBuses from "./Pages/FilteredBuses";
import ViewBus from "./Pages/ViewBus";
import Notification from "./Pages/Notification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import AccountSettings from "./Components/AccountSettings";
import ChangePassword from "./Components/ChangePassword";
import LegalNotice from "./Components/LegalNotice";
import UserAddress from "./Components/UserAddress";
import { DarkModeContext } from "./Components/darkModeContext";
import "./Css/dark.scss"
import { useContext } from "react";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (

    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<SearchBus />} />
            
            <Route path="searchbus">
              <Route index element={<SearchBus />} />
              <Route path="filteredbus" element={<FilteredBuses />} />
              <Route path="viewbus" element={<ViewBus/>}/>
            </Route>

            <Route path="notification">
              <Route index element={<Notification />} />
            </Route>

            <Route path="settings">
              <Route index element={<Settings />} />
            </Route>
          
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path='/profile/:activepage' element={<AccountSettings />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="useraddress" element={<UserAddress />} />
              <Route path="legalnotice" element={<LegalNotice />} />

            </Route>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
