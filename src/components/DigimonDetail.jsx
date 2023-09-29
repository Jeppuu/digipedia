import React, { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";


function DigimonDetail() {
  const [selectedDigimon, setSelectedDigimon] = useState(null);
  const [englishDescription, setEnglishDescription] = useState("");
  const [error, setError] = useState("");
  const [match, params] = useRoute("/digimon/:digimonName");
  const digimonName = params.digimonName.replace(/-/g, ' '); //replace spaces with dashes

  useEffect(() => {
    // Fetch data for the Digimon with the specified ID (digimonId)
    fetch(`https://www.digi-api.com/api/v1/digimon/${digimonName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Digimon not found");
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
  }, [digimonName]);

  return (
    <div className="flex flex-col text-center items-center m-2 text-white">
      <Link href="/">
      <h1 className="cursor-pointer select-none text-5xl font-semibold m-4 p-4 uppercase drop-shadow-md shadow-lg w-full rounded-lg leading-relaxed tracking-wide">
        Digipedia
      </h1>
        </Link>
    <div className="bg-[#304b69]/75 flex flex-col items-center witdh:full sm:w-[80%] m-4 p-8 rounded-3xl shadow-xl shadow-[#48709e]">
      <h2 className="mb-4 text-2xl text-white font-[520] tracking-wide">
        {selectedDigimon ? selectedDigimon.name : "Digimon Not Found"}
      </h2>
      {selectedDigimon ? (
        <img
          className="w-64 h-64 rounded-xl shadow-xl border-2 border[#48709e]"
          src={selectedDigimon.images[0].href}
          alt={selectedDigimon.name}
        />
      ) : null}
      {selectedDigimon ? (
        <div className="flex flex-row gap-2 m-4 items-center select-none">
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
      ) : null}
      <p className="text-sm sm:text-base text-gray-100 py-2 px-4 my-2 text-left leading-relaxed tracking-tight w-full">
        {englishDescription}
      </p>
      {selectedDigimon ? (
        <div className="flex flex-row gap-x-4 sm:gap-x-0 text-center justify-center w-full">
          <div className="flex flex-col w-1/2">
            <h3 className="text-md sm:text-lg font-medium text-gray-100 pb-4">
              Evolve from:
            </h3>
            <ul className="flex flex-col justify-center items-center gap-2 md:flex-wrap md:flex-row md:items-start">
              {selectedDigimon.priorEvolutions.map((prior) => (
                <Link href={`/digimon/${prior.digimon.replace(/ /g, '-')}`} key={prior.id}>
                  <li className="cursor-pointer w-36 sm:w-40 shadow-lg bg-[#48709e] mb-2 rounded-xl flex flex-col items-center whitespace-normal">
                    <img
                      className="w-36 h-36 sm:w-40 sm:h-40 rounded-tl-xl rounded-tr-xl shadow-xl border-2 border[#48709e]"
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
            <h3 className="text-md sm:text-lg font-medium text-gray-100 pb-4">
              Evolve to:
            </h3>
            <ul className="flex flex-col justify-center items-center gap-2 md:flex-wrap md:flex-row md:items-start">
              {selectedDigimon.nextEvolutions.map((next) => (
                <Link href={`/digimon/${next.digimon.replace(/ /g, '-')}`} key={next.id}>
                <li
                  className="cursor-pointer w-36 sm:w-40 shadow-lg bg-[#48709e] mb-2 rounded-xl flex flex-col items-center whitespace-normal"
                  key={next.id}
                >
                  <img
                    className="w-36 h-36 sm:w-40 sm:h-40 rounded-tl-xl rounded-tr-xl shadow-xl border-2 border[#48709e]"
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
      ) : null}
    </div>
    </div>
  );
}

export default DigimonDetail;
