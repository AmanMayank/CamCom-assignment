import React from "react";

const CrosswordCell = ({
  value,
  isFocused,
  onFocus,
  handleInput,
  rowIndex,
  colIndex,
}) => {
  return (
    <input
      type="text"
      maxLength="1"
      value={value || ""}
      onFocus={onFocus}
      className={`w-24 h-24 text-center text-xl border-2 ${
        isFocused ? "focused" : ""
      }`}
      //   readOnly
      onChange={(e) => handleInput(rowIndex, colIndex, e.target.value)}
    />
  );
};

export default CrosswordCell;
