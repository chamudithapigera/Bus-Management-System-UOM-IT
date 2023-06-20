import React from 'react'
import '../Css/accountsettings.scss'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Link,useState } from "react";

const AccountSettings = () => {
  
  // User details from the user login
  const [name, setName] = useState('Sahan Perera');
  const [email, setEmail] = useState('sahanperera@gmail.com');
  const [phone, setPhone] = useState('+94 774 573 999');
  const [address, setAddress] = useState('N0.18, Green Park, Kadawatha');
  const [adminID, setadminID] = useState('D1');
  const [image, setImage] = useState('https://th.bing.com/th/id/OIP.Gt3FCsTLbyw8ZygkTjTzhwAAAA?pid=ImgDet&w=347&h=346&rs=1');

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
                      value={adminID}
                      onChange={(e) => setadminID(e.target.value)}
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
                      <span className="itemKey">Depo Admin ID:</span>
                      <span className="itemValue">{adminID}</span>
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