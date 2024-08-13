import CrosswordCell from "./CrosswordCell";

const CrosswordGrid = ({ data, handleInput, activeClue }) => {
  return (
    <div className="mt-11  ml-4 grid grid-row-5 min-w-[480px]">
      {data.map((row, rowIndex) => (
        <div className="" key={rowIndex}>
          {row.map((cell, colIndex) => (
            <CrosswordCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              isFocused={false} // Logic for focused cell can be added later
              onFocus={() => {}}
              handleInput={handleInput}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CrosswordGrid;
