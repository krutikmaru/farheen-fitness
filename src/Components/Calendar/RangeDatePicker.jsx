import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../../contexts/UserContext";
import { getDateObjectFromString } from "../../utils/functions/getDateObjectFromString";

export const RangeDatePicker = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => {
  const { userTrack, user } = useUser();

  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <div>
        <p className="text-[#747474] text-base font-medium mb-1 ml-2">From</p>
        <DatePicker
          className="text-[#757575] outline-none p-5 rounded-md bg-[#101010] border-2 border-[#272727]"
          placeholderText="From Date"
          selected={fromDate}
          minDate={getDateObjectFromString(String(user.joinDateId))}
          maxDate={getDateObjectFromString(
            String(userTrack[userTrack.length - 1].dateId)
          )}
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
          maxDate={getDateObjectFromString(
            String(userTrack[userTrack.length - 1].dateId)
          )}
          onChange={(date) => setToDate(date)}
        />
      </div>
    </div>
  );
};
