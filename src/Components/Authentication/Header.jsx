import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = () => {
  return (
    <div className="w-full h-[30%] flex flex-col justify-center items-center">
      <div className="w-20 h-20 text-white mb-2 flex justify-center items-center">
        <FontAwesomeIcon icon={faDumbbell} className="h-16 w-16" />
      </div>
      <div>
        <h1 className="text-[#676767] font-medium text-sm ">
          Your Fitness Companion
        </h1>
      </div>
    </div>
  );
};

export default Header;
