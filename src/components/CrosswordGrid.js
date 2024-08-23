import React, { useEffect, useRef, useState } from "react";
import CrosswordCell from "./CrosswordCell";

const CrosswordGrid = ({
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
      className="mt-11 ml-4 grid grid-row-5 min-w-[480px] box-border"
      tabIndex="0"
      onKeyDown={(e) => handleKeyPress(e)}
    >
      {data.map((row, rowIndex) => (
        <div className="box-border" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <CrosswordCell
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
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;
