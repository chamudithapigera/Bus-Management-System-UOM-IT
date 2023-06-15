import React, { useContext, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { DriverContext } from '../../pages/driver/DriverContext';
import ChatWindow from './ChatWindow';
import './Breakdown.scss';

const Breakdown = () => {
    const { driverID } = useContext(DriverContext);
    const [isChatOpen, setIsChatOpen] = useState(false);
    
    const handleBreakdown = (breakdownType) => {
        if(breakdownType === "big") {
            setIsChatOpen(true);
        } else if(breakdownType === "small") {
            // Handle small delay breakdown
            // Code to send delay notification goes here
            // ...
            alert("A delay notification has been sent.");
        }
    }

    return (
      <div>
      <div className='breakdown'>
          <Sidebar/>
          <div className="breakdownContainer">
              <Navbar/>
              <div className="breakdownContent">
                  <h1>Breakdown Page</h1>
                  <p>Driver ID: {driverID}</p>
  
                  {/* Buttons to simulate breakdowns */}
                  <button onClick={() => handleBreakdown("big")}> Big Damage Breakdown</button>
                  <button onClick={() => handleBreakdown("small")}> Small Delay Breakdown</button>
                  
                  {isChatOpen && <ChatWindow setIsChatOpen={setIsChatOpen} driverId={driverID} />}
              </div>
          </div>
      </div>
  </div>  
    );
}

export default Breakdown;
