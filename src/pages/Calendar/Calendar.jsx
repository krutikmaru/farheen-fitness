import React, { useEffect, useState } from "react";
import { SingleDayDatePicker } from "../../Components/Calendar/SingleDayDatePicker";
import { RangeDatePicker } from "../../Components/Calendar/RangeDatePicker";
import { useApplicationManager } from "../../contexts/ApplicationContext";

const Calendar = () => {
  const timeframes = ["Single Day", "Range"];
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const { setSelectedMenubarItemId } = useApplicationManager();
  useEffect(() => {
    setSelectedMenubarItemId("55e6ca900aaf432a8dea13820a36ddb1");
  }, [setSelectedMenubarItemId]);

  return (
    <div className=" flex w-full min-h-screen flex-col  p-8">
      <h1 className="text-2xl">
        Your <span className="text-green-primary">Calendar 📅</span>
      </h1>
      <p className="text-sm text-[#616161] mt-2 font-medium">
        Get statistics for a specific day or in a range of time period
      </p>
      <div className="w-full flex justify-start items-center space-x-4 text-xs mt-5">
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
      <div className="mt-8">
        {timeframe === "Single Day" ? (
          <SingleDayDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
          />
        ) : (
          <RangeDatePicker
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
