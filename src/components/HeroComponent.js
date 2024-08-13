import React from "react";
import CrosswordGrid from "./CrosswordGrid";

const HeroComponent = ({ data, handleInput, Clues }) => {
  //   console.log(clues[0].Across);
  return (
    <div className=" w-full h-auto flex gap-6 mt-5 justify-between">
      <div className="flex-col justify-center items-center gap-6">
        <div className="text-center">Chef's Garment</div>
        <CrosswordGrid data={data} handleInput={handleInput} />;
      </div>

      {Clues.map((clue, index) => (
        <div
          className="flex gap-4 justify-between border-2 w-[50%] "
          key={index}
        >
          <div className=" w-[50%]">
            <h3 className="mb-2 text-xl font-bold border-b-2 p-3">Across</h3>
            <ul>
              {Object.entries(clue.Across).map(([key, value]) => (
                <li key={key} className="leading-10 flex">
                  <strong className="mr-3 ml-2">{key} </strong>
                  <p>{value}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[50%]">
            <h3 className="mb-2 text-xl font-bold border-b-2 p-3">Down</h3>
            <ul>
              {Object.entries(clue.Down).map(([key, value]) => (
                <li key={key} className="leading-10 flex">
                  <strong className="mr-3 ml-2">{key} </strong>
                  <p>{value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroComponent;
