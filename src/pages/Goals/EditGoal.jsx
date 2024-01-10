import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { roundToTwoDecimalPlaces } from "../../utils/functions/roundToTwoDecimalPlace";

const EditGoal = () => {
  const { user, setUser, goals, setGoals, updateUser } = useUser();
  const { type } = useParams();
  const navigate = useNavigate();

  const data = goals.filter((goal) => goal.name === type.toLowerCase())[0];

  const [daily, setDaily] = useState(data["daily"].target);
  const [monthly, setMonthly] = useState(data["monthly"].target);
  const [yearly, setYearly] = useState(data["yearly"].target);

  const handleValueChange = (value, type) => {
    value = Number(value);
    if (type === "daily") {
      setDaily(roundToTwoDecimalPlaces(value));
      setMonthly(roundToTwoDecimalPlaces(value * 30));
      setYearly(roundToTwoDecimalPlaces(value * 365));
    }
    if (type === "monthly") {
      setMonthly(roundToTwoDecimalPlaces(value));
      setDaily(roundToTwoDecimalPlaces(value / 30));
      setYearly(roundToTwoDecimalPlaces(value * 12));
    }
    if (type === "yearly") {
      setYearly(roundToTwoDecimalPlaces(value));
      setDaily(roundToTwoDecimalPlaces(value / 365));
      setMonthly(roundToTwoDecimalPlaces(value / 12));
    }
  };
  const handleUpdate = async (name) => {
    let goalsCopy = [...goals];
    goalsCopy = goalsCopy.map((copy) => {
      if (copy.title === data.title) {
        copy["daily"].target = daily;
        copy["monthly"].target = monthly;
        copy["yearly"].target = yearly;
        if (!copy.isSet) {
          // For goals that have not been set
          copy.isSet = true;
        }
        return copy;
      }
      return copy;
    });

    const userCopy = JSON.parse(JSON.stringify(user));
    const correspondingGoalIndex = userCopy.goals.findIndex(
      (g) => g.name === name
    );
    console.log(correspondingGoalIndex);
    userCopy.goals[correspondingGoalIndex].daily = daily;
    userCopy.goals[correspondingGoalIndex].monthly = monthly;
    userCopy.goals[correspondingGoalIndex].yearly = yearly;
    if (!userCopy.goals[correspondingGoalIndex].isSet) {
      userCopy.goals[correspondingGoalIndex].isSet = true;
    }
    await updateUser(userCopy);
    setUser(userCopy);
    setGoals(goalsCopy);
    navigate("/goals");
  };
  return (
    <div className=" flex w-full min-h-screen flex-col  p-10">
      <h1 className="text-5xl">
        Edit <span className="text-green-primary">{data.title}</span> Goals{" "}
        {data.icon}
      </h1>
      <div className=" min-h-[380px] bg-[#181818] rounded-md border-2 border-[#272727] mt-10 flex flex-col p-8">
        <div>
          <p className="text-[#747474] text-xl font-semibold mb-3">Daily</p>
          <div>
            <input
              type="number"
              value={daily}
              onChange={(e) => handleValueChange(e.target.value, "daily")}
              className="bg-[#292929] w-full rounded-md p-4 text-xl outline-none border-2 border-[#363636] mr-4"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="text-[#747474] text-xl font-semibold mb-3">Monthly</p>
          <div>
            <input
              type="number"
              value={monthly}
              onChange={(e) => handleValueChange(e.target.value, "monthly")}
              className="bg-[#292929] w-full rounded-md p-4 text-xl outline-none border-2 border-[#363636] mr-4"
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="text-[#747474] text-xl font-semibold mb-3">Yearly</p>
          <div>
            <input
              type="number"
              value={yearly}
              onChange={(e) => handleValueChange(e.target.value, "yearly")}
              className="bg-[#292929] w-full rounded-md p-4 text-xl outline-none border-2 border-[#363636] mr-4"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={() => handleUpdate(data.name)}
            className="py-2 px-8 bg-green-primary text-black-main font-medium rounded-md"
          >
            {data.isSet ? "Update" : "Set"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoal;
