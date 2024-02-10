import { faBars, faChartGantt, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
const Navigation = () => {
  const { isSmallScreen, isMobileMenuActive, setIsMobileMenuActive } =
    useApplicationManager();
  const { user } = useUser();

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] h-16 px-5 text-white font-lexend bg-black-main flex justify-between items-center border-b-2 border-[#131313]">
      <div className="w-14 h-14 flex justify-center items-center">
        <FontAwesomeIcon
          icon={faChartGantt}
          className="w-8 h-8 text-green-primary cursor-pointer"
        />
      </div>
      <div className="h-14 flex justify-center items-center ">
        <Link to="/account">
          <div className="w-9 h-9 rounded-full flex justify-center items-center bg-green-primary cursor-pointer relative overflow-hidden">
            <h1 className="text-black-main text-xl">{user.name[0]}</h1>
          </div>
        </Link>
        {isSmallScreen && (
          <FontAwesomeIcon
            icon={isMobileMenuActive ? faX : faBars}
            className="ml-5 cursor-pointer"
            onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}
          />
        )}
      </div>
    </nav>
  );
};

export default Navigation;
