import React, { useState, useEffect, useRef } from "react";
import { IoSettingsOutline, IoPause, IoPlay } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

const Header = ({ toggleRebus }) => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(true); // Controls whether the stopwatch is running
  const timerRef = useRef(null); // Reference to the timer interval

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current); // Cleanup the interval on unmount
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const handleStartPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="top-0 left-0 h-12 border-2 w-full bg-slate-200 flex justify-between items-center min-w-[480px]">
      <div className="ml-5">
        <IoSettingsOutline size={22} />
      </div>

      <div className="flex items-center justify-center">
        {formatTime(time)}
        <span className="ml-2 cursor-pointer" onClick={handleStartPause}>
          {isRunning ? <IoPause size={22} /> : <IoPlay size={22} />}
        </span>
      </div>

      <div className="flex gap-6 items-center mr-5">
        <p onClick={toggleRebus}>Rebus</p>
        <p onClick={resetTimer}>Clear</p>
        <p>Reveal</p>
        <p>Check</p>
        <MdOutlineEdit size={22} />
      </div>
    </div>
  );
};

export default Header;
