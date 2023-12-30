import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PuffLoader from "react-spinners/PuffLoader";
import { useApplicationManager } from "../../contexts/ApplicationContext";

const Diet = () => {
  const [requestSent, setIsRequestSent] = useState(false);
  const [prompt, setPromot] = useState("");
  const [response, setResponse] = useState(null);

  const { setSelectedMenubarItemId } = useApplicationManager();
  useEffect(() => {
    setSelectedMenubarItemId("cf75b6446a444111acb071259e93cf47");
  }, [setSelectedMenubarItemId]);

  const sendRequest = () => {
    setIsRequestSent(true);
    setTimeout(() => {
      setResponse(
        "1. Tip 1: Cut back on sugary drinks and snacks.\n2. Tip 2: Incorporate both cardio and strength training in your routine.\n\n1. Diet 1: Opt for whole grains over refined carbs like white bread.\n2. Diet 2: Add more protein to your meals; think chicken, fish, or tofu."
      );
      setIsRequestSent(false);
    }, 5000);
  };
  return (
    <div className=" flex w-full min-h-screen flex-col  p-8">
      <h1 className="text-2xl">
        Get AI Personalised <span className="text-green-primary">Diets 🥗</span>
      </h1>
      <div className="w-full mt-5">
        <p className="text-[#535353] text-sm font-medium mb-1">Prompt</p>
        <textarea
          value={prompt}
          onChange={(e) => setPromot(e.target.value)}
          className="text-[#b8b8b8] w-full outline-none p-5 rounded-md bg-[#101010] border-2 border-[#272727] min-h-[200px] max-h-[200px]"
        />
      </div>
      {requestSent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="w-full flex items-center justify-center mt-5 px-5"
        >
          <PuffLoader color="#deff10" size={60} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          onClick={sendRequest}
          className="w-full flex items-center justify-end mt-5 px-5"
        >
          <button
            disabled={!prompt}
            className="w-32 h-10 py-2 px-4 text-sm rounded-md font-medium text-[#101010] bg-green-primary flex justify-center items-center disabled:cursor-not-allowed"
          >
            Get Diet
          </button>
        </motion.div>
      )}
      {response && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="w-full flex flex-col items-start justify-start mt-5"
        >
          <p className="text-[#535353] text-sm font-medium mb-1">Response</p>
          <pre className="px-5 w-full whitespace-pre-wrap font-lexend text-[#b8b8b8] text-lg mt-3 p-5 rounded-md bg-[#101010] border-2 border-green-primary">
            {response}
          </pre>
        </motion.div>
      )}
    </div>
  );
};

export default Diet;
