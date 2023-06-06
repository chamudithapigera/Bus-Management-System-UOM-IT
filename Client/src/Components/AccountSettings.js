import React from 'react'
import '../Css/accountsettings.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Link,useState } from "react";

const AccountSettings = () => {
  
  // User details from the user login
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('janedoe@gmail.com');
  const [phone, setPhone] = useState('+1 2345 67 89');
  const [address, setAddress] = useState('Elton St. 234 Garden Yd. NewYork');
  const [country, setCountry] = useState('USA');
  const [image, setImage] = useState('https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg');

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
      setImage(e.target.result);
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
                      value={name}
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
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                    <h1 className="itemTitle">{name}</h1>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">{address}</span>
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