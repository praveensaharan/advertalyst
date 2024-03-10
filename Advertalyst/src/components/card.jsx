import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const port = "http://localhost:3000";

const Card = ({ city, onCancel }) => {
  const [cityData, setCityData] = useState(null);
  const [showCancelButton, setShowCancelButton] = useState(false);

  // Function to check if cached data has expired
  const isDataExpired = (cachedData) => {
    const now = new Date().getTime();
    const cachedTime = cachedData.timestamp;
    const elapsedTime = now - cachedTime;
    return elapsedTime > 5 * 60 * 1000; // 5 minutes expiration time
  };

  // Function to retrieve cached data and check for expiration
  const getCachedData = (city) => {
    const cachedData = JSON.parse(localStorage.getItem(city));
    if (cachedData && !isDataExpired(cachedData)) {
      return cachedData.data;
    }
    return null;
  };

  // Function to cache data with timestamp
  const cacheData = (city, data) => {
    const cachedData = { data, timestamp: new Date().getTime() };
    localStorage.setItem(city, JSON.stringify(cachedData));
  };

  // Usage in useEffect
  useEffect(() => {
    const fetchCityData = async () => {
      const token = localStorage.getItem("jwt");
      try {
        let cachedData = getCachedData(city); // Check for cached data and expiration

        if (!cachedData) {
          const response = await axios.get(`${port}/${city}`, {
            headers: {
              Authorization: token,
            },
          });

          if (response.status === 200) {
            setCityData(response.data);
            cacheData(city, response.data); // Cache the data with timestamp
            console.log(response.data);
          } else {
            console.error("Failed to fetch city data:", response.statusText);
            onCancel(); // Call onCancel if there's an error
          }
        } else {
          setCityData(cachedData); // Set cached data if available and not expired
          console.log("Data fetched from cache:", cachedData);
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
        onCancel(); // Call onCancel if there's an error
      }
    };

    fetchCityData();
  }, [city, onCancel]);

  const handleCardHover = () => {
    setShowCancelButton(true);
  };

  const handleCardLeave = () => {
    setShowCancelButton(false);
  };

  return (
    <>
      {cityData && (
        <div
          className="mt-12 relative rounded-3xl p-3 shadow-md max-w-md mx-auto font-atma flex border-2 border-black"
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <div className="mr-4 p-2">
            <img
              className="w-24 h-24 object-cover rounded-lg"
              src={cityData.current?.condition?.icon || ""}
              alt=""
            />
          </div>
          <div className="grid grid-rows-3 gap-y-2">
            <div className="">
              {cityData.location.name}, {cityData.location.country}
            </div>
            <div className="">{cityData.current?.condition?.text}</div>
            <div className="flex justify-between">
              <p className="float-left">Temp: {cityData.current?.temp_c}</p>
              <p className="float-right pl-12">
                Humidity: {cityData.current?.humidity}
              </p>
            </div>
          </div>
          {showCancelButton && (
            <button
              onClick={onCancel}
              className="text-white rounded-full px-3 py-1 absolute top-1 right-1 opacity-100 transition-opacity duration-200"
            >
              <FontAwesomeIcon icon={faTrash} className="text-red-500" />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Card;
