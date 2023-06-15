import React, { useContext, useState } from 'react';
import '../Css/accountsettings.scss';
import { UserContext } from '../Components/UserContext';
import { ProfileImageContext } from '../Components/ProfileImageContext';
import axios from 'axios';

const AccountSettings = () => {
  const { userData } = useContext(UserContext);
  const { userName1, userName2, email, phone } = userData || {};
  const concatenatedUserName = `${userName1} ${userName2}`;
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);

  const [name, setName] = useState(userName1);
  const [email1, setEmail] = useState(email);
  const [phone1, setPhone] = useState(phone);
  const [country, setCountry] = useState('Sri Lanka');
  const [image, setImage] = useState(profileImage);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      const updatedDetails = {
        email: email1,
        phone: phone1,
      };

      await axios.put(`http://localhost:8080/api/v1/passenger/${email}`, updatedDetails);

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

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
                  value={email1}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="editInput"
                  type="text"
                  value={phone1}
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
  );
};

export default AccountSettings;
