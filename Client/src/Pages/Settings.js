import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import '../Css/settings.scss';

const Settings = () => {
  // State variables to manage user settings
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [language, setLanguage] = useState("en");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions to save the settings (e.g., make API calls)
    console.log("Settings submitted:", email, notifications, language);
  };

  return (
    <div className="settings">
      <Sidebar />
      <div className="settingsContainer">
        <Navbar />
        <div className="settingsContent">
          <h2>Passenger Settings</h2>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Notifications:</label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />

            <label>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>

            <button type="submit">Save Settings</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
