import { faChartGantt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 px-5 text-white font-lexend bg-black-main flex justify-between items-center border-b-2 border-[#131313]">
      <div className="w-14 h-14 flex justify-center items-center">
        <FontAwesomeIcon
          icon={faChartGantt}
          className="w-8 h-8 text-green-primary cursor-pointer"
        />
      </div>
      <div className="h-14 flex justify-center items-center ">
        <div className="w-9 h-9 rounded-full bg-green-primary cursor-pointer relative overflow-hidden">
          <img
            src="https://carzilla.m-fractal.com/files/meera2.jpg"
            className="absolute object-cover top-0 left-0 w-full h-full"
            alt="MEERA"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
