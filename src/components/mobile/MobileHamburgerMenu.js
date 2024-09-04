import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const MobileHamburgerMenu = ({ handleDisplayHamburger }) => {
  return (
    <div className="top-0 left-0 right-0 bottom-0 w-full h-[95vh]  fixed z-30 mx-auto flex backdrop-blur-sm items-center justify-start ">
      <div className="bg-white h-full w-1/2 p-4 relative transition duration-1000 ease-in-out mb-2 pb-6">
        <div className="w-full  flex items-center justify-between">
          <h2 className="font-bold text-base">Not Applicable</h2>
          <div
            className="cursor-pointer absolute right-0 top-0 p-4"
            onClick={handleDisplayHamburger}
          >
            <IoIosCloseCircleOutline size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHamburgerMenu;
