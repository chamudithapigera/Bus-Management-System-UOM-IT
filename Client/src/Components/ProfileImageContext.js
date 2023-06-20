import { createContext, useState } from 'react';

export const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  
  const [profileImage, setProfileImage] = useState(
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
  );

  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};