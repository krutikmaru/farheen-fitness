import React, { useEffect } from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";

const Workouts = () => {
  const { setSelectedMenubarItemId } = useApplicationManager();
  useEffect(() => {
    setSelectedMenubarItemId("5fa9138bbfeb44a8a1f8287825247db0");
  }, [setSelectedMenubarItemId]);
  return (
    <div className=" flex w-full min-h-screen flex-col  p-8">
      <h1 className="text-2xl">
        <span className="text-green-primary">Workouts 💪🏼</span>
      </h1>
    </div>
  );
};

export default Workouts;
