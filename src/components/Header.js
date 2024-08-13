import React from "react";
import { IoSettingsOutline, IoPause } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

const Header = () => {
  return (
    <div className="top-0 left-0 h-12 border-2 w-full bg-slate-200 flex justify-between items-center">
      <div>
        <IoSettingsOutline size={22} />
      </div>

      <div className="flex items-center justify-center">
        07:12
        <span>
          <IoPause size={22} />
        </span>
      </div>

      <div className="flex gap-6 items-center">
        <p>Rebus</p>
        <p>Clear</p>
        <p>Reveal</p>
        <p>Check</p>
        <MdOutlineEdit size={22} />
      </div>
    </div>
  );
};

export default Header;
