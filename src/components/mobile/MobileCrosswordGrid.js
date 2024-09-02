import React, { useEffect, useRef, useState } from "react";
import MobileCrosswordCell from "./MobileCrosswordCell";

const MobileCrosswordGrid = ({
  data,
  updateGrid,
  activeClue,
  currentIndex,
  handleOnGridClick,
  activeGrid,
  handleKeyPress,
  handleFocus,
  nextFocus,
  isRebus,
  resetRebus,
  helperData,
  autoCheck,
}) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[activeGrid.rgrid]?.[activeGrid.cgrid]) {
      inputRefs.current[activeGrid.rgrid][activeGrid.cgrid].focus();
    }
  }, [activeGrid, isRebus]);

  const handleBlur = (rowIndex, colIndex) => {
    const currentInput = inputRefs.current[rowIndex]?.[colIndex];
    if (currentInput) {
      resetRebus();
    }
  };

  return (
    <div
      className="sm:mt-8 mt-11 grid grid-row-5 box-border relative"
      tabIndex="0"
      onKeyDown={(e) => handleKeyPress(e)}
    >
      {data.map((row, rowIndex) => (
        <div
          className="flex justify-center items-center relative"
          key={rowIndex}
        >
          {row.map((cell, colIndex) => (
            <MobileCrosswordCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              // isFocused={
              //   activeGrid.rgrid === rowIndex && activeGrid.cgrid === colIndex
              // }
              onFocus={() => {
                handleFocus(rowIndex, colIndex);
              }}
              onBlur={() => {
                handleBlur(rowIndex, colIndex);
              }}
              updateGrid={updateGrid}
              rowIndex={rowIndex}
              colIndex={colIndex}
              activeClue={activeClue}
              currentIndex={currentIndex}
              handleOnGridClick={handleOnGridClick}
              activeGrid={activeGrid}
              nextFocus={nextFocus}
              ref={(el) => {
                if (!inputRefs.current[rowIndex]) {
                  inputRefs.current[rowIndex] = [];
                }
                inputRefs.current[rowIndex][colIndex] = el;
              }}
              isRebus={isRebus}
              helperData={helperData}
              autoCheck={autoCheck}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MobileCrosswordGrid;
