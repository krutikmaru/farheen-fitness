import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";

const MenubarSection = ({ tag, data }) => {
  const { selectedMenubarItemId, setSelectedMenubarItemId } =
    useApplicationManager();
  const handleItemClick = (id) => {
    setSelectedMenubarItemId(id);
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
              onClick={() => handleItemClick(item.id)}
              className="border-l-4 cursor-pointer border-black-main mb-4 text-sm h-11 text-gray-300 w-full flex justify-start items-center px-4 transition-colors duration-100 ease-in-out"
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
