import React from "react";
import MenubarSection from "./MenubarSection";
import { menubar } from "../../utils/data/menubar";

const Menubar = () => {
  return (
    <div className="w-full h-full p-5 pt-10">
      <MenubarSection tag="FOR YOU" data={menubar.forYou} />
      <MenubarSection tag="MANAGE" data={menubar.account} />
    </div>
  );
};

export default Menubar;
