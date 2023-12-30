import React from "react";
import { motion } from "framer-motion";
const Avatar = ({ image, name }) => {
  return (
    <motion.div className="w-full min-h-[200px] flex justify-center items-center flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="bg-[#181818] h-52 w-52 rounded-full relative overflow-hidden"
      >
        <img
          className="absolute object-cover top-0 left-0 w-full h-full"
          src={image}
          alt={name}
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="text-3xl mt-4"
      >
        {name}
      </motion.h1>
    </motion.div>
  );
};

export default Avatar;
