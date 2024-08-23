import React, { useEffect, useRef, useState } from "react";

const CrosswordCell = React.forwardRef(
  (
    {
      value,
      // isFocused,
      onFocus,
      updateGrid,
      rowIndex,
      colIndex,
      activeClue,
      currentIndex,
      handleOnGridClick,
      activeGrid,
      nextFocus,
      isRebus,
      onBlur,
      getWidth,
    },
    ref
  ) => {
    const [fontSize, setFontSize] = useState(24);

    useEffect(() => {
      const calculateFontSize = () => {
        const maxFontSize = 24; // Maximum font size in pixels
        const minFontSize = 5; // Minimum font size in pixels
        const maxLength = 10; // Maximum text length before scaling down
        const length = value.length;

        const newFontSize = Math.max(
          minFontSize,
          maxFontSize - (length > maxLength ? length : 0)
        );

        setFontSize(`${newFontSize}px`);
      };

      calculateFontSize();
    }, [value]);

    const getClueNumber = () => {
      if (rowIndex === 0) {
        return colIndex;
      } else if (colIndex === 0) {
        return rowIndex + 4;
      } else {
        return;
      }
    };

    const inputRef = useRef(null);

    const [current, setCurrent] = useState(false);

    useEffect(() => {
      if (activeGrid.rgrid === rowIndex && activeGrid.cgrid === colIndex) {
        setCurrent(true);
      } else {
        setCurrent(false);
      }
    }, [activeGrid.rgrid, activeGrid.cgrid, rowIndex, colIndex]);

    const backgroundColor = () => {
      if (value === "$") {
        return "bg-black z-10";
      } else if (
        activeGrid.rgrid === rowIndex &&
        activeGrid.cgrid === colIndex
      ) {
        return "bg-yellow-200";
      } else if (
        (activeClue.name === "A" && Number(currentIndex) === rowIndex) ||
        (activeClue.name !== "A" && Number(currentIndex) === colIndex)
      ) {
        return "bg-blue-200";
      } else {
        return "";
      }
    };

    const width = `${Math.max(96, value.length * 10)}px`;
    const rebusCheck = isRebus && current;
    rebusCheck && inputRef?.current?.focus();

    current && console.log(fontSize);

    return (
      <>
        {rebusCheck ? (
          <>
            <input
              ref={inputRef}
              type="text"
              value={value}
              className="h-24 box-border text-center fixed bg-white z-20  px-2 caret-black border-2 text-xl"
              style={{ width: `${width}`, transition: "width 0.2s ease" }}
              onChange={(e) => {
                updateGrid(rowIndex, colIndex, e.target.value);
              }}
            />
            <input
              className="w-24 h-24 border-2 px-2 text-[24px] invisible box-border"
              disabled
            />
          </>
        ) : (
          <>
            <span className="absolute p-1">{getClueNumber()}</span>
            <input
              ref={ref}
              disabled={value === "$" ? true : false}
              type="text"
              onBlur={onBlur}
              value={value || ""}
              onFocus={onFocus}
              className={`box-border w-24 h-24 text-center border-2 caret-transparent px-2
                 ${backgroundColor()}
                `}
              onChange={(e) => {
                if (isRebus) {
                  console.log("the input data is", e.target.value);
                  updateGrid(rowIndex, colIndex, e.target.value);
                }
              }}
              onClick={(e) =>
                handleOnGridClick(rowIndex, colIndex, currentIndex)
              }
              style={{
                fontSize: fontSize,
              }}
            />
          </>
        )}
      </>
    );
  }
);
export default CrosswordCell;
