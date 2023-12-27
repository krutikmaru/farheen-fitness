import React from "react";
import { CircularProgress } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
const ProgressPanel = () => {
  const { userTrack } = useUser();
  return (
    <div className="mt-5 flex justify-start items-center overflow-x-scroll scrollbar-hidden">
      {userTrack.map((data, index) => {
        if (data.values.isSet) {
          return <ProgressBox {...data} index={index} />;
        }
        return null;
      })}
    </div>
  );
};

const ProgressBox = ({ title, icon, color, values, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeInOut" }}
      className="min-w-[340px] h-48  bg-[#101010] mr-5 p-5 rounded-md flex justify-center items-center "
      style={{ border: `2px solid #272727` }}
    >
      <div className=" w-[45%] h-full  flex flex-col">
        <h1 className="text-xl ">
          {title} {icon}
        </h1>
        <span className="text-sm font-semibold mt-2 text-[#383838]">
          {values.valueLabel}
        </span>
        <span className="text-xl" style={{ color: color }}>
          {values["Daily"].value} {values.unit}
        </span>
        <span className="text-sm font-semibold mt-2 text-[#383838]">
          {values.targetLabel}
        </span>
        <span className="text-base ">
          {values["Daily"].target} {values.unit}
        </span>
      </div>
      <div className=" w-[50%] h-full flex justify-center items-center relative">
        <CircularProgress
          size={130}
          value={values["Daily"].progress}
          trackColor="#1f1f1f"
          capIsRound
          thickness={7}
          color={color}
        />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl"
          style={{ color: color }}
        >
          {values["Daily"].progress}%
        </span>
      </div>
    </motion.div>
  );
};
export default ProgressPanel;
