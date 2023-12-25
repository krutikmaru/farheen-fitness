import React from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";

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
    <div className="w-full min-h-screen font-lexend bg-black-main flex justify-center items-center text-white">
      {props.children}
    </div>
  );
};

export default Layout;
