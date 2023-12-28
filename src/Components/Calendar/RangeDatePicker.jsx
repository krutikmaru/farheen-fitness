import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const RangeDatePicker = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <div>
        <p className="text-[#747474] text-base font-medium mb-1 ml-2">From</p>
        <DatePicker
          className="text-[#757575] outline-none p-5 rounded-md bg-[#101010] border-2 border-[#272727]"
          placeholderText="From Date"
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
        />
      </div>
      <div>
        <p className="text-[#747474] text-base font-medium mb-1 ml-2">To</p>
        <DatePicker
          className="text-[#757575] outline-none p-5 rounded-md bg-[#101010] border-2 border-[#272727]"
          placeholderText="To Date"
          selected={toDate}
          minDate={fromDate}
          onChange={(date) => setToDate(date)}
        />
      </div>
    </div>
  );
};
