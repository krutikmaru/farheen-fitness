import React from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";
import Navigation from "../Navigation/Navigation";
import Menubar from "../Menubar/Menubar";

const Layout = (props) => {
  const { isSmallScreen } = useApplicationManager();
  return isSmallScreen ? (
    <MobileLayout>{props.children}</MobileLayout>
  ) : (
    <DesktopLayout>{props.children}</DesktopLayout>
  );
};

const MobileLayout = (props) => {
  return (
    <div className="w-full min-h-screen font-lexend bg-black-main flex justify-center items-center text-white">
      {props.children}
    </div>
  );
};

const DesktopLayout = (props) => {
  return (
    <>
      <Navigation />
      <div className="w-full min-h-screen font-lexend bg-black-main flex justify-start items-start text-white mt-16">
        <div className="border-r-2 border-[#131313] w-[250px] h-screen fixed left-0">
          <Menubar />
        </div>
        <div className=" w-full pl-[250px]">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
