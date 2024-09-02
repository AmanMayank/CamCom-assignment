import React from "react";

const PauseModal = ({ handleStartPause }) => {
  return (
    <div className="transition duration-500 ease-in-out top-0 left-0 right-0 bottom-0 w-full h-[100vh] fixed z-30 mx-auto flex backdrop-blur-sm items-center justify-center">
      <div className="w-1/2  h-3/4 bg-white z-50 border-2 border-black  mt-10 relative mb-10 flex items-center justify-between p-8">
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

export default PauseModal;
