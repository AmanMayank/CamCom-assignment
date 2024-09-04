import React, { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSettingsOutline, IoPause, IoPlay } from "react-icons/io5";
import { GiCarWheel } from "react-icons/gi";
import MobileSettingsModal from "./MobileSettingsModal";
import { TiTick } from "react-icons/ti";
import MobilePauseModal from "./MobilePauseModal";

const MobileHeader = ({
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
  handleResetDefault,
  //handler for other buttons
  handleClearIncomplete,
  handleClearWord,
  handleClearPuzzle,
  revealGrid,
  revealWord,
  revealPuzzle,
  handleAutoCheck,
  checkGrid,
  checkWord,
  checkPuzzle,
  pencil,
  handlePencilChange,
}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [showOptions1, setShowOptions1] = useState(false);
  const [showOptions2, setShowOptions2] = useState(false);
  const [lastSelectedOption, setLastSelectedOption] = useState("option1");
  const [autoCheck, setAutoCheck] = useState(false);
  const timerRef = useRef(null);

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
    startTimer();
    handleClearPuzzle();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSettingsClick = () => {
    setDisplaySettings(!displaySettings);
  };

  const handleOptionsClick = () => {
    if (showOptions1) {
      setShowOptions1(!showOptions1);
    } else if (showOptions2) {
      setShowOptions2(false);
    } else if (!showOptions1 && !showOptions2) {
      if (lastSelectedOption === "option2") {
        setShowOptions2(true);
      } else {
        setShowOptions1(true);
      }
    }
  };

  return (
    <>
      <div className="top-0 left-0 h-12 border-b-[1px] border-t-[1px] border-black w-full bg-slate-50 z-10 text-xs font-medium px-1 py-2 flex justify-between  items-center">
        <div>
          <RxHamburgerMenu size={22} />
        </div>

        {showTimer && (
          <div className="flex items-center center text-lg">
            {formatTime(time)}
            <span
              className="ml-2 cursor-pointer text-2xl"
              onClick={handleStartPause}
            >
              {isRunning ? <IoPause size={22} /> : <IoPlay size={22} />}
            </span>
          </div>
        )}

        <div className="flex gap-5">
          {!showOptions1 && !showOptions2 && !autoCheck && (
            <div className=" cursor-pointer" onClick={handleOptionsClick}>
              <GiCarWheel style={{ color: "blue" }} size={22} />
            </div>
          )}

          {(showOptions1 || showOptions2 || autoCheck) && (
            <div className=" cursor-pointer" onClick={handleOptionsClick}>
              <GiCarWheel
                style={{ color: "white", background: "blue" }}
                size={22}
              />
            </div>
          )}

          {showOptions1 && (
            <div
              onClick={() => setShowOptions1(false)}
              className="absolute mt-[35px] flex-col right-3 bg-blue-600 z-40"
            >
              {autoCheck ? (
                <div
                  onClick={() => {
                    handleAutoCheck(false);
                    setAutoCheck(false);
                  }}
                  className="px-1 py-2 border-b-white text-white border-b-2 flex"
                >
                  <TiTick />
                  Autocheck
                </div>
              ) : (
                <div
                  onClick={() => {
                    handleAutoCheck(true);
                    setAutoCheck(true);
                  }}
                  className="px-1 py-2 border-b-white text-white border-b-2"
                >
                  Autocheck
                </div>
              )}
              <div
                onClick={checkGrid}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Check Square
              </div>
              <div
                onClick={checkWord}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Check Word
              </div>
              <div
                onClick={checkPuzzle}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Check Puzzle
              </div>
              <div
                onClick={() => {
                  setShowOptions2(true);
                  setShowOptions1(false);
                  setLastSelectedOption("option2");
                }}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                More {">"}
              </div>
            </div>
          )}

          {showOptions2 && (
            <div
              onClick={() => setShowOptions2(false)}
              className="absolute mt-[35px] flex-col right-3 bg-blue-600 z-40"
            >
              <div
                onClick={handleClearIncomplete}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Clear Incomplete
              </div>
              <div
                onClick={handleClearWord}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Clear Word
              </div>
              <div
                onClick={() => {
                  handleClearPuzzle();
                  resetTimer();
                }}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Reset Puzzle
              </div>
              <div
                onClick={revealGrid}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Reveal Square
              </div>
              <div
                onClick={revealWord}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Reveal Word
              </div>
              <div
                onClick={revealPuzzle}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                Reveal Puzzle
              </div>
              <div
                onClick={() => {
                  setShowOptions2(false);
                  setShowOptions1(true);
                  setLastSelectedOption("option1");
                }}
                className="px-1 py-2 border-b-white text-white border-b-2"
              >
                {"<"} Back
              </div>
            </div>
          )}

          <div className=" cursor-pointer" onClick={handleSettingsClick}>
            <IoSettingsOutline style={{ color: "blue" }} size={22} />
          </div>
        </div>
      </div>

      {displaySettings && (
        <MobileSettingsModal
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
          handleResetDefault={handleResetDefault}
        />
      )}

      {!isRunning && <MobilePauseModal handleStartPause={handleStartPause} />}
    </>
  );
};

export default MobileHeader;
