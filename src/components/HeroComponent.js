import React, { useEffect, useState } from "react";
import CrosswordGrid from "./CrosswordGrid";

const HeroComponent = ({
  data,
  updateGrid,
  Clues,
  isRebus,
  resetRebus,
  selectedDirection,
  spaceBarDirection,
  backSpaceDirection,
  skipWords,
  findFirstBlank,
  jumpNextClue,
}) => {
  const firstValueAcross = Clues[0].Across["1"];
  const firstValueDown = Clues[0].Down["1"];
  const [activeClue, setActiveClue] = useState({
    name: "A",
    key: "1",
    value: firstValueAcross,
  });

  const [adjacentClue, setAdjacentClue] = useState({
    name: "",
    key: "",
    value: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeGrid, setActiveGrid] = useState({
    rgrid: 0,
    cgrid: 1,
  });

  const across = Clues[0].Across;
  const down = Clues[0].Down;

  useEffect(() => {
    if (adjacentClue.name === activeClue.name) {
      setAdjacentClue({
        name: activeClue.name === "A" ? "D" : "A",
        key: "1",
        value: activeClue.name === "A" ? firstValueDown : firstValueAcross,
      });
    }

    if (activeClue.name === "A") {
      if (activeClue.key === 1 || activeClue.key === "1") {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(activeClue.key - 4);
      }
      if (down.hasOwnProperty(activeClue.key)) {
        setAdjacentClue({
          name: "D",
          key: activeClue.key,
          value: down[activeClue.key],
        });
      }
      return;
    }

    if (activeClue.name === "D") {
      if (activeClue.key === 5) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(activeClue.key);
      }
      if (across.hasOwnProperty(activeClue.key)) {
        setAdjacentClue({
          name: "A",
          key: activeClue.key,
          value: across[activeClue.key],
        });
      }
      return;
    }
  }, [
    activeClue,
    Clues,
    adjacentClue.name,
    firstValueAcross,
    firstValueDown,
    across,
    down,
    currentIndex,
  ]);

  const getAcrossKey = (rowIndex) => {
    switch (rowIndex) {
      case 0:
        return 1;
        break;
      case 1:
        return 5;
        break;
      case 2:
        return 6;
        break;
      case 3:
        return 7;
        break;
      case 4:
        return 8;
        break;

      default:
        return 1;
        break;
    }
  };

  const handleOnGridClick = (rowIndex, colIndex, currentIndex) => {
    resetRebus();
    if (activeClue.name === "A") {
      setCurrentIndex(rowIndex);
      let key = getAcrossKey(rowIndex);

      setActiveClue({
        name: "A",
        key: key,
        value: across[key],
      });
    } else {
      setCurrentIndex(colIndex);
      setActiveClue({
        name: "D",
        key: colIndex === 0 ? 5 : colIndex,
        value: down[colIndex === 0 ? 5 : colIndex],
      });
      resetRebus();
    }

    handleFocus(rowIndex, colIndex);
  };

  const handleFocus = (rowIndex, colIndex) => {
    setActiveGrid({
      rgrid: rowIndex,
      cgrid: colIndex,
    });
  };

  const handleClueClick = (name, key, value) => {
    setActiveClue({
      name,
      key: Number(key),
      value,
    });

    if (name === "D") {
      if (Number(key) === 5) {
        setActiveGrid({
          rgrid: 1,
          cgrid: 0,
        });
        resetRebus();
      } else {
        setActiveGrid({
          rgrid: 0,
          cgrid: Number(key),
        });
        resetRebus();
      }
    }

    if (name === "A") {
      if (Number(key) === 1) {
        setActiveGrid({
          rgrid: 0,
          cgrid: 1,
        });
        resetRebus();
      } else {
        setActiveGrid({
          rgrid: key - 4,
          cgrid: 0,
        });
        resetRebus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (isRebus) {
      return;
    }
    const { rgrid, cgrid } = activeGrid;
    if (e.key === "Backspace") {
      if (backSpaceDirection) {
        if (activeClue.name === "A") {
          let key = getAcrossKey(rgrid);
          if (cgrid > 0) {
            if (data[rgrid][cgrid - 1] !== "$") {
              updateGrid(rgrid, cgrid - 1, "");
              setActiveGrid({ rgrid, cgrid: cgrid - 1 });
              key = getAcrossKey(rgrid);
              setActiveClue({
                name: "A",
                key: key,
                value: across[key],
              });
            } else if (data[rgrid][cgrid - 1] === "$") {
              setActiveGrid({ rgrid: data.length - 1, cgrid: 0 });
              updateGrid(data.length - 1, 0, "");
              setActiveClue({
                name: "D",
                key: 0,
                value: down[5],
              });
            }
          }
          if (cgrid === 0 && rgrid > 0) {
            setActiveGrid({ rgrid: rgrid - 1, cgrid: data.length - 1 });
            key = getAcrossKey(rgrid - 1);
            setActiveClue({
              name: "A",
              key: key,
              value: across[key],
            });
          }
        } else if (activeClue.name === "D") {
          if (rgrid > 0) {
            if (data[rgrid - 1][cgrid] === "$") {
              setActiveGrid({ rgrid: 3, cgrid: 4 });
              updateGrid(3, 3, "");
              setActiveClue({
                name: "D",
                key: 4,
                value: down[5],
              });
            } else {
              setActiveGrid({ rgrid: rgrid - 1, cgrid });
              updateGrid(rgrid - 1, cgrid, "");
              setActiveClue({
                name: "D",
                key: cgrid === 0 ? 5 : cgrid,
                value: down[cgrid === 0 ? 5 : cgrid],
              });
            }
          } else if (rgrid === 0) {
            if (cgrid > 1) {
              setActiveGrid({ rgrid: data.length - 1, cgrid: cgrid - 1 });
              updateGrid(data.length - 1, cgrid - 1, "");
              setActiveClue({
                name: "D",
                key: cgrid - 1 === 0 ? 5 : cgrid - 1,
                value: down[cgrid - 1],
              });
            } else if (cgrid === 1) {
              setActiveGrid({ rgrid: 4, cgrid: 3 });
              updateGrid(4, 3, "");
              let key = getAcrossKey(4);
              setActiveClue({
                name: "A",
                key: key,
                value: across[key],
              });
            }
          }
        }
      } else {
        updateGrid(rgrid, cgrid, "");
      }
    }
    if (e.key === " ") {
      if (spaceBarDirection === "clear current") {
        if (activeClue.name === "A") {
          if (rgrid === 0 && cgrid === data.length - 1) {
            setActiveGrid({ rgrid: 0, cgrid: 1 });
            return;
          }
          if (rgrid !== 0 && cgrid === data.length - 1) {
            setActiveGrid({ rgrid, cgrid: 0 });
            return;
          }
          if (rgrid === 4 && cgrid === 3) {
            setActiveGrid({ rgrid, cgrid: 0 });
            return;
          }
          if (cgrid < data.length - 1) {
            setActiveGrid({ rgrid, cgrid: cgrid + 1 });
            return;
          }
        } else {
          if (rgrid === 4 && cgrid === 0) {
            setActiveGrid({ rgrid: 1, cgrid });
            return;
          }
          if (rgrid === 3 && cgrid === 4) {
            setActiveGrid({ rgrid: 0, cgrid });
            return;
          }
          if (rgrid < data.length - 1) {
            setActiveGrid({ rgrid: rgrid + 1, cgrid });
            return;
          }
          if (rgrid === data.length - 1) {
            setActiveGrid({ rgrid: 0, cgrid });
            return;
          }
        }
      } else {
        if (activeClue.name === "D") {
          let key = getAcrossKey(rgrid);
          setActiveClue({
            name: "A",
            key: key,
            value: across[key],
          });
        } else {
          setActiveClue({
            name: "D",
            key: cgrid === 0 ? 5 : cgrid,
            value: down[cgrid === 0 ? 5 : cgrid],
          });
        }
      }
    }
    if (e.code === `Key${e.key.toUpperCase()}`) {
      if (!isRebus) {
        updateGrid(rgrid, cgrid, e.key);
        if (findFirstBlank) {
          return handleKeyPress({ key: " " });
        }
        if (jumpNextClue) {
          if (activeClue.name === "A") {
            let key = getAcrossKey(rgrid);
            if (cgrid < data.length - 1) {
              if (data[rgrid][cgrid + 1] !== "$") {
                setActiveGrid({ rgrid, cgrid: cgrid + 1 });
                key = getAcrossKey(rgrid);
                setActiveClue({
                  name: "A",
                  key: key,
                  value: across[key],
                });
              } else if (data[rgrid][cgrid + 1] === "$") {
                setActiveGrid({ rgrid: 0, cgrid: 1 });
                setActiveClue({
                  name: "D",
                  key: 1,
                  value: down[1],
                });
              }
              return;
            } else if (cgrid === data.length - 1) {
              setActiveGrid({ rgrid: rgrid + 1, cgrid: 0 });
              key = getAcrossKey(rgrid + 1);
              setActiveClue({
                name: "A",
                key: key,
                value: across[key],
              });
              return;
            }
          } else if (activeClue.name === "D") {
            if (rgrid < data.length - 1) {
              if (data[rgrid + 1][cgrid] === "$") {
                setActiveGrid({ rgrid: 1, cgrid: 0 });
                setActiveClue({
                  name: "D",
                  key: 4,
                  value: down[5],
                });
                return;
              } else {
                setActiveGrid({ rgrid: rgrid + 1, cgrid });
                setActiveClue({
                  name: "D",
                  key: cgrid === 0 ? 5 : cgrid,
                  value: down[cgrid === 0 ? 5 : cgrid],
                });
                return;
              }
            } else if (rgrid === data.length - 1) {
              if (cgrid < data.length - 1 && cgrid !== 0) {
                setActiveGrid({ rgrid: 0, cgrid: cgrid + 1 });
                setActiveClue({
                  name: "D",
                  key: cgrid + 1 === 0 ? 5 : cgrid + 1,
                  value: down[cgrid + 1],
                });
                return;
              } else if (cgrid === 0) {
                setActiveGrid({ rgrid: 0, cgrid: 1 });
                let key = getAcrossKey(0);
                setActiveClue({
                  name: "A",
                  key: key,
                  value: across[key],
                });
                return;
              }
            }
          }
        }
        if (!findFirstBlank && !jumpNextClue) {
          if (
            (activeClue.name === "D" && rgrid === data.length - 1) ||
            (activeClue.name === "A" && cgrid === data.length - 1)
          ) {
            return;
          } else if (
            (rgrid === 4 && cgrid === 3) ||
            (rgrid === 3 && cgrid === 4)
          ) {
            return;
          } else {
            return handleKeyPress({ key: " " });
          }
        }
        if (skipWords) {
          nextFocus();
        } else {
          handleKeyPress({ key: " " });
        }
      }
      return;
    }

    let key;
    switch (e.key) {
      case "ArrowUp":
        if (rgrid === 1 && cgrid === 0) {
          return;
        }
        if (rgrid > 0 && activeClue.name === "D") {
          setActiveGrid({ rgrid: rgrid - 1, cgrid });
          resetRebus();
        }
        if (rgrid > 0 && activeClue.name === "A") {
          if (selectedDirection === "Stay in the same") {
            setActiveGrid({ rgrid: rgrid, cgrid });
          } else {
            setActiveGrid({ rgrid: rgrid - 1, cgrid });
          }
        }

        setActiveClue({
          name: "D",
          key: cgrid === 0 ? 5 : cgrid,
          value: down[cgrid === 0 ? 5 : cgrid],
        });

        break;
      case "ArrowDown":
        if (rgrid === 3 && cgrid === 4) {
          return;
        }
        if (rgrid < data.length - 1 && activeClue.name === "D") {
          setActiveGrid({ rgrid: rgrid + 1, cgrid });
          resetRebus();
        }

        if (rgrid > 0 && activeClue.name === "A") {
          if (selectedDirection === "Stay in the same") {
            setActiveGrid({ rgrid: rgrid, cgrid });
          } else {
            setActiveGrid({ rgrid: rgrid + 1, cgrid });
          }
        }
        setActiveClue({
          name: "D",
          key: cgrid === 0 ? 5 : cgrid,
          value: down[cgrid === 0 ? 5 : cgrid],
        });

        break;
      case "ArrowLeft":
        if (rgrid === 0 && cgrid === 1) {
          return;
        }
        if (cgrid > 0 && activeClue.name === "A") {
          setActiveGrid({ rgrid, cgrid: cgrid - 1 });
          resetRebus();
        }

        if (cgrid > 0 && activeClue.name === "D") {
          if (selectedDirection === "Stay in the same") {
            setActiveGrid({ rgrid, cgrid });
          } else {
            setActiveGrid({ rgrid, cgrid: cgrid - 1 });
          }
        }

        key = getAcrossKey(rgrid);
        setActiveClue({
          name: "A",
          key: key,
          value: across[key],
        });

        break;
      case "ArrowRight":
        if (rgrid === 4 && cgrid === 3) {
          return;
        }
        if (cgrid < data[rgrid].length - 1 && activeClue.name === "A") {
          setActiveGrid({ rgrid, cgrid: cgrid + 1 });
          resetRebus();
        }

        if (cgrid < data[rgrid].length - 1 && activeClue.name === "D") {
          if (selectedDirection === "Stay in the same") {
            setActiveGrid({ rgrid, cgrid });
          } else {
            setActiveGrid({ rgrid, cgrid: cgrid + 1 });
          }
        }
        key = getAcrossKey(rgrid);
        setActiveClue({
          name: "A",
          key: key,
          value: across[key],
        });
        break;
      default:
        break;
    }
  };

  const findNextEmptyCellRow = (crosswordData, currentRow, currentCol) => {
    const numRows = crosswordData.length;
    const numCols = crosswordData[0].length;

    const searchRight = (row, col) => {
      for (let c = col + 1; c < numCols; c++) {
        if (crosswordData[row][c] === "") {
          return { row, col: c };
        }
      }
      return null;
    };

    const searchLeft = (row, col) => {
      for (let c = 0; c < col; c++) {
        if (crosswordData[row][c] === "") {
          return { row, col: c };
        }
      }

      return null;
    };

    const searchNextRow = (row) => {
      for (
        let nextRow = (row + 1) % numRows;
        nextRow !== row;
        nextRow = (nextRow + 1) % numCols
      ) {
        for (let c = 0; c < numCols; c++) {
          if (crosswordData[nextRow][c] === "") {
            return { row: nextRow, col: c };
          }
        }
      }
      return null;
    };

    let result = searchRight(currentRow, currentCol);

    if (!result) {
      result = searchLeft(currentRow, currentCol);
    }

    if (!result) {
      result = searchNextRow(currentRow, currentCol);
    }

    if (!result) {
      return { row: currentRow, col: currentCol };
    }

    return result;
  };

  function findNextEmptyCellCol(crosswordData, currentRow, currentCol) {
    const numRows = crosswordData.length;
    const numCols = crosswordData[0].length;

    // Function to search downwards
    const searchDown = (row, col) => {
      for (let r = row + 1; r < numRows; r++) {
        if (crosswordData[r][col] === "") {
          return { row: r, col };
        }
      }
      return null;
    };

    // Function to search upwards
    const searchUp = (row, col) => {
      for (let r = 0; r < row; r++) {
        if (crosswordData[r][col] === "") {
          return { row: r, col };
        }
      }
      return null;
    };

    // Function to search the next column
    const searchNextColumn = (col) => {
      for (
        let nextCol = (col + 1) % numCols;
        nextCol !== col;
        nextCol = (nextCol + 1) % numCols
      ) {
        for (let r = 0; r < numRows; r++) {
          if (crosswordData[r][nextCol] === "") {
            return { row: r, col: nextCol };
          }
        }
      }
      return null;
    };

    // Try to find an empty cell below the current one in the same column
    let result = searchDown(currentRow, currentCol);

    // If not found, search above the current one in the same column

    if (!result) {
      result = searchUp(currentRow, currentCol);
    }

    // If still not found, search the next columns

    if (!result) {
      result = searchNextColumn(currentCol);
    }

    if (!result) {
      return { row: currentRow, col: currentCol };
    }

    // If no empty cell is found, return the current position

    return result;
  }

  const nextFocus = () => {
    const hasBlankSpaces = data.some((row) => row.includes(""));
    if (!hasBlankSpaces) {
      return;
    }

    resetRebus();

    const { rgrid, cgrid } = activeGrid;
    if (activeClue.name === "D") {
      const { row, col } = findNextEmptyCellCol(data, rgrid, cgrid);
      setActiveGrid({ rgrid: row, cgrid: col });
      handleOnGridClick(row, col);
      return;
    }

    if (activeClue.name === "A") {
      const { row, col } = findNextEmptyCellRow(data, rgrid, cgrid);
      setActiveGrid({ rgrid: row, cgrid: col });
      handleOnGridClick(row, col);
      return;
    }
  };

  return (
    <div className=" w-full h-auto flex flex-col lg:flex-row gap-6 mt-20 justify-between mb-10">
      <div className="flex-col justify-center items-center gap-6  mx-auto relative">
        <div className="text-center font-bold max-w-[480px]">
          <span>{activeClue.key}</span>
          <span>{activeClue.name}</span>
          <span className="ml-2"> {activeClue.value}</span>
        </div>
        <CrosswordGrid
          data={data}
          updateGrid={updateGrid}
          activeClue={activeClue}
          currentIndex={currentIndex}
          handleOnGridClick={handleOnGridClick}
          activeGrid={activeGrid}
          handleKeyPress={handleKeyPress}
          handleFocus={handleFocus}
          nextFocus={nextFocus}
          isRebus={isRebus}
          resetRebus={resetRebus}
        />
      </div>

      {Clues.map((clue, index) => (
        <div
          className="flex gap-4 justify-between border-2 w-full mx-auto lg:w-[50%]  "
          key={index}
        >
          <div className="w-[100%] md:w-[50%]">
            <h3 className="mb-2 text-xl font-bold border-b-2 p-3">Across</h3>
            <ul>
              {Object.entries(clue.Across).map(([key, value]) => (
                <li
                  onClick={() => handleClueClick("A", key, value)}
                  name="A"
                  key={key}
                  className={`leading-8 lg:leading-10 flex cursor-pointer ${
                    activeClue.value === value ? "border-4" : ""
                  } ${adjacentClue.value === value ? "border-2" : ""}`}
                >
                  <strong className="mr-3 ml-2">{key} </strong>
                  <p>{value}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[100%] md:w-[50%]">
            <h3 className="mb-2 text-xl font-bold border-b-2 p-3">Down</h3>
            <ul>
              {Object.entries(clue.Down).map(([key, value]) => (
                <li
                  onClick={() => handleClueClick("D", key, value)}
                  key={key}
                  className={`leading-8 lg:leading-10 flex cursor-pointer ${
                    activeClue.value === value ? "border-4" : ""
                  } ${adjacentClue.value === value ? "border-2" : ""}`}
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
