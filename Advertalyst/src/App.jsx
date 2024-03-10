import Home from "./components/Home";
import Location from "./components/Location";
import JWT1 from "./components/jwt";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const port = "http://localhost:3000";

const App = () => {
  const [jwtMessage, setJwtMessage] = useState(""); // State for JWT message

  useEffect(() => {
    const generateAndStoreJWT = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (token) {
          console.log("JWT already exists:", token);
        } else {
          const userId = uuidv4();
          const response = await axios.post(`${port}/auth/jwt`, { userId });
          const { token } = response.data;

          // Store JWT in local storage
          localStorage.setItem("jwt", token);

          setJwtMessage(`JWT generated: ${token}`);
        }
      } catch (error) {
        console.error("Error generating JWT:", error);
      }
    };

    generateAndStoreJWT(); // Call the function to generate and store JWT
  }, []);

  return (
    <>
      <Home />
      <Location />
    </>
  );
};

export default App;
