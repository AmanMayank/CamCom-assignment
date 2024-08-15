import React from "react";

const CrosswordCell = ({
  value,
  isFocused,
  onFocus,
  handleInput,
  rowIndex,
  colIndex,
  activeClue,
  currentIndex,
  handleOnGridClick,
  activeGrid,
}) => {
  const getClueNumber = () => {
    if (rowIndex === 0) {
      return colIndex;
    } else if (colIndex === 0) {
      return rowIndex + 4;
    } else {
      return;
    }
  };

  const backgroundColor = () => {
    if (value === "B") {
      return "bg-black z-10"; // Apply bg-black if the value is "B"
    } else if (activeGrid.rgrid === rowIndex && activeGrid.cgrid === colIndex) {
      return "bg-yellow-300";
    } else if (
      (activeClue.name === "A" && Number(currentIndex) === rowIndex) ||
      (activeClue.name !== "A" && Number(currentIndex) === colIndex)
    ) {
      // console.log(activeClue.name, currentIndex);
      return "bg-blue-600"; // Apply bg-blue-600 based on the active clue and current index
    } else {
      // console.log("default", activeClue.name, currentIndex, rowIndex);
      return "";
    }
    // Default background color
  };

  return (
    <>
      <span className="absolute p-1">
        {getClueNumber()}
        {/* {rowIndex}
        {colIndex} */}
      </span>
      <input
        disabled={value === "B" ? true : false}
        type="text"
        maxLength="1"
        value={value || ""}
        onFocus={onFocus}
        className={`w-24 h-24 text-center text-xl border-2 ${
          isFocused ? "focused bg-yellow-700" : ""
        }  
       ${backgroundColor()}
       ${
         activeGrid.rgrid === rowIndex && activeGrid.cgrid === colIndex
           ? "cursor:none"
           : ""
       }
      `}
        //   readOnly
        onChange={(e) => handleInput(rowIndex, colIndex, e.target.value)}
        onClick={(e) => handleOnGridClick(rowIndex, colIndex, currentIndex)}
      />
    </>
  );
};

export default CrosswordCell;
