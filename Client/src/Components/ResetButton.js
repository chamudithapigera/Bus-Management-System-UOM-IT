import React from "react";

function ResetButton() {
  const handleClick = async () => {
    const response = await fetch("/api/turn/reset", {
      method: "DELETE",
    });
    if (response.ok) {
      alert("All documents in the 'turn' collection have been deleted.");
    } else {
      alert("Failed to reset the 'turn' collection.");
    }
  };

  return <button onClick={handleClick}>Reset Collection</button>;
}

export default ResetButton;
