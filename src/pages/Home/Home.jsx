import React from "react";
import { useUser } from "../../contexts/UserContext";

const Home = () => {
  const { user } = useUser();

  return (
    <div className=" flex  min-h-screen flex-col justify-center items-center">
      <h1>Welcome {user.name}</h1>
    </div>
  );
};

export default Home;
