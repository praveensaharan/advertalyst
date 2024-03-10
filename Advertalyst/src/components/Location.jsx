import React, { useState, useEffect } from "react";

const port = "http://localhost:3000";

const LocationComponent = () => {
  const [error, setError] = useState(null);
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await fetch(
                `http://api.weatherapi.com/v1/current.json?key={yourapi}&q=${latitude},${longitude}`
              );
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              const data = await response.json();
              setCityData(data);
              console.log("Weather data:", data);
              setError(null);
            } catch (error) {
              setError("Error fetching weather data");
              console.error("Error fetching weather data", error);
            }
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  return (
    <div className="text-center mt-5">
      {error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold pr-3">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <>
          {cityData && (
            <div className="mt-12 mb-8 relative rounded-3xl p-3 shadow-md max-w-md mx-auto font-atma flex border-2 border-black">
              <div className="mr-4 p-2">
                <img
                  className="w-24 h-24 object-cover rounded-lg"
                  src={cityData.current?.condition?.icon || ""}
                  alt=""
                />
              </div>
              <div className="grid grid-rows-3 gap-y-2">
                <div className="flex">
                  <p className="text-lg font-semibold pr-3">Your Location:</p>
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
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationComponent;
