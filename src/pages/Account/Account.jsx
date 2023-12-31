import React, { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import Avatar from "../../Components/Account/Avatar";
import Details from "../../Components/Account/Details";
import { useApplicationManager } from "../../contexts/ApplicationContext";

const Account = () => {
  const { user } = useUser();
  const { setSelectedMenubarItemId } = useApplicationManager();
  useEffect(() => {
    setSelectedMenubarItemId("3cbd85224a4c490e91ac180c4e3e0db5");
  }, [setSelectedMenubarItemId]);
  return (
    <div className=" flex w-full min-h-screen flex-col  p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl">
          <span className="text-green-primary">{user.name}'s</span> Account
        </h1>
      </div>
      {/* Avatar */}
      <div className="mt-10">
        <Avatar
          image="https://carzilla.m-fractal.com/files/meeraaa.jpg"
          name={user.name}
        />
      </div>
      {/* Details  */}
      <div className="mt-10">
        <Details name={user.name} email={user.email} />
      </div>
    </div>
  );
};

export default Account;
