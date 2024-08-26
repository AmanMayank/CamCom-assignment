import React, { useState } from "react";
import Header from "./Header";
import HeroComponent from "./HeroComponent";

const Home = () => {
  const crosswordAnswer = [
    ["$", "A", "D", "D", "S"],
    ["F", "L", "O", "R", "A"],
    ["A", "P", "R", "O", "N"],
    ["K", "H", "I", "V", "E"],
    ["E", "A", "S", "E", "$"],
  ];

  const crosswordData = [
    ["$", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", "$"],
  ];

  const helperData = [
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

  const [currentDirection, setCurrentDirection] = useState({
    direction: "across",
    currentRow: 0,
    currentCol: 1,
  });
  const [grid, setGrid] = useState(crosswordData);
  const [helperGrid, setHelperGrid] = useState(helperData);
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

  const handleClearIncomplete = () => {
    const isCompleteWord = (row, col, direction) => {
      if (direction === "across") {
        // check left
        for (let c = 0; c < col; c++) {
          if (grid[row][c] === "") {
            return false;
          }
        }
        // check right
        for (let c = col + 1; c < grid.length; c++) {
          if (grid[row][c] === "") {
            return false;
          }
        }

        return true;
      }

      if (direction === "down") {
        // check down
        for (let r = row + 1; r < grid.length; r++) {
          if (grid[r][col] === "") {
            return false;
          }
        }
        // check up
        for (let r = 0; r < row; r++) {
          if (grid[r][col] === "") {
            return false;
          }
        }
        return true;
      }
    };

    const newGrid = [...grid];
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid.length; j++) {
        if (newGrid[i][j] === "" || newGrid[i][j] === "$") {
          continue;
        } else {
          const checkAcross = isCompleteWord(i, j, "across");
          const checkDown = isCompleteWord(i, j, "down");

          if (!checkAcross && !checkDown) {
            newGrid[i][j] = "";
          } else {
            continue;
          }
        }
      }
    }
    setGrid(newGrid);
  };

  const handleClearWord = () => {
    let { direction, currentRow, currentCol } = currentDirection;
    const newGrid = [...grid];

    if (direction === "across") {
      for (let c = 0; c < newGrid.length; c++) {
        if (newGrid[currentRow][c] === "$") {
          continue;
        } else {
          newGrid[currentRow][c] = "";
        }
      }
    }

    if (direction === "down") {
      for (let r = 0; r < newGrid.length; r++) {
        if (newGrid[r][currentCol] === "$") {
          continue;
        } else {
          newGrid[r][currentCol] = "";
        }
      }
    }

    setGrid(newGrid);
  };

  const handleClearPuzzle = () => {
    setGrid(crosswordData);
  };

  const revealGrid = () => {
    let { currentRow, currentCol } = currentDirection;
    const newGrid = [...grid];
    const newHelperGrid = [...helperGrid];
    if (
      newGrid[currentRow][currentCol] ===
      crosswordAnswer[currentRow][currentCol]
    ) {
      return;
    }
    newGrid[currentRow][currentCol] = crosswordAnswer[currentRow][currentCol];
    helperGrid[currentRow][currentCol] = "#";
    setGrid(newGrid);
    setHelperGrid(newHelperGrid);
  };

  const revealWord = () => {
    let { direction, currentRow, currentCol } = currentDirection;
    const newGrid = [...grid];
    const newHelperGrid = [...helperGrid];

    if (direction === "across") {
      for (let c = 0; c < newGrid.length; c++) {
        if (crosswordAnswer[currentRow][c] === "$") {
          newGrid[currentRow][c] = crosswordAnswer[currentRow][c];
        } else {
          if (newGrid[currentRow][c] === crosswordAnswer[currentRow][c]) {
            continue;
          } else {
            newGrid[currentRow][c] = crosswordAnswer[currentRow][c];
            newHelperGrid[currentRow][c] = "#";
          }
        }
      }
    }

    if (direction === "down") {
      for (let r = 0; r < newGrid.length; r++) {
        newGrid[r][currentCol] = crosswordAnswer[r][currentCol];
      }
    }

    setGrid(newGrid);
    setHelperGrid(newHelperGrid);
  };

  const revealPuzzle = () => {
    const newGrid = [...grid];
    const newHelperGrid = [...grid];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (newGrid[i][j] === crosswordAnswer[i][j]) {
          continue;
        } else {
          if (newHelperGrid[i][j] === "#") {
            continue;
          } else {
            newHelperGrid[i][j] = "#";
          }
        }
      }
    }

    setGrid(crosswordAnswer);
    setHelperGrid(newHelperGrid);
  };

  function updateGrid(row, col, value) {
    // console.log("coming here", row, col, value);
    const newGrid = [...grid];
    newGrid[row][col] = value.toUpperCase();
    setGrid(newGrid);

    const hasBlankSpaces = crosswordData.some((row) => row.includes(""));
    !hasBlankSpaces && console.log("No blank spaces found");
  }

  const toggleRebus = () => {
    setIsRebus(!isRebus);
  };

  const resetRebus = () => {
    setIsRebus(false);
  };

  const handleCurrentDirectionChange = (direction, activeGrid) => {
    setCurrentDirection({
      direction,
      currentRow: activeGrid.rgrid,
      currentCol: activeGrid.cgrid,
    });
  };

  return (
    <div className="relative">
      <Header
        //Handler for settings
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
        //handler for other buttons
        handleClearIncomplete={handleClearIncomplete}
        handleClearWord={handleClearWord}
        handleClearPuzzle={handleClearPuzzle}
        revealGrid={revealGrid}
        revealWord={revealWord}
        revealPuzzle={revealPuzzle}
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
        skipWords={skipWords}
        findFirstBlank={findFirstBlank}
        jumpNextClue={jumpNextClue}
        handleCurrentDirectionChange={handleCurrentDirectionChange}
        helperData={helperGrid}
      />
      {/* <CrosswordGrid data={grid} handleInput={handleInput} />; */}
    </div>
  );
};

export default Home;
