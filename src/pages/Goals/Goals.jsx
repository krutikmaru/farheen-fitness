import React, { useEffect } from "react";
import GoalsDisplayList from "../../Components/Goals/GoalsDisplayList";
import { useApplicationManager } from "../../contexts/ApplicationContext";

const Goals = () => {
  const { setSelectedMenubarItemId } = useApplicationManager();
  useEffect(() => {
    setSelectedMenubarItemId("24d707543a344bbda65e8157524b2f1b");
  }, [setSelectedMenubarItemId]);

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
