import React, { useState } from "react";
import CrosswordGrid from "./CrosswordGrid";
import Header from "./Header";
import HeroComponent from "./HeroComponent";

const Home = () => {
  const crosswordAnswer = [
    ["A", "P", "P", "L", "E"],
    ["B", null, null, null, "E"],
    ["C", "A", "T", null, "S"],
    ["D", null, "R", null, null],
    ["E", "L", "I", "M", "E"],
  ];

  const crosswordData = [
    ["$", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", "$"],
  ];

  const Clues = [
    {
      Across: {
        1: "Throws in the mix",
        5: "Plant life",
        6: "Chef's garment",
        7: "Informal term for avid supporters of Kamala Harris",
        8: "Simplicity",
      },
      Down: {
        1: "Letter before beta and gamma",
        2: "Pulitzer-winning historian ___ Kearns Goodwin",
        3: "Did some chauffeuring",
        4: "All there, mentally",
        5: "Like a designer bag with the company name misspelled",
      },
    },
  ];

  const [grid, setGrid] = useState(crosswordData);
  const [isRebus, setIsRebus] = useState(false);
  const [selectedDirection, setSelectedDirection] =
    useState("Stay in the same");
  const [spaceBarDirection, setSpacebarDirection] = useState("clear current");
  const [backSpaceDirection, setBackSpaceDirection] = useState(false);
  const [skipWords, setSkipWords] = useState(true);
  const [skipPencilWords, setSkipPencilWords] = useState(true);
  const [findFirstBlank, setFindFirstBlank] = useState(true);
  const [jumpNextClue, setJumpNextClue] = useState(true);
  const [playSound, setPlaySound] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showPuzzleMilestone, setShowPuzzleMilestone] = useState(false);

  const handleDirectionChange = (event) => {
    setSelectedDirection(event.target.value);
  };

  const handleSpaceBarPress = (event) => {
    setSpacebarDirection(event.target.value);
  };

  const handleBackSpaceClick = () => {
    setBackSpaceDirection(!backSpaceDirection);
  };

  const handleSkipWords = () => {
    setSkipWords(!skipWords);
  };

  const handleskipPencilWords = () => {
    setSkipPencilWords(!skipPencilWords);
  };

  const handleFindBlank = () => {
    setFindFirstBlank(!findFirstBlank);
  };

  const handleJumpNextClue = () => {
    setJumpNextClue(!jumpNextClue);
  };

  const handlePlaySound = () => {
    setPlaySound(!playSound);
  };

  const handleTimerVisibility = () => {
    setShowTimer(!showTimer);
  };

  const handleWarnings = () => {
    setShowWarning(!showWarning);
  };

  const handleMilestone = () => {
    setShowPuzzleMilestone(!showPuzzleMilestone);
  };

  function updateGrid(row, col, value) {
    // console.log("coming here", row, col, value);
    const newGrid = [...grid];
    newGrid[row][col] = value.toUpperCase();
    setGrid(newGrid);
  }

  const hasBlankSpaces = crosswordData.some((row) => row.includes(""));

  const toggleRebus = () => {
    setIsRebus(!isRebus);
  };

  const resetRebus = () => {
    setIsRebus(false);
  };

  return (
    <>
      <Header
        toggleRebus={toggleRebus}
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
      <HeroComponent
        data={grid}
        updateGrid={updateGrid}
        Clues={Clues}
        isRebus={isRebus}
        resetRebus={resetRebus}
        selectedDirection={selectedDirection}
        spaceBarDirection={spaceBarDirection}
        backSpaceDirection={backSpaceDirection}
      />
      {/* <CrosswordGrid data={grid} handleInput={handleInput} />; */}
    </>
  );
};

export default Home;
