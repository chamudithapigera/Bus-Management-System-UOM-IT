import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import '../Css/profile.scss'
import { useNavigate } from 'react-router-dom';
import SingleBanner from '../Components/SingleBanner'

/*
import ChangePassword from '../Components/ChangePassword'
import YourOrders from '../Components/YourOrders'
import UserAddress from '../Components/UserAddress'
import LegalNotice from '../Components/LegalNotice'

*/



const Profile = () => {


    const navigate = useNavigate();
  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <SingleBanner 
        heading={`My Profile`}
        bannerimage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' 
        />

         <div className='userprofilein'>
            <div className='left'>
            </div>
            <div className='right'>
               
                <button onClick={async () => {navigate('/profile/accountsettings')}}>Account Settings</button>
                <br></br>
                <br></br>

                <button onClick={async () => {navigate('/profile/changepassword')}}>ChangePassword</button>
                <br></br>
                <br></br>

                <button onClick={async () => {navigate('/profile/useraddress')}}>UserAddress</button>
                <br></br>
                <br></br>

                <button onClick={async () => {navigate('/profile/legalnotice')}}>LegalNotice</button>
                <br></br>
                <br></br>

          
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;
