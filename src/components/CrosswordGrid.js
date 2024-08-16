import React, { useEffect, useRef } from "react";
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
}) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[activeGrid.rgrid]?.[activeGrid.cgrid]) {
      inputRefs.current[activeGrid.rgrid][activeGrid.cgrid].focus();
    }
  }, [activeGrid]);

  return (
    <div
      className="mt-11  ml-4 grid grid-row-5 min-w-[480px]"
      tabIndex="0"
      onKeyDown={(e) => handleKeyPress(e)}
    >
      {data.map((row, rowIndex) => (
        <div className="relative" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <CrosswordCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              // isFocused={
              //   activeGrid.rgrid === rowIndex && activeGrid.cgrid === colIndex
              // }
              onFocus={() => handleFocus(rowIndex, colIndex)}
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
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;
