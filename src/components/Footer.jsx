// Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center mt-10 p-4 text-center select-none w-full">
      <div className="shadow-footer"></div>
      <p className="text-gray-100 text-xs leading-relaxed w-[80%]">
        This page is a personal project of <span className="font-semibold text-blue-200 hover:underline"><a  href="https://github.com/Jeppuu"
          target="_blank"
          rel="noopener noreferrer"
         >Jeppu</a></span>, who was looking for a way to explore digimon and easily view their digivolution options, without navigating through multiple pages. May it bring joy to other Digimon fans as well!
      </p>
    </footer>
  );
}

export default Footer;
