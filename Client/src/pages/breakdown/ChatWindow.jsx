import React, { useState } from "react";
import axios from "axios";

const ChatWindow = ({ setIsChatOpen, driverId }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  const requestReplacement = async () => {
    setIsRequesting(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/breakdown/notify",
        {
          driverId,
          breakdownType: "big",
        }
      );

      console.log("Response:", response); // This will log the whole response object

      if (response.status >= 200 && response.status < 300) {
        setIsRequested(true);
        // Set a timeout to close the chat window after 30 seconds
        setTimeout(() => {
          setIsChatOpen(false);
        }, 15000);
      }
    } catch (error) {
      console.error("Error handling breakdown", error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="chat-window">
      <p>Big breakdown detected. Do you want to request a bus replacement?</p>
      {isRequesting ? (
        <p>Requesting...</p>
      ) : isRequested ? (
        <p>You will be contacted shortly on the bus replacement.</p>
      ) : (
        <>
          <button onClick={requestReplacement}>Yes</button>
          <button onClick={handleClose}>No</button>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
