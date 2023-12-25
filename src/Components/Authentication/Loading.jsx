import BarLoader from "react-spinners/BarLoader";

import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#0a0a0a4f] backdrop-blur-2xl text-white flex justify-center items-center">
      <BarLoader color="#deff10" size={40} />
    </div>
  );
};

export default Loading;
