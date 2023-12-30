import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";
import { getAuth } from "firebase/auth";
import app from "../../backend/Firebase/firebase";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const MenubarSection = ({ tag, data }) => {
  const {
    selectedMenubarItemId,
    setSelectedMenubarItemId,
    activatePopupCenter,
  } = useApplicationManager();

  const navigate = useNavigate();

  const handleItemClick = (id, navigateTo, type) => {
    setSelectedMenubarItemId(id);
    navigate(navigateTo);
    if (type === "logout") {
      activatePopupCenter(<ConfirmLogout />);
    }
  };
  return (
    <div className="mb-5">
      <div className="mb-5 ">
        <h1 className="text-xs text-gray-400">{tag}</h1>
      </div>
      <div>
        {data.map((item) => {
          return (
            <div
              onClick={() => handleItemClick(item.id, item.navigate, item.type)}
              className="border-l-4 cursor-pointer border-black-main mb-4 text-sm h-11 text-gray-300 w-full flex justify-start items-center px-4 "
              style={{
                borderLeft:
                  item.id === selectedMenubarItemId
                    ? "4px solid #deff10"
                    : "4px solid #0a0a0a",
                color:
                  item.id === selectedMenubarItemId ? "#deff10" : "#a9a9a9",
              }}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="mr-5 text-base "
                style={{
                  color:
                    item.id === selectedMenubarItemId ? "#deff10" : "#313131",
                }}
              />
              <h1 className="">{item.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenubarSection;

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
    } finally {
      deactivatePopupCenter();
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
