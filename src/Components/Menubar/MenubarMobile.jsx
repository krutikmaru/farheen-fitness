import React from "react";
import { menubar } from "../../utils/data/menubar";
import MenubarSectionMobile from "./MenubarSectionMobile";

const MenubarMobile = () => {
  return (
    <div className="fixed z-[1000] top-0 left-0 mt-16 bg-[#0000006e] backdrop-blur-md  w-screen h-screen overflow-y-scroll pl-10 pb-20 pt-10">
      <MenubarSectionMobile tag="FOR YOU" data={menubar.forYou} />
      <MenubarSectionMobile tag="MANAGE" data={menubar.account} />
    </div>
  );
};

export default MenubarMobile;
