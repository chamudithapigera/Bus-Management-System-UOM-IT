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

  const [name, setName] = useState(concatenatedUserName);
  const [email1, setEmail] = useState(email);
  const [phone1, setPhone] = useState(phone);
  const [country, setCountry] = useState('Sri Lanka');
  const [image, setImage] = useState(profileImage);
  const [isEditing, setIsEditing] = useState(false);

  //updating the user details by making a PUT request to the backend API endpoint
  const handleSave = async () => {
    try {
      const updatedDetails = {
        email: email1,
        phone: phone1,
      };

      //The updatedDetails object is passed as the request payload
      await axios.put(`http://localhost:8080/api/v1/passenger/${email}`, updatedDetails);

      setIsEditing(false);//indicating that the user has finished editing the profile
    } catch (error) {
      console.error(error);
    }
  };

  //change profile picture( 'e' is a parameter which contains information about the selected file)
  const handleImageChange = (e) => {

    //retrieves the first file from the e.target.files array
    const file = e.target.files[0];

    //The FileReader API allows reading the contents of the file asynchronously
    const reader = new FileReader();

    reader.onload = (e) => {
      // retrieves the image data URL
      const newImage = e.target.result;
      setImage(newImage);
      setProfileImage(newImage);
    };

    //if file exists, start reading the contents of the file as a data URL
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
              {/* enabling the editing mode */}
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          )}
          <h1 className="title"></h1>
          <div className="item">
            <img
              src={profileImage}
              alt=""
              className="itemImg"
              //allows the user to select a new profile picture by clicking on the image
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
