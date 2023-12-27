import React from "react";
import GoalsDisplayList from "../../Components/Goals/GoalsDisplayList";

const Goals = () => {
  return (
    <div className=" flex w-full min-h-screen flex-col  p-8">
      <h1 className="text-2xl">
        Your <span className="text-green-primary">Goals 🎯</span>
        <GoalsDisplayList />
      </h1>
    </div>
  );
};

export default Goals;
