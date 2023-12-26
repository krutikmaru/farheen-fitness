import React from "react";
import { useUser } from "../../contexts/UserContext";
import ProgressPanel from "../../Components/Home/ProgressPanel";

const Home = () => {
  const { user } = useUser();

  return (
    <div className=" flex w-full min-h-screen flex-col  p-8">
      <h1 className="text-2xl">
        Welcome <span className="text-green-primary">{user.name}</span>!
      </h1>
      <ProgressPanel />
    </div>
  );
};

export default Home;
