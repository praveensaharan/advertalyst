import React, { useState } from "react";
import imge from "../assets/hello.png";
import Card from "./card";

const Home = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [city3, setCity3] = useState("");
  const [city4, setCity4] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setCity1(inputValue1);
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setCity2(inputValue2);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    setCity3(inputValue3);
  };

  const handleSubmit4 = async (e) => {
    e.preventDefault();
    setCity4(inputValue4);
  };

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };
  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
  };
  const handleInputChange4 = (e) => {
    setInputValue4(e.target.value);
  };

  const handleCancel1 = () => {
    setInputValue1("");
    setCity1("");
  };

  const handleCancel2 = () => {
    setInputValue2("");
    setCity2("");
  };

  const handleCancel3 = () => {
    setInputValue3("");
    setCity3("");
  };

  const handleCancel4 = () => {
    setInputValue4("");
    setCity4("");
  };

  return (
    <>
      <div className="font-atma mt-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-6">Weather App</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {city1 !== "" ? (
          <Card city={city1} onCancel={handleCancel1} />
        ) : (
          <div className="mt-12 rounded-3xl p-3 shadow-md max-w-md mx-auto font-atma flex border-2 border-black">
            <div className="mr-4 p-2">
              <img
                className="w-24 h-24 object-cover rounded-lg border"
                src={imge}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit1}>
                <input
                  type="text"
                  name="cityName"
                  placeholder="Enter your city Name"
                  value={inputValue1} // Bind input value to state
                  onChange={handleInputChange1} // Handle input change
                  className="border border-gray-400 rounded-md p-2 mb-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Get Weather
                </button>
              </form>
            </div>
          </div>
        )}

        {city2 !== "" ? (
          <Card city={city2} onCancel={handleCancel2} />
        ) : (
          <div className="mt-12 rounded-3xl p-3 shadow-md max-w-md mx-auto font-atma flex border-2 border-black">
            <div className="mr-4 p-2">
              <img
                className="w-24 h-24 object-cover rounded-lg border"
                src={imge}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit2}>
                <input
                  type="text"
                  name="cityName"
                  placeholder="Enter your city Name"
                  value={inputValue2} // Bind input value to state
                  onChange={handleInputChange2} // Handle input change
                  className="border border-gray-400 rounded-md p-2 mb-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Get Weather
                </button>
              </form>
            </div>
          </div>
        )}

        {city3 !== "" ? (
          <Card city={city3} onCancel={handleCancel3} />
        ) : (
          <div className="mt-12 rounded-3xl p-3 shadow-md max-w-md mx-auto font-atma flex border-2 border-black">
            <div className="mr-4 p-2">
              <img
                className="w-24 h-24 object-cover rounded-lg border"
                src={imge}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit3}>
                <input
                  type="text"
                  name="cityName"
                  placeholder="Enter your city Name"
                  value={inputValue3} // Bind input value to state
                  onChange={handleInputChange3} // Handle input change
                  className="border border-gray-400 rounded-md p-2 mb-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Get Weather
                </button>
              </form>
            </div>
          </div>
        )}

        {city4 !== "" ? (
          <Card city={city4} onCancel={handleCancel4} />
        ) : (
          <div className="mt-12 rounded-3xl p-3 shadow-md max-w-md mx-auto font-atma flex border-2 border-black">
            <div className="mr-4 p-2">
              <img
                className="w-24 h-24 object-cover rounded-lg border"
                src={imge}
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit4}>
                <input
                  type="text"
                  name="cityName"
                  placeholder="Enter your city Name"
                  value={inputValue4} // Bind input value to state
                  onChange={handleInputChange4} // Handle input change
                  className="border border-gray-400 rounded-md p-2 mb-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Get Weather
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
