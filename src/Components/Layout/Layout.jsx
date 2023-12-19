import React from "react";

const Layout = (props) => {
  return (
    <>
      <div className="w-full min-h-screen font-lexend bg-black-main flex justify-center items-center text-white">
        {props.children}
      </div>
      ;
    </>
  );
};

export default Layout;
