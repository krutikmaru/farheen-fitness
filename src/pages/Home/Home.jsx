import React from "react";
import { getAuth } from "firebase/auth";
import { useUser } from "../../contexts/UserContext";
import app from "../../backend/Firebase/firebase.js";

const Home = () => {
  const { setUser, user } = useUser();
  const auth = getAuth(app);

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1>Welcome {user.email}</h1>
      <button
        className="bg-red-600 px-6 py-1 rounded-md mt-3"
        onClick={() => {
          try {
            auth.signOut();
            setUser(null);
          } catch (e) {
            console.log(e);
          }
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Home;
