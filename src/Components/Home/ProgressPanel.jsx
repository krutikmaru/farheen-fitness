import React from "react";
import { CircularProgress } from "@chakra-ui/react";
import { motion } from "framer-motion";
const ProgressPanel = () => {
  const data = [
    {
      title: "Water 💧",
      targetLabel: "Goal",
      target: "3 Liter",
      valueLabel: "Consumed",
      value: "1.3 Liter",
      progress: 40,
      color: "#6fc3ff",
    },
    {
      title: "Calories 🔥",
      targetLabel: "Goal",
      target: "500 Cals",
      valueLabel: "Burnt",
      value: "376 Cals",
      progress: 75,
      color: "#ffb02e",
    },
    {
      title: "Sleep 💤",
      targetLabel: "Goal",
      target: "7 Hours",
      valueLabel: "Slept",
      value: "6.5 Hours",
      progress: 92,
      color: "#922eff",
    },
  ];
  return (
    <div className="mt-5 flex justify-start items-center overflow-x-scroll scrollbar-hidden">
      {data.map((d, index) => {
        return <ProgressBox {...d} index={index} />;
      })}
    </div>
  );
};

const ProgressBox = ({
  title,
  targetLabel,
  target,
  valueLabel,
  value,
  progress,
  color,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeInOut" }}
      className="min-w-[340px] h-48  bg-[#101010] mr-5 p-5 rounded-md flex justify-center items-center"
      style={{ border: `2px solid #272727` }}
    >
      <div className=" w-[45%] h-full  flex flex-col">
        <h1 className="text-xl ">{title}</h1>
        <span className="text-sm font-semibold mt-2 text-[#383838]">
          {valueLabel}
        </span>
        <span className="text-xl" style={{ color: color }}>
          {value}
        </span>
        <span className="text-sm font-semibold mt-2 text-[#383838]">
          {targetLabel}
        </span>
        <span className="text-base ">{target}</span>
      </div>
      <div className=" w-[50%] h-full flex justify-center items-center relative">
        <CircularProgress
          size={130}
          value={progress}
          trackColor="#1f1f1f"
          capIsRound
          thickness={7}
          color={color}
        />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl"
          style={{ color: color }}
        >
          {progress}%
        </span>
      </div>
    </motion.div>
  );
};
export default ProgressPanel;
