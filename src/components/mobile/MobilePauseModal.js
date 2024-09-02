import React from "react";

const MobilePauseModal = ({ handleStartPause }) => {
  return (
    <div className="top-0 left-0 right-0 bottom-0 w-full h-[95vh]  fixed z-30 mx-auto flex backdrop-blur-sm items-end justify-end ">
      <div className="bg-white h-auto w-full p-4 relative transition duration-1000 ease-in-out mb-2 pb-6">
        <div className="80% mx-auto flex flex-col items-center justify-center gap-4">
          <div className=" font-bold text-4xl">Your game is paused.</div>
          <div className="font-semibold text-2xl mb-5">Ready to play? </div>
          <button
            onClick={handleStartPause}
            className="border-2 border-black rounded-md bg-black text-white px-4 py-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePauseModal;
