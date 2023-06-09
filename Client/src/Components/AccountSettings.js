import React, {useContext} from 'react'
import '../Css/accountsettings.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../Components/UserContext';
import { ProfileImageContext } from '../Components/ProfileImageContext';

const AccountSettings = ({username}) => {

  const { userData } = useContext(UserContext);
  const { userName1, userName2, email,phone } = userData || {};
  const concatenatedUserName = userName1 + " " + userName2;
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);

  // User details from the user login
  const [name, setName] = useState('ahinsa');
  const [email1, setEmail] = useState('kavindya124@gmail.com');
  const [phone1, setPhone] = useState('+94 772 458 464');
  const [country, setCountry] = useState('Sri Lanka');
  const [image, setImage] = useState("https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");

  // Edit mode state variable
  const [isEditing, setIsEditing] = useState(false);
  

  // Event handler for saving the edited user details
  const handleSave = () => {
    // Perform the necessary actions to save the updated user details
    // For example, make an API call to update the user details in the backend

    // After saving, exit edit mode
    setIsEditing(false);
  };

  // Event handler for image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const newImage = e.target.result;
      setImage(newImage);
      setProfileImage(newImage);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
    
  return (
    <div className='accountsettings'>
    <div className="top">
          <div className="left">
            {!isEditing && (
              <div className="editButton">
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              </div>
            )}
            <h1 className="title"></h1>
            <div className="item">
              <img
                src={image}
                alt=""
                className="itemImg"
                onClick={() => isEditing && document.getElementById('imageInput').click()}
              />
              </div>
              <div className="details">
                {isEditing ? (
                  <>
                    <input
                      className="editInput"
                      type="text"
                      value={concatenatedUserName}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="editInput"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      className="editInput"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                   
                    <input
                      className="editInput"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                    <input
                      id="imageInput"
                      className="editInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <button className="saveButton" onClick={handleSave}>Save</button>
                    
                  </>
                ) : (
                  <>
                    <h1 className="itemTitle">{concatenatedUserName}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Country:</span>
                      <span className="itemValue">{country}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        
        </div>
      
  )
}

export default AccountSettings