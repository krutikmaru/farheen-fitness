import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";
import { useUser } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { formatToDDMon } from "../../utils/functions/formatToDDMon";

const Details = ({ name, email, joined }) => {
  const { activatePopupCenter } = useApplicationManager();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: "easeInOut",
      }}
    >
      <span className="text-[#979797] text-xl ml-2 ">Account Details</span>

      <div className="w-full min-h-[200px] mt-2 flex rounded-md p-5 flex-col space-y-7 bg-[#101010] border-[1px] border-[#1a1a1a]">
        <div>
          <p className="text-[#747474] text-sm font-medium mb-1 ml-1">Name</p>
          <div className="flex items-center">
            <input
              type="text"
              value={name}
              className="bg-[#181818] text-[#636363] w-full rounded-md py-3 px-4 text-base outline-none border-2 border-[#1f1f1f] mr-2"
            />
            <button
              onClick={() => activatePopupCenter(<EditName name={name} />)}
            >
              <FontAwesomeIcon
                icon={faEdit}
                className="p-3 bg-green-primary text-black-main rounded-md"
              />
            </button>
          </div>
        </div>
        <div>
          <p className="text-[#747474] text-sm font-medium mb-1 ml-1">Email</p>

          <input
            type="text"
            disabled
            value={email}
            className="bg-[#181818] w-full rounded-md py-3 px-4 text-base text-[#636363] outline-none border-2 border-[#1f1f1f]"
          />
        </div>
        <div>
          <p className="text-[#747474] text-sm font-medium mb-1 ml-1">Joined</p>

          <input
            type="text"
            disabled
            value={formatToDDMon(joined)}
            className="bg-[#181818] w-full rounded-md py-3 px-4 text-base text-[#636363] outline-none border-2 border-[#1f1f1f]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Details;

const EditName = ({ name }) => {
  const { deactivatePopupCenter } = useApplicationManager();
  const { user, setUser } = useUser();
  const [newName, setNewName] = useState(name);
  const handleNameUpdate = () => {
    // Update in firebase
    if (newName === name) {
      deactivatePopupCenter();
      return;
    }
    setUser({ ...user, name: newName });
    toast.success("Name Updated");
    deactivatePopupCenter();
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[350px] h-60 rounded-md bg-[#131313] font-lexend px-5 flex flex-col space-y-4 justify-center items-center"
    >
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="bg-[#181818] text-white w-full rounded-md py-3 px-4  text-base outline-none border-2 border-[#1f1f1f] "
      />
      <div>
        <span
          onClick={deactivatePopupCenter}
          className="mr-4 text-[#5c5c5c] text-sm underline cursor-pointer"
        >
          Cancle
        </span>
        <span
          onClick={handleNameUpdate}
          className="py-2 px-4 text-sm bg-green-primary text-black-main rounded-md cursor-pointer"
        >
          Update
        </span>
      </div>
    </div>
  );
};
