import React, { useState } from 'react';
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import '../Css/profile.scss';
import { useParams } from 'react-router-dom'
import AccountSettings from '../Components/AccountSettings';
import ChangePassword from '../Components/ChangePassword'
import LegalNotice from '../Components/LegalNotice'
import UserSidebar from '../Components/UserSidebar';

const Profile = () => {
  const {activepage} = useParams()
 
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