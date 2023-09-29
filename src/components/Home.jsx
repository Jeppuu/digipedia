import React, { useState, useEffect } from "react";
import { Route, Link, Router } from "wouter";

function Home() {
  const [digimons, setDigimons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedDigimon, setSelectedDigimon] = useState(null);
  const [englishDescription, setEnglishDescription] = useState("");
  const [error, setError] = useState("");
  const totalPages = 283; // Total number of pages in API

  const getRandomPageNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const randomPageNumber = getRandomPageNumber(1, totalPages);

    fetch(`https://www.digi-api.com/api/v1/digimon?page=${randomPageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.content) {
          setDigimons(data.content); // Set the array of Digimon data
        } else {
          console.log("Invalid API response");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchDigimonData = () => {
    //if input isn't empty
    if (searchName !== "") {
      fetch(`https://www.digi-api.com/api/v1/digimon/${searchName}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Digimon not found"); // Custom error message
            //setError("Digimon not found")
          }
          return response.json();
        })
        .then((json) => {
          setSelectedDigimon(json);

          // Filter and set the English description
          const descriptions = json.descriptions;
          const englishDescriptionObject = descriptions.find(
            (desc) => desc.language === "en_us"
          );

          if (englishDescriptionObject) {
            setEnglishDescription(englishDescriptionObject.description);
          } else {
            setEnglishDescription("No English description available.");
          }
        })

        .catch((error) => {
          setSelectedDigimon(null);
          setEnglishDescription("");
          setError("Digimon not found");
        });
    }
  };

  return (
    <div className="flex flex-col text-center items-center m-2 text-white">
      <h1 className="cursor-pointer select-none text-5xl font-semibold m-4 p-4 uppercase drop-shadow-md shadow-lg w-full rounded-lg leading-relaxed tracking-wide">
        Digipedia
      </h1>

      <form
        className="flex flex-row m-8 text-center justify-center w-[80%]"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission
          fetchDigimonData(); // Call fetchDigimonData when the form is submitted
        }}
      >
        <input
          className="p-4 text-base bg-white text-center text-gray-500 w-2/3 rounded-tl-3xl rounded-bl-3xl rounded-tr-none rounded-br-none shadow-inner shadow-[#48709e] focus:outline-none"
          type="text"
          placeholder="Enter Digimon Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button
          className="p-4 text-base text-gray-100 text-center w-1/3 rounded-tl-none rounded-bl-none rounded-tr-3xl rounded-br-3xl shadow-md border border-gray-700 shadow-[#48709e] hover:bg-[#304b69]"
          onClick={fetchDigimonData}
        >
          Search
        </button>
      </form>
      {selectedDigimon ? (
        <div className="bg-[#304b69]/75 flex flex-col items-center witdh:full sm:w-[80%] m-4 p-8 rounded-3xl shadow-xl shadow-[#48709e]">
          <h2 className=" mb-4 text-2xl font-[520] tracking-wide">
            {selectedDigimon.name}
          </h2>
          <img
            className="w-64 h-64 rounded-xl shadow-xl border-2 border[#48709e]"
            src={selectedDigimon.images[0].href}
            alt={selectedDigimon.name}
          />
          <div className="flex flex-row gap-2 m-4 items-center">
            <p className="bg-[#48709e] py-2 px-4 rounded-full text-xs sm:text-sm text-gray-100 shadow-inner shadow-[#48709e]">
              {selectedDigimon.levels[0]?.level}
            </p>
            <p className="bg-[#48709e] py-2 px-4 rounded-full text-xs sm:text-sm text-gray-100 shadow-inner shadow-[#48709e]">
              {selectedDigimon.types[0]?.type}
            </p>
            <p className="bg-[#48709e] py-2 px-4 rounded-full text-xs sm:text-sm text-gray-100 shadow-inner shadow-[#48709e]">
              {selectedDigimon.attributes[0]?.attribute}
            </p>
          </div>
          <p className="text-sm sm:text-base text-gray-100 py-2 px-4 my-2 text-left leading-relaxed tracking-tight w-full">
            {englishDescription}
          </p>
          <div className="flex flex-row gap-x-4 sm:gap-x-0 text-center justify-center w-full">
            <div className="flex flex-col w-1/2">
              <h3 className="text-md sm:text-lg font-medium text-gray-100 pb-4">
                Evolve from:
              </h3>
              <ul className="flex flex-col justify-center items-center gap-2 md:flex-wrap md:flex-row md:items-start">
                {selectedDigimon.priorEvolutions.map((prior) => (
                  <Link href={`/digimon/${prior.digimon.replace(/ /g, '-')}`} key={prior.id}>
                  <li
                    className="w-36 sm:w-40 shadow-lg bg-[#48709e] mb-2 rounded-xl flex flex-col items-center whitespace-normal"
                    key={prior.id}
                  >
                    <img
                      className=" w-36 h-36 sm:w-40 sm:h-40 rounded-tl-xl rounded-tr-xl shadow-xl border-2 border[#48709e]"
                      src={prior.image}
                      alt={prior.digimon}
                    />
                    <h3 className="p-2 text-xs sm:text-sm">{prior.digimon}</h3>
                    {prior.condition ? (
                      <p className="text-xs text-gray-300 px-2 pb-2">
                        {prior.condition}
                      </p>
                    ) : null}
                  </li>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="flex flex-col w-1/2">
              <h3 className=" text-md sm:text-lg font-medium text-gray-100 pb-4">
                Evolve to:
              </h3>
              <ul className="flex flex-col justify-center items-center gap-2 md:flex-wrap md:flex-row md:items-start">
                {selectedDigimon.nextEvolutions.map((next) => (
                  <Link href={`/digimon/${next.digimon.replace(/ /g, '-')}`} key={next.id}>
                  <li
                    className="w-36 sm:w-40 shadow-lg bg-[#48709e] mb-2 rounded-xl flex flex-col items-center whitespace-normal"
                    key={next.id}
                  >
                    <img
                      className=" w-36 h-36 sm:w-40 sm:h-40 rounded-tl-xl rounded-tr-xl shadow-xl border-2 border[#48709e]"
                      src={next.image}
                      alt={next.digimon}
                    />
                    <h3 className="p-2 text-xs sm:text-sm">{next.digimon}</h3>
                    {next.condition ? (
                      <p className="text-xs text-gray-300 px-2 pb-2">
                        {next.condition}
                      </p>
                    ) : null}
                  </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center">
          <p className="text-lg font-semibold text-pink-500 mb-4">{error}</p>
          <h2 className="select-none text-lg font-medium text-gray-100 pb-2">
            Example Digimon:
          </h2>
          <ul className="flex flex-row items-start m-4 justify-between flex-wrap gap-2  w-[80%]">
            {digimons.map((digimon) => (
              <Link href={`/digimon/${digimon.name.replace(/ /g, '-')}`} key={digimon.id}>
                <li
                  key={digimon.id}
                  className="cursor-pointer w-36 sm:w-40 shadow-lg bg-[#48709e] mb-2 rounded-xl flex flex-col items-center whitespace-normal"
                >
                  <img
                    src={digimon.image}
                    alt={digimon.name}
                    className="w-36 sm:w-40 h-36 sm:h-40 rounded-tl-xl rounded-tr-xl shadow-xl border-2 border[#48709e]"
                  />
                  <h3 className="p-2 text-sm">{digimon.name}</h3>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
