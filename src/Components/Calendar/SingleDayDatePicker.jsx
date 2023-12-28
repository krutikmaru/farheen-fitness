import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const SingleDayDatePicker = ({ startDate, setStartDate }) => {
  return (
    <div className="flex flex-col  items-center justify-center">
      <div>
        <p className="text-[#747474] text-base font-medium mb-1">
          Select a date
        </p>
        <DatePicker
          className="text-[#757575] outline-none p-5 rounded-md bg-[#101010] border-2 border-[#272727]"
          placeholderText="From Date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
    </div>
  );
};
