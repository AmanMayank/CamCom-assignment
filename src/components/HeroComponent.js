import React, { useState } from "react";
import CrosswordGrid from "./CrosswordGrid";

const HeroComponent = ({ data, handleInput, Clues }) => {
  const firstValue = Clues[0].Across["1"];
  const [activeClue, setActiveClue] = useState({
    name: "A",
    key: "1",
    value: firstValue,
  });

  const handleClick = (name, key, value) => {
    setActiveClue({
      name,
      key,
      value,
    });
  };

  console.log(Clues[0].Across["1"]);

  const { currentname, currentKey, currentValue } = activeClue;

  return (
    <div className=" w-full h-auto flex flex-col lg:flex-row gap-6 mt-5 justify-between">
      <div className="flex-col justify-center items-center gap-6 min-w-[680px] mx-auto">
        <div className="text-center font-bold max-w-[480px]">
          <span>{activeClue.key}</span>
          <span>{activeClue.name}</span>
          <span className="ml-2"> {activeClue.value}</span>
        </div>
        <CrosswordGrid
          data={data}
          handleInput={handleInput}
          activeClue={activeClue}
        />
      </div>

      {Clues.map((clue, index) => (
        <div
          className="flex gap-4 justify-between border-2 w-full mx-auto lg:w-[50%]  "
          key={index}
        >
          <div className=" w-[50%]">
            <h3 className="mb-2 text-xl font-bold border-b-2 p-3">Across</h3>
            <ul>
              {Object.entries(clue.Across).map(([key, value]) => (
                <li
                  onClick={() => handleClick("A", key, value)}
                  name="A"
                  key={key}
                  className={`leading-8 lg:leading-10 flex cursor-pointer ${
                    activeClue.value === value ? "border-2" : ""
                  }`}
                >
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
                <li
                  onClick={() => handleClick("D", key, value)}
                  key={key}
                  className={`leading-8 lg:leading-10 flex cursor-pointer ${
                    activeClue.value === value ? "border-2" : ""
                  }`}
                >
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
