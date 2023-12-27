import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const GoalsDisplayList = () => {
  const data = [
    {
      icon: "💧",
      title: "Water",
      color: "#6fc3ff",
      values: {
        isSet: true,
        targetLabel: "Goal",
        target: "3 Liter",
        valueLabel: "Consumed",
        value: "1.3 Liter",
        progress: 40,
      },
    },
    {
      icon: "🔥",
      title: "Calories",
      color: "#ffb02e",
      values: {
        isSet: true,
        targetLabel: "Goal",
        target: "500 Cals",
        valueLabel: "Burnt",
        value: "376 Cals",
        progress: 75,
      },
    },
    {
      icon: "💤",
      title: "Sleep",
      color: "#922eff",
      values: {
        isSet: true,
        targetLabel: "Goal",
        target: "7 Hours",
        valueLabel: "Slept",
        value: "6.5 Hours",
        progress: 92,
      },
    },
    {
      icon: "👣",
      title: "Steps",
      color: "#6fff81",
      values: {
        isSet: false,
        targetLabel: "Goal",
        target: null,
        valueLabel: "Done",
        value: null,
        progress: null,
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
  return (
    <div className="w-full space-y-10 sm:space-y-0 sm:h-40 p-5 sm:py-0 rounded-md overflow-hidden bg-[#101010] border-2 border-[#272727] flex justify-start sm:justify-between items-center flex-col sm:flex-row">
      <div className="w-[25%] h-full flex flex-col justify-center items-center">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-2xl mt-3">{title}</h1>
      </div>
      {values.isSet ? (
        <div className="w-full sm:w-[55%] h-full flex  items-center justify-center sm:justify-start flex-col sm:flex-row">
          <div className="bg-[#181818] w-full sm:w-40 h-24 border-2 border-[#272727] lg:w-32 rounded-md sm:mr-2 mb-2 sm:mb-0 flex justify-center items-start flex-col px-5">
            <p className="text-[#5c5c5c] text-sm sm:text-base">
              {values.targetLabel}
            </p>
            <span className="text-base sm:text-lg">{values.target}</span>
          </div>
          <div className="bg-[#181818] w-full sm:w-40 h-24 lg:w-32 border-2 border-[#272727] rounded-md flex justify-center items-start flex-col px-5">
            <p className="text-[#5c5c5c] text-sm sm:text-base">
              {values.valueLabel}
            </p>
            <span className="text-base sm:text-lg" style={{ color: color }}>
              {values.value}
            </span>
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
    </div>
  );
};
