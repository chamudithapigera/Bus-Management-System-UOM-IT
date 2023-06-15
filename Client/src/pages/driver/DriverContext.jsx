import React, { createContext, useState } from 'react';

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [driverID, setDriverID] = useState(null); // Change driverId to driverID
  
  return (
    <DriverContext.Provider value={{ driverID, setDriverID }}>
      {children}
    </DriverContext.Provider>
  );
};

