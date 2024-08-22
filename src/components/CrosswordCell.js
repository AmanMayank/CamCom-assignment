import React from "react";

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
    },
    ref
  ) => {
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
      if (value === "$") {
        return "bg-black z-10";
      } else if (
        activeGrid.rgrid === rowIndex &&
        activeGrid.cgrid === colIndex
      ) {
        return "bg-yellow-300";
      } else if (
        (activeClue.name === "A" && Number(currentIndex) === rowIndex) ||
        (activeClue.name !== "A" && Number(currentIndex) === colIndex)
      ) {
        return "bg-blue-600";
      } else {
        return "";
      }
    };

    return (
      <>
        <span className="absolute p-1">
          {getClueNumber()}
          {/* {rowIndex}
        {colIndex} */}
        </span>
        <input
          ref={ref}
          disabled={value === "$" ? true : false}
          type="text"
          maxLength="1"
          value={value || ""}
          onFocus={onFocus}
          // isFocused={isFocused}
          className={`w-24 h-24 text-center text-xl border-2 caret-transparent 
                 ${backgroundColor()}
                `}
          onChange={(e) => {
            //   if (value === "") {
            //     console.log("is this being called", value === "");
            //     updateGrid(rowIndex, colIndex, e.target.value);
            //     nextFocus();
            //   }
          }}
          onClick={(e) => handleOnGridClick(rowIndex, colIndex, currentIndex)}
        />
      </>
    );
  }
);
export default CrosswordCell;
