import React, { useState } from "react";
import app from "../../backend/Firebase/firebase.js";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import SignIn from "../../Components/Authentication/SignIn";
import SignUp from "../../Components/Authentication/SignUp";
import Loading from "../../Components/Authentication/Loading.jsx";

const Authentication = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [authRequestSent, setAuthRequestSent] = useState(false);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  console.log(auth);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black-main font-lexend overflow-hidden">
      {authRequestSent && <Loading />}
      {isSignIn ? (
        <SignIn
          setIsSignIn={setIsSignIn}
          auth={auth}
          firestore={firestore}
          authRequestSent={authRequestSent}
          setAuthRequestSent={setAuthRequestSent}
        />
      ) : (
        <SignUp
          setIsSignIn={setIsSignIn}
          auth={auth}
          firestore={firestore}
          authRequestSent={authRequestSent}
          setAuthRequestSent={setAuthRequestSent}
        />
      )}
    </div>
  );
};

export default Authentication;
