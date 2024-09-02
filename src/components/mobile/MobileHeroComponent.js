import React, { useState, useEffect, useRef } from "react";
import MobileCrosswordGrid from "./MobileCrosswordGrid";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import { MdOutlineEdit } from "react-icons/md";

const MobileHeroComponent = ({
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
  handleCurrentDirectionChange,
  helperData,
  autoCheck,
}) => {
  const keyboard = useRef();
  const [layout, setLayout] = useState("default");
  const [input, setInput] = useState("");
  const firstValueAcross = Clues[0].Across["1"];
  const [activeClue, setActiveClue] = useState({
    name: "A",
    key: "1",
    value: firstValueAcross,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeGrid, setActiveGrid] = useState({
    rgrid: 0,
    cgrid: 1,
  });

  const across = Clues[0].Across;
  const down = Clues[0].Down;

  useEffect(() => {
    if (activeClue.name === "A") {
      // handleCurrentDirectionChange("across", activeGrid);
      if (activeClue.key === 1 || activeClue.key === "1") {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(activeClue.key - 4);
      }

      return;
    }

    if (activeClue.name === "D") {
      // handleCurrentDirectionChange("down", activeGrid);
      if (activeClue.key === 5) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(activeClue.key);
      }
    }
  }, [activeClue, Clues, across, down, currentIndex]);

  const customLayout = {
    default: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "Z X C V B N M {bksp}",
    ],
  };

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

  const handleKeyPress = (e) => {
    console.log(e);
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
    const isUppercaseLetter = /^[A-Z]$/.test(e);
    if (isUppercaseLetter) {
      if (!isRebus) {
        updateGrid(rgrid, cgrid, e);
        if (findFirstBlank && !jumpNextClue) {
          return handleKeyPress({ key: " " });
        }
        if (jumpNextClue && !findFirstBlank) {
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

  const onClueClick = () => {
    const { rgrid, cgrid } = activeGrid;
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
  };

  const onLeftArrowClick = () => {
    const { rgrid, cgrid } = activeGrid;
    if (activeClue.name === "A") {
      let key = getAcrossKey(rgrid);
      if (rgrid > 0) {
        if (rgrid === 1) {
          setActiveGrid({ rgrid: 0, cgrid: 1 });
          setActiveClue({
            name: "A",
            key: getAcrossKey(0),
            value: across[key],
          });
        } else {
          setActiveGrid({ rgrid: rgrid - 1, cgrid: 0 });
          setActiveClue({
            name: "A",
            key: getAcrossKey(rgrid - 1),
            value: across[key],
          });
        }
      } else if (rgrid === 0 && cgrid > 0) {
        setActiveGrid({ rgrid: 1, cgrid: 0 });
        setActiveClue({
          name: "D",
          key: 0,
          value: down[5],
        });
      }
    } else {
      if (cgrid > 1) {
        setActiveGrid({ rgrid: 0, cgrid: cgrid - 1 });
        setActiveClue({
          name: "D",
          key: cgrid - 1,
          value: down[cgrid - 1],
        });
      } else if (cgrid === 0) {
        setActiveGrid({ rgrid: 0, cgrid: 4 });
        setActiveClue({
          name: "D",
          key: 4,
          value: down[4],
        });
      } else if (cgrid === 1) {
        setActiveGrid({ rgrid: 4, cgrid: 0 });
        let key = getAcrossKey(4);
        setActiveClue({
          name: "A",
          key: key,
          value: across[key],
        });
      }
    }
  };

  const onRightArrowClick = () => {
    const { rgrid, cgrid } = activeGrid;
    if (activeClue.name === "A") {
      let key = getAcrossKey(rgrid);
      if (rgrid < data.length - 1) {
        setActiveGrid({ rgrid: rgrid + 1, cgrid: 0 });
        setActiveClue({
          name: "A",
          key: getAcrossKey(rgrid + 1),
          value: across[key],
        });
      } else if (rgrid === data.length - 1) {
        setActiveGrid({ rgrid: 0, cgrid: 1 });
        setActiveClue({
          name: "D",
          key: 1,
          value: down[1],
        });
      }
    } else {
      if (cgrid < data.length - 1 && cgrid > 0) {
        setActiveGrid({ rgrid: 0, cgrid: cgrid + 1 });
        setActiveClue({
          name: "D",
          key: cgrid + 1,
          value: down[cgrid + 1],
        });
      } else if (cgrid === data.length - 1) {
        setActiveGrid({ rgrid: 1, cgrid: 0 });
        setActiveClue({
          name: "D",
          key: 5,
          value: down[5],
        });
      } else if (cgrid === 0) {
        setActiveGrid({ rgrid: 0, cgrid: 1 });
        let key = getAcrossKey(0);
        setActiveClue({
          name: "A",
          key: key,
          value: across[key],
        });
      }
    }
  };

  return (
    <div className=" w-full h-[85vh] gap-2 mt-4 mb-4">
      <div className="h-full w-full  flex flex-col justify-between items-center gap-10 relative mt-5">
        <div>
          <MobileCrosswordGrid
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
            helperData={helperData}
            autoCheck={autoCheck}
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between text-center font-bold text-[15px] w-full bg-blue-300 py-2 px-3">
            <span onClick={onLeftArrowClick} className="mr-1">
              {"<"}
            </span>
            <div onClick={onClueClick}>
              <span>{activeClue.key}</span>
              <span>{activeClue.name}</span>
              <span className="ml-1"> {activeClue.value}</span>
            </div>
            <span onClick={onRightArrowClick} className="ml-1">
              {">"}
            </span>
          </div>
          <div>
            <Keyboard
              keyboardRef={(r) => (keyboard.current = r)}
              layout={customLayout}
              layoutName={layout}
              //   onChange={onChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="w-full flex justify-between text-base gap-2 px-1">
            <button className="border-black border-2 flex-1 py-1 rounded-md">
              Rebus
            </button>
            <button className="border-black border-2 flex-1 flex items-center justify-center py-1 rounded-md">
              <MdOutlineEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeroComponent;
