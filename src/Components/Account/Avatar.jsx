import React from "react";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
const Avatar = ({ image, name }) => {
  const { user } = useUser();
  return (
    <motion.div className="w-full min-h-[200px] flex justify-center items-center flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="bg-green-primary flex justify-center items-center h-52 w-52 rounded-full relative overflow-hidden"
      >
        <h1 className="text-black-main text-9xl">{user.name[0]}</h1>
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
