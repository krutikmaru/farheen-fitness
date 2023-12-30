import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WorkoutVideoElement = ({ workout, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: index * 0.2,
      }}
      key={workout.id}
      className="w-full min-h-[80px] bg-[#161616] rounded-md flex flex-col lg:flex-row items-center justify-start space-x-4 p-4 "
    >
      <div className="w-full lg:w-auto flex justify-center items-center">
        <div className=" w-[100%] sm:w-[50%] sm:h-40 lg:w-24 lg:h-14 rounded-md relative overflow-hidden ">
          <img
            src={workout.image}
            alt="Thumbnail"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="w-full lg:w-[70%]  mt-5 lg:mt-0 mx-5 lg:mx-0 whitespace-nowrap overflow-hidden text-ellipsis">
        <h1 className="text-[#cfcfcf] text-xs sm:text-base">{workout.title}</h1>
        <p className="text-xs text-[#707070]">Category: {workout.category}</p>
      </div>
      <div className="h-full w-full lg:w-[20%] mt-5 lg:mt-0  flex justify-center items-center">
        <Link
          to={`/workouts/${workout.id}`}
          className="w-full py-2 px-4 text-sm rounded-md font-semibold text-[#101010] bg-green-primary flex justify-center items-center"
        >
          Watch
        </Link>
      </div>
    </motion.div>
  );
};

export default WorkoutVideoElement;
