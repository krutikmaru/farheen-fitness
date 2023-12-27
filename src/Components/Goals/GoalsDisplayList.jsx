import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { motion } from "framer-motion";

const GoalsDisplayList = () => {
  const data = [
    {
      icon: "💧",
      title: "Water",
      color: "#6fc3ff",
      values: {
        isSet: true,
        targetLabel: "Goal",
        valueLabel: "Consumed",
        Daily: {
          target: "3 Liter",
          value: "1.3 Liter",
          progress: 40,
        },
        Monthly: {
          target: "90 Liter",
          value: "47 Liter",
          progress: 40,
        },
        Yearly: {
          target: "1080 Liter",
          value: "568 Liter",
          progress: 40,
        },
      },
    },
    {
      icon: "🔥",
      title: "Calories",
      color: "#ffb02e",
      values: {
        isSet: true,
        targetLabel: "Goal",
        valueLabel: "Burnt",
        Daily: {
          target: "500 Cals",
          value: "376 Cals",
          progress: 75,
        },
        Monthly: {
          target: "15K Cals",
          value: "11.28K Cals",
          progress: 75,
        },
        Yearly: {
          target: " 180k Cals",
          value: "134K Cals",
          progress: 75,
        },
      },
    },
    {
      icon: "💤",
      title: "Sleep",
      color: "#922eff",
      values: {
        isSet: true,
        targetLabel: "Goal",
        valueLabel: "Slept",
        Daily: {
          target: "7 Hours",
          value: "6.5 Hours",
          progress: 92,
        },
        Monthly: {
          target: "210 Hours",
          value: "195 Hours",
          progress: 75,
        },
        Yearly: {
          target: "2520 Hours",
          value: "2280 Hours",
          progress: 75,
        },
      },
    },
    {
      icon: "👣",
      title: "Steps",
      color: "#6fff81",
      values: {
        isSet: false,
        targetLabel: "Goal",
        valueLabel: "Done",
        Daily: {
          target: null,
          value: null,
          progress: null,
        },
        Monthly: {
          target: null,
          value: null,
          progress: null,
        },
        Yearly: {
          target: null,
          value: null,
          progress: null,
        },
      },
    },
  ];
  return (
    <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
      {data.map((d, index) => {
        return <SingleGoalDisplay {...d} index={index} />;
      })}
    </div>
  );
};

export default GoalsDisplayList;

const SingleGoalDisplay = ({ icon, title, color, values, index }) => {
  const timeframes = ["Daily", "Monthly", "Yearly"];
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 * (index + 1) }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className="w-full space-y-10 sm:space-y-0 sm:h-44 p-5 sm:py-0 rounded-md overflow-hidden bg-[#101010] border-2 border-[#272727] flex justify-start sm:justify-between items-center flex-col sm:flex-row"
    >
      <div className="w-[20%] h-full flex flex-col justify-center items-center">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-2xl mt-3">{title}</h1>
      </div>
      {values.isSet ? (
        <div className="w-full h-full sm:w-[60%] flex flex-col justify-center items-center">
          <div className="w-full flex justify-evenly items-center text-xs mb-3">
            {timeframes.map((tf) => {
              if (tf === timeframe)
                return (
                  <span className="border-[1px] border-green-primary bg-green-primary text-black-main rounded-xl px-4 py-1 cursor-pointer">
                    {tf}
                  </span>
                );
              return (
                <span
                  onClick={() => setTimeframe(tf)}
                  className="border-[1px] border-green-primary rounded-xl px-4 py-1 cursor-pointer"
                >
                  {tf}
                </span>
              );
            })}
          </div>
          <div className="w-full flex  items-center justify-center sm:justify-start flex-col sm:flex-row">
            <div className="bg-[#181818] w-full sm:w-40 h-24 border-2 border-[#272727] lg:w-36 rounded-md sm:mr-2 mb-2 sm:mb-0 flex justify-center items-start flex-col px-5">
              <p className="text-[#5c5c5c] text-sm sm:text-base">
                {values.targetLabel}
              </p>
              <span className="text-base sm:text-lg">
                {values[timeframe].target}
              </span>
            </div>
            <div className="bg-[#181818] w-full sm:w-40 h-24 lg:w-36 border-2 border-[#272727] rounded-md flex justify-center items-start flex-col px-5">
              <p className="text-[#5c5c5c] text-sm sm:text-base">
                {values.valueLabel}
              </p>
              <span className="text-base sm:text-lg" style={{ color: color }}>
                {values[timeframe].value}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[50%] h-[50%] rounded-md bg-[#181818] border-2 border-[#272727] flex justify-center items-center">
          <h1 className="text-[#5c5c5c] text-sm font-medium">No Data Set</h1>
        </div>
      )}

      <div className="w-full sm:w-[20%] h-full  flex justify-center items-center">
        <FontAwesomeIcon
          icon={faArrowRight}
          className=" py-2 px-4 w-full sm:w-auto text-sm rounded-md cursor-pointer text-[#101010] bg-green-primary"
        />
      </div>
    </motion.div>
  );
};
