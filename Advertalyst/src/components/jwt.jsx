import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const port = "http://localhost:3000";

const App = () => {
  const [jwt, setJwt] = useState(null);
  const [jwtMessage, setJwtMessage] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const generateJWT = async () => {
    try {
      const userId = uuidv4();
      const response = await axios.post(`${port}/auth/jwt`, { userId });
      const { token } = response.data;

      // Store JWT in local storage
      localStorage.setItem("jwt", token);

      // Set JWT state
      setJwt(token);
      setJwtMessage(`JWT generated: ${token}`);
    } catch (error) {
      console.error("Error generating JWT:", error);
    }
  };

  const fetchData = async () => {
    try {
      // Retrieve JWT from local storage
      const token = localStorage.getItem("jwt");

      if (!token) {
        console.error("JWT not found in local storage");
        return;
      }

      // Make API call with JWT
      const response = await axios.get(`${port}/weather`, {
        headers: {
          Authorization: token,
        },
      });

      console.log("Weather data:", response.data);
      setApiResponse(response.data.userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>JWT Authentication Example</h1>
      <button onClick={generateJWT}>Generate JWT</button>
      <button onClick={fetchData}>Fetch Data</button>
      <p>{jwtMessage}</p>
      <p>API Response: {JSON.stringify(apiResponse)}</p>
    </div>
  );
};

export default App;
