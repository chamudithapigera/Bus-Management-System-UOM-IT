import React from 'react';
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import '../Css/profile.scss';
import AccountSettings from '../Components/AccountSettings';



const Profile = () => {

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <AccountSettings/>
      </div>
    </div>
  );
};

export default Profile;