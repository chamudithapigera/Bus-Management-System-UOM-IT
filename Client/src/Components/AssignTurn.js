import React, { useState } from 'react';

function AssignTurn() {
    const [buttonEnabled, setButtonEnabled] = useState(true);

    const handleClick = () => {
      
      if (buttonEnabled) {
        setButtonEnabled(false);
  
       
        fetch('http://localhost:8080/api/v1/turn/present/driverIds')
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
      }
    }
  
    return (
      <div>
        <button onClick={handleClick} disabled={!buttonEnabled}>
          {buttonEnabled ? "Assign" : "Disabled"}
        </button>
      </div>
    );
}

export default AssignTurn;

