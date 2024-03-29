import React from "react";
import { CircularProgress } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
import { getProgress } from "../../utils/functions/getProgress";
import { useNavigate } from "react-router-dom";
const ProgressPanel = () => {
  const { goals } = useUser();
  return (
    <div className=" mt-5 relative">
      <div className="flex justify-start items-center overflow-x-scroll scrollbar-hidden px-5">
        <SideStrips />
        {goals.map((data, index) => {
          if (data.isSet) {
            return <ProgressBox key={index} {...data} index={index} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const ProgressBox = ({
  name,
  title,
  icon,
  color,
  targetLabel,
  valueLabel,
  unit,
  isSet,
  daily,
  monthly,
  yearly,
  index,
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeInOut" }}
      className="min-w-[340px] h-48  bg-[#101010] mr-5 p-5 rounded-md flex justify-center items-center cursor-pointer border-2 border-[#272727] hover:border-2 hover:border-[#dfff10b8] transition-colors duration-300 ease-in-out"
      onClick={() => {
        navigate(`/goals/${name}/add`);
      }}
    >
      <div className=" w-[45%] h-full  flex flex-col">
        <h1 className="text-xl ">
          {title} {icon}
        </h1>
        <span className="text-sm font-semibold mt-2 text-[#383838]">
          {valueLabel}
        </span>
        <span className="text-xl" style={{ color: color }}>
          {daily.value} {unit}
        </span>
        <span className="text-sm font-semibold mt-2 text-[#383838]">
          {targetLabel}
        </span>
        <span className="text-base ">
          {daily.target} {unit}
        </span>
      </div>
      <div className=" w-[50%] h-full flex justify-center items-center relative">
        <CircularProgress
          size={130}
          value={getProgress(daily.value, daily.target)}
          trackColor="#1f1f1f"
          capIsRound
          thickness={7}
          color={color}
        />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl"
          style={{ color: color }}
        >
          {getProgress(daily.value, daily.target)}%
        </span>
      </div>
    </motion.div>
  );
};
export default ProgressPanel;

const SideStrips = () => {
  return (
    <>
      <div className="absolute w-4 h-full z-10 bg-gradient-to-r from-black-main top-0 left-0"></div>
      <div className="absolute w-4 h-full z-10 bg-gradient-to-l from-black-main top-0 right-0"></div>
    </>
  );
};
