import React, { useState } from "react";
import Header from "./Header";
import { motion } from "framer-motion";
import { useUser } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { getDocs, collection, where, query } from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
const SignIn = ({
  auth,
  firestore,
  setIsSignIn,
  authRequestSent,
  setAuthRequestSent,
}) => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const parentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const childVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignIn = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email is not valid ");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    try {
      setAuthRequestSent(true);
      await signInWithEmailAndPassword(auth, email, password);

      const usersCollectionRef = collection(firestore, "Users");
      const q = query(usersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocSnapshot = querySnapshot.docs[0];
        const userData = userDocSnapshot.data();
        setUser(userData);
        setAuthRequestSent(false);
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      const errorCode = error.code;
      if (String(errorCode) === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.message);
      }
      setAuthRequestSent(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (resetLinkSent) {
      toast("Reset Link already sent", { icon: "✉️" });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
      setResetLinkSent(true);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <motion.div
      className="w-[300px] sm:w-[400px] h-[85%] bg-[#0f0f0f] rounded-lg overflow-hidden"
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <Header />
      <motion.div
        className="w-full h-[70%] flex  justify-evenly items-center flex-col px-7 sm:px-14"
        variants={childVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div className=" w-full  mb-4">
            <input
              className="w-full h-10 bg-transparent border-b-[1px] outline-none text-gray-400 px-2 text-base border-[#181818] placeholder:text-[#434343]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col items-end">
            <input
              className="w-full  h-10 bg-transparent border-b-[1px] outline-none text-gray-400 px-2 text-base border-[#181818] placeholder:text-[#434343] "
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="text-right mt-4 text-[#676767] font-light text-sm hover:underline "
            >
              Forgot Password
            </button>
          </div>
        </div>
        <div className="w-full">
          <button
            disabled={authRequestSent}
            className="w-full h-10 bg-pink-primary rounded-md text-white mb-5"
            onClick={handleSignIn}
          >
            SIGN IN
          </button>
          <button
            disabled={authRequestSent}
            onClick={() => setIsSignIn(false)}
            className="w-full h-10 border-[1px] border-pink-primary text-white rounded-md  font-light"
          >
            SIGN UP
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
