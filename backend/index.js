const axios = require("axios");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const NodeCache = require("node-cache");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const cache = new NodeCache({ stdTTL: 300 });

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// Endpoint to generate JWT
app.post("/auth/jwt", (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UUID is missing" });
    }

    // Create JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return JWT to client
    res.json({ token });
  } catch (error) {
    console.error("Error generating JWT:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Example protected route

app.get("/:location", verifyToken, async (req, res) => {
  try {
    const location = req.params.location;
    const userId = req.userId;

    // Check if data is cached
    const cachedData = cache.get(location);
    if (cachedData) {
      return res.json(cachedData);
    }
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.APIKEY}&q=${location}&aqi=no`
    );

    cache.set(location, response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/:we", async (req, res) => {
  try {
    const location1 = req.params.we;

    const [latitude, longitude] = location1.split(",");

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.APIKEY}&q=${latitude},${longitude}`
    );

    console.log("Received response from WeatherAPI");

    if (response.status !== 200) {
      console.error("WeatherAPI request failed with status:", response.status);
      return res.status(500).json({ error: "Failed to fetch weather data" });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error occurred while fetching weather data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching weather data" });
  }
});

app.get("/weather", verifyToken, (req, res) => {
  const userId = req.userId;

  const userData = "jwt works fine";

  res.json({ userData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
