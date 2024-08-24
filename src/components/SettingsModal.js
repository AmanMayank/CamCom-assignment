import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SettingsModal = () => {
  const [selectedDirection, setSelectedDirection] = useState("");

  const handleDirectionChange = (event) => {
    setSelectedDirection(event.target.value);
  };
  return (
    <div className="w-full h-full fixed bg-slate-400 bg-opacity-90 z-40 mx-auto flex items-center justify-center">
      <div className="w-1/2 h-3/4 bg-white z-50 border-2 border-black opacity-100 p-2">
        <div className="w-full flex justify-between items-center p-4">
          <h2 className="font-bold text-3xl">Puzzle Settings</h2>
          <div>
            <IoIosCloseCircleOutline size={22} />
          </div>
        </div>

        <div className="w-full flex justify-between items-center h-80">
          <div className="w-1/2 h-full bg-blue border-2 text-center p-4">
            <div>
              <h2 className="font-semibold text-sm text-left">
                After changing direction with arrow keys
              </h2>
              <div className="flex flex-col space-y-2 mt-2">
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="radio"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={selectedDirection === "Stay in the same"}
                    onChange={handleDirectionChange}
                    className="form-radio text-blue-600"
                  />
                  <span>Stay in the same square</span>
                </label>
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="radio"
                    value="Move in the direction"
                    name="Move in the direction"
                    checked={selectedDirection === "Move in the direction"}
                    onChange={handleDirectionChange}
                    className="form-radio text-blue-600"
                  />
                  <span>Move in the direction of the arrow</span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full bg-blue border-2 text-center p-4">
            Settings 2
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
