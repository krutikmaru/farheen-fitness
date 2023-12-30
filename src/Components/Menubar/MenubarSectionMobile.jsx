import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";
import { getAuth } from "firebase/auth";
import app from "../../backend/Firebase/firebase";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MenubarSectionMobile = ({ tag, data }) => {
  const {
    selectedMenubarItemId,
    setSelectedMenubarItemId,
    activatePopupCenter,
    setIsMobileMenuActive,
  } = useApplicationManager();

  const navigate = useNavigate();

  const handleItemClick = (id, navigateTo, type) => {
    setSelectedMenubarItemId(id);
    setIsMobileMenuActive(false);
    navigate(navigateTo);
    if (type === "logout") {
      activatePopupCenter(<ConfirmLogout />);
    }
  };
  return (
    <div className="mb-5 font-lexend">
      <div className="mb-5 ">
        <h1 className="text-sm text-gray-400">{tag}</h1>
      </div>
      <div>
        {data.map((item, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: -30 * (index + 1) }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              onClick={() => handleItemClick(item.id, item.navigate, item.type)}
              className="cursor-pointer  mb-6 text-2xl  font-medium h-20 text-gray-300 w-full flex justify-start items-center px-4 "
              style={{
                color:
                  item.id === selectedMenubarItemId ? "#deff10" : "#a9a9a9",
              }}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="mr-10 text-xl "
                style={{
                  color:
                    item.id === selectedMenubarItemId ? "#deff10" : "#898989",
                }}
              />
              <h1 className="">{item.title}</h1>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MenubarSectionMobile;

const ConfirmLogout = () => {
  const { deactivatePopupCenter } = useApplicationManager();
  const { setUser } = useUser();
  const logout = () => {
    const auth = getAuth(app);
    try {
      auth.signOut();
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[350px] h-60 rounded-md bg-[#131313] font-lexend flex flex-col justify-center items-center"
    >
      <h1 className="text-white text-xl mb-5">Confirm Logout?</h1>
      <div>
        <span
          onClick={deactivatePopupCenter}
          className="mr-4 text-[#5c5c5c] text-sm underline cursor-pointer"
        >
          Cancle
        </span>
        <span
          onClick={logout}
          className="py-2 px-4 text-sm bg-red-600 text-white rounded-md cursor-pointer"
        >
          Logout
        </span>
      </div>
    </div>
  );
};
