import React from "react";

const Avatar = ({ image, name }) => {
  return (
    <div className="w-full min-h-[200px] flex justify-center items-center flex-col">
      <div className="bg-[#181818] h-52 w-52 rounded-full relative overflow-hidden">
        <img
          className="absolute object-cover top-0 left-0 w-full h-full"
          src={image}
          alt={name}
        />
      </div>
      <h1 className="text-3xl mt-4">{name}</h1>
    </div>
  );
};

export default Avatar;
