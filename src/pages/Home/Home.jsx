import React, { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import ProgressPanel from "../../Components/Home/ProgressPanel";
import { useApplicationManager } from "../../contexts/ApplicationContext";
import { menubar } from "../../utils/data/menubar";
import WorkoutsPanel from "../../Components/Home/WorkoutsPanel";
import AIPanel from "../../Components/Home/AIPanel";

const Home = () => {
  const { user } = useUser();
  const { setSelectedMenubarItemId } = useApplicationManager();

  useEffect(() => {
    setSelectedMenubarItemId(menubar.forYou[0].id);
  }, [setSelectedMenubarItemId]);

  return (
    <div className=" flex w-full min-h-screen flex-col  p-8">
      <h1 className="text-2xl">
        Welcome <span className="text-green-primary">{user.name}</span>!
      </h1>
      <ProgressPanel />
      <AIPanel />
      <WorkoutsPanel />
    </div>
  );
};

export default Home;
