import React, { useState, useEffect, useRef } from "react";
import { IoSettingsOutline, IoPause, IoPlay } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import SettingsModal from "./SettingsModal";

const Header = ({
  toggleRebus,
  selectedDirection,
  handleDirectionChange,
  spaceBarDirection,
  handleSpaceBarPress,
  backSpaceDirection,
  handleBackSpaceClick,
  skipWords,
  handleSkipWords,
  skipPencilWords,
  handleskipPencilWords,
  findFirstBlank,
  handleFindBlank,
  jumpNextClue,
  handleJumpNextClue,
  playSound,
  handlePlaySound,
  showTimer,
  handleTimerVisibility,
  showWarning,
  handleWarnings,
  showPuzzleMilestone,
  handleMilestone,
}) => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(true); // Controls whether the stopwatch is running
  const timerRef = useRef(null); // Reference to the timer interval

  const [showClearMenu, setShowClearMenu] = useState(false);
  const [showRevealMenu, setShowRevealMenu] = useState(false);
  const [showCheckMenu, setShowCheckMenu] = useState(false);
  const [displaySettings, setDisplaySettings] = useState(false);

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

  const clearMenuClick = () => {
    setShowClearMenu(!showClearMenu);
    if (showRevealMenu) setShowRevealMenu(!showRevealMenu);
    if (showCheckMenu) setShowCheckMenu(!showCheckMenu);
  };

  const revealMenuClick = () => {
    setShowRevealMenu(!showRevealMenu);
    if (showClearMenu) setShowClearMenu(!showClearMenu);
    if (showCheckMenu) setShowCheckMenu(!showCheckMenu);
  };

  const checkMenuClick = () => {
    setShowCheckMenu(!showCheckMenu);
    if (showRevealMenu) setShowRevealMenu(!showRevealMenu);
    if (showClearMenu) setShowClearMenu(!showClearMenu);
  };

  const handleSettingsClick = () => {
    setDisplaySettings(!displaySettings);
  };

  return (
    <>
      <div className="top-0 left-0 h-12 border-2 w-full bg-slate-200 flex justify-between items-center min-w-[480px] fixed z-10">
        <div className="ml-5 cursor-pointer" onClick={handleSettingsClick}>
          <IoSettingsOutline size={22} />
        </div>

        <div className="flex items-center justify-center">
          {formatTime(time)}
          <span className="ml-2 cursor-pointer" onClick={handleStartPause}>
            {isRunning ? <IoPause size={22} /> : <IoPlay size={22} />}
          </span>
        </div>

        <div className="flex gap-8 items-center mr-5">
          <p onClick={toggleRebus} className="cursor-pointer">
            Rebus
          </p>
          <p onClick={clearMenuClick} className="cursor-pointer">
            Clear
          </p>
          <p onClick={revealMenuClick} className="cursor-pointer">
            Reveal
          </p>
          <p onClick={checkMenuClick} className="cursor-pointer">
            Check
          </p>
          <div className="cursor-pointer">
            <MdOutlineEdit size={22} />
          </div>
        </div>
      </div>

      {showClearMenu && (
        <div className="border-box h-auto w-auto  flex-col gap-4 absolute right-40 mr-6 z-10 bg-blue-50  justify-between items-center shadow-lg">
          <p className="py-2 hover:bg-blue-400 hover:text-white cursor-pointer px-2 box-border border-b-2 text-xs">
            Incomplete
          </p>
          <p className="py-2 hover:bg-blue-400 hover:text-white  cursor-pointer px-2 box-border border-b-2 text-xs">
            Word
          </p>
          <p className="box-border py-2 cursor-pointer px-2 hover:bg-blue-400 hover:text-white  border-b-2 text-xs">
            Puzzle
          </p>
          <p
            onClick={resetTimer}
            className="box-border py-2 cursor-pointer px-2 hover:bg-blue-400 hover:text-white  border-b-2 text-xs"
          >
            Puzzle & Timer
          </p>
        </div>
      )}

      {showRevealMenu && (
        <div className="border-box h-auto w-auto  flex-col gap-4 absolute right-20 mr-16 z-10 bg-blue-50  justify-between items-center shadow-lg">
          <p className="py-2 hover:bg-blue-400 hover:text-white cursor-pointer px-2 box-border border-b-2 text-xs">
            Square
          </p>
          <p className="py-2 hover:bg-blue-400 hover:text-white  cursor-pointer px-2 box-border border-b-2 text-xs">
            Word
          </p>
          <p className="box-border py-2 cursor-pointer px-2 hover:bg-blue-400 hover:text-white  border-b-2 text-xs">
            Puzzle
          </p>
        </div>
      )}

      {showCheckMenu && (
        <div className="border-box h-auto w-auto  flex-col gap-4 absolute right-10 mr-4 z-10 bg-blue-50  justify-between items-center shadow-lg">
          <p className="py-2 hover:bg-blue-400 hover:text-white cursor-pointer px-2 box-border border-b-2 text-xs">
            Autocheck
          </p>
          <p className="py-2 hover:bg-blue-400 hover:text-white cursor-pointer px-2 box-border border-b-2 text-xs">
            Square
          </p>
          <p className="py-2 hover:bg-blue-400 hover:text-white  cursor-pointer px-2 box-border border-b-2 text-xs">
            Word
          </p>
          <p className="box-border py-2 cursor-pointer px-2 hover:bg-blue-400 hover:text-white  border-b-2 text-xs">
            Puzzle
          </p>
        </div>
      )}

      {displaySettings && (
        <SettingsModal
          handleSettingsClick={handleSettingsClick}
          selectedDirection={selectedDirection}
          handleDirectionChange={handleDirectionChange}
          spaceBarDirection={spaceBarDirection}
          handleSpaceBarPress={handleSpaceBarPress}
          backSpaceDirection={backSpaceDirection}
          handleBackSpaceClick={handleBackSpaceClick}
          skipWords={skipWords}
          handleSkipWords={handleSkipWords}
          skipPencilWords={skipPencilWords}
          handleskipPencilWords={handleskipPencilWords}
          findFirstBlank={findFirstBlank}
          handleFindBlank={handleFindBlank}
          jumpNextClue={jumpNextClue}
          handleJumpNextClue={handleJumpNextClue}
          playSound={playSound}
          handlePlaySound={handlePlaySound}
          showTimer={showTimer}
          handleTimerVisibility={handleTimerVisibility}
          showWarning={showWarning}
          handleWarnings={handleWarnings}
          showPuzzleMilestone={showPuzzleMilestone}
          handleMilestone={handleMilestone}
        />
      )}
    </>
  );
};

export default Header;
