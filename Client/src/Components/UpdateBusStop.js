import React, { useState } from "react";
import axios from "axios";

function UpdateBusStop() {
  const [formValues, setFormValues] = useState({
    busStopID: "",
    busStopName: "",
    longitude: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make PUT request to update the busStop record
    axios
      .put(`http://localhost:8080/api/v1/busStop/{id}`, formValues)
      .then((response) => {
        console.log(response.data);
        alert("Bus stop updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update bus stop");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="_id">Bus Stop ID:</label>
      <input type="text" name="_id" onChange={handleChange} />

      <label htmlFor="name">Bus Stop Name:</label>
      <input type="text" name="name" onChange={handleChange} />

      <label htmlFor="description">Longitude:</label>
      <textarea name="description" onChange={handleChange}></textarea>

      <button type="submit">Update Bus Stop</button>
    </form>
  );
}

export default UpdateBusStop;