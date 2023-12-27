import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
import { formatNumber } from "../../utils/functions/formatNumber";
import { Link } from "react-router-dom";

const GoalsDisplayList = () => {
  const { userTrack } = useUser();

  return (
    <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
      {userTrack.map((data, index) => {
        return <SingleGoalDisplay {...data} index={index} />;
      })}
    </div>
  );
};

export default GoalsDisplayList;

const SingleGoalDisplay = ({
  icon,
  title,
  color,
  navigateUrl,
  values,
  index,
}) => {
  const timeframes = ["Daily", "Monthly", "Yearly"];
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.1 * index,
        ease: "easeInOut",
      }}
      className="w-full space-y-10 sm:space-y-0 sm:h-44 p-5 sm:py-0 rounded-md overflow-hidden bg-[#101010] border-2 border-[#272727] flex justify-start sm:justify-between items-center flex-col sm:flex-row"
    >
      <div className="w-[20%] h-full flex flex-col justify-center items-center">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-base mt-3">{title}</h1>
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
                {formatNumber(values[timeframe].target)} {values.unit}
              </span>
            </div>
            <div className="bg-[#181818] w-full sm:w-40 h-24 lg:w-36 border-2 border-[#272727] rounded-md flex justify-center items-start flex-col px-5">
              <p className="text-[#5c5c5c] text-sm sm:text-base">
                {values.valueLabel}
              </p>
              <span className="text-base sm:text-lg" style={{ color: color }}>
                {formatNumber(values[timeframe].value)} {values.unit}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[50%] h-[50%] rounded-md bg-[#181818] border-2 border-[#272727] flex justify-center items-center">
          <h1 className="text-[#5c5c5c] text-sm font-medium">No Data Set</h1>
        </div>
      )}

      <div className="w-full sm:w-[20%]  h-full  flex sm:flex-col justify-evenly sm:justify-center items-end">
        <Link
          to={`${navigateUrl}/edit`}
          className="w-[45%] sm:w-[70%] py-2 px-4 text-sm rounded-md cursor-pointer sm:mb-5 text-[#101010] bg-green-primary flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faEdit} className=" " />
        </Link>
        <Link
          to={`${navigateUrl}/add`}
          className="w-[45%] sm:w-[70%] py-2 px-4 text-sm rounded-md cursor-pointer  text-[#101010] bg-green-primary flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
    </motion.div>
  );
};
