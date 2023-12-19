import { faChartGantt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = () => {
  return (
    <div className="w-full h-[30%]  flex flex-col justify-center items-center">
      <div className="w-24 h-24 text-white mb-2 flex justify-center items-center bg-[#1b1b1b] rounded-xl p-4">
        <FontAwesomeIcon
          icon={faChartGantt}
          className="h-12 w-12 text-pink-primary"
        />
      </div>
      <div>
        <h1 className="text-[#676767] font-medium  ">Fitterr</h1>
      </div>
    </div>
  );
};

export default Header;
