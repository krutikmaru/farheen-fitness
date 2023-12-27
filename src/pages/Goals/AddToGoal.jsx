import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import toast from "react-hot-toast";

const AddToGoal = () => {
  const [value, setValue] = useState(0);
  const { type } = useParams();
  const { userTrack, setUserTrack } = useUser();
  const navigate = useNavigate();

  const data = userTrack.filter(
    (track) => track.title.toLowerCase() === type.toLowerCase()
  )[0];

  const handleAdd = () => {
    let userTrackCopy = [...userTrack];
    userTrackCopy = userTrackCopy.map((copy) => {
      if (copy.title === data.title) {
        copy.values["Daily"].value += Number(value);
        return copy;
      }
      return copy;
    });
    setUserTrack(userTrackCopy);
    toast.success(`Updated`);
    navigate("/");
  };
  return (
    <div className=" flex w-full min-h-screen flex-col  p-10">
      <h1 className="text-5xl">
        <span className="text-green-primary">
          {data.title} {data.icon}
        </span>
      </h1>
      <div className=" h-96 bg-[#181818] rounded-md border-2 border-[#272727] mt-10 flex flex-col p-8">
        <div>
          <p className="text-[#747474] text-xl font-semibold mb-3">Time</p>
          <div>
            <input
              type="number"
              max={23}
              min={0}
              className="bg-[#292929] rounded-md p-4 text-xl outline-none border-2 border-[#363636] mr-4"
            />
            <input
              type="number"
              min={0}
              max={59}
              className="bg-[#292929] rounded-md p-4 text-xl outline-none border-2 border-[#363636]"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="text-[#747474] text-xl font-semibold mb-3">
            {data.values.unit} {data.values.valueLabel}
          </p>
          <div>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-[#292929] w-full rounded-md p-4 text-xl outline-none border-2 border-[#363636] mr-4"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleAdd}
            className="py-2 px-8 bg-green-primary text-black-main font-medium rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToGoal;
