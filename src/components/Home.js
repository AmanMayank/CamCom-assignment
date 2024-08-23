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

  function updateGrid(row, col, value) {
    console.log("coming here", row, col, value);
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

  console.log(isRebus);
  return (
    <>
      <Header toggleRebus={toggleRebus} />
      <HeroComponent
        data={grid}
        updateGrid={updateGrid}
        Clues={Clues}
        isRebus={isRebus}
        resetRebus={resetRebus}
      />
      {/* <CrosswordGrid data={grid} handleInput={handleInput} />; */}
    </>
  );
};

export default Home;
