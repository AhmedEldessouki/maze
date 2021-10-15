import React from "react";
import { printMovements } from "../../utils/solve";
import { mazify } from "../../utils/ps";
import "./draw.css";

type SomeType =
  | {
      maze: Array<Array<string>>;
      direction: "^" | "<" | "v" | ">";
      from: [number, number];
      movements: Array<string>;
    }
  | false;

function checker(maze: Array<Array<string>>, from: [number, number]) {
  if (from[0] === 0) {
    return true;
  } else if (from[1] === 0) {
    return true;
  } else if (from[0] === maze.length - 1) {
    return true;
  } else if (from[1] === maze[0].length - 1) {
    return true;
  }
  return false;
}

function Draw({ maze, i }: { maze: Array<Array<string>>; i: number }) {
  const [solvedMaze, setSolvedMaze] = React.useState(maze);

  const handleClick = () => {
    setSolvedMaze([...maze]);
    function handlingMaze(
      direction: "^" | "<" | "v" | ">" = "<",
      directions: ["^", "<", "v", ">"] = ["^", "<", "v", ">"],
      from: [number, number],
      movements: Array<string> = [],
      memo: { [key: string]: Array<string> | boolean } = {}
    ): SomeType {
      let z = 0;
      while (from !== [0, 0]) {
        if (z > 3) {
          // console.log(
          //   `handle`,
          //   maze.map((item) => item.join("")),
          //   current,
          //   direction
          // );
          if (checker(solvedMaze, from))
            return { from, movements, direction, maze: solvedMaze };
          return false;
        }
        if (
          from[0] >= 0 &&
          from[0] < solvedMaze.length &&
          from[1] >= 0 &&
          from[1] < solvedMaze[from[0]].length &&
          direction === "^"
        ) {
          if (solvedMaze[from[0]][from[1]] === " ") {
            if (
              from[0] >= 0 &&
              from[0] < solvedMaze.length &&
              from[1] >= 0 &&
              from[1] < solvedMaze[from[0]].length
            ) {
              solvedMaze[from[0]][from[1]] = direction;
              setSolvedMaze([...solvedMaze]);
            }
          }
          if (from[0] - 1 >= 0 && solvedMaze[from[0] - 1][from[1]] === " ") {
            from[0] -= 1;
            if (
              from[0] >= 0 &&
              from[0] < solvedMaze.length &&
              from[1] >= 0 &&
              from[1] < solvedMaze[from[0]].length
            ) {
              solvedMaze[from[0]][from[1]] = direction;
              setSolvedMaze([...solvedMaze]);
            }
            movements.push("F");
            z = 0;
            if (from[1] - 1 >= 0 && solvedMaze[from[0]][from[1] - 1] === " ") {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[1],
                  directions,
                  [from[0], from[1] - 1],
                  [...movements, "L", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
            if (
              from[1] + 1 < solvedMaze[0].length &&
              solvedMaze[from[0]][from[1] + 1] === " "
            ) {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[3],
                  directions,
                  [from[0], from[1] + 1],
                  [...movements, "R", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
            if (
              from[0] + 1 < solvedMaze.length &&
              solvedMaze[from[0] + 1][from[1]] === " "
            ) {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[2],
                  directions,
                  [from[0] + 1, from[1]],
                  [...movements, "B", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
          } else if (
            from[1] - 1 >= 0 &&
            solvedMaze[from[0]][from[1] - 1] === " "
          ) {
            from[1] -= 1;
            direction = directions[1];
            movements = [...movements, "L", "F"];
          } else if (
            from[1] + 1 < solvedMaze[0].length &&
            solvedMaze[from[0]][from[1] + 1] === " "
          ) {
            from[1] += 1;
            direction = directions[3];
            movements = [...movements, "R", "F"];
            z = 0;
          } else if (
            from[0] + 1 < solvedMaze.length &&
            solvedMaze[from[0] + 1][from[1]] === " "
          ) {
            from[0] += 1;
            direction = directions[2];
            movements = [...movements, "B", "F"];
            z = 0;
          }
        }
        if (
          from[0] >= 0 &&
          from[0] < solvedMaze.length &&
          from[1] >= 0 &&
          from[1] < solvedMaze[from[0]].length &&
          direction === ">"
        ) {
          if (solvedMaze[from[0]][from[1]] === " ") {
            if (
              from[0] >= 0 &&
              from[0] < solvedMaze.length &&
              from[1] >= 0 &&
              from[1] < solvedMaze[from[0]].length
            ) {
              solvedMaze[from[0]][from[1]] = direction;
              setSolvedMaze([...solvedMaze]);
            }
          }
          if (
            from[1] + 1 < solvedMaze[0].length &&
            solvedMaze[from[0]][from[1] + 1] === " "
          ) {
            from[1] += 1;
            if (
              from[0] >= 0 &&
              from[0] < solvedMaze.length &&
              from[1] >= 0 &&
              from[1] < solvedMaze[from[0]].length
            ) {
              solvedMaze[from[0]][from[1]] = direction;
              setSolvedMaze([...solvedMaze]);
            }
            movements.push("F");
            z = 0;
            if (from[0] - 1 >= 0 && solvedMaze[from[0] - 1][from[1]] === " ") {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[0],
                  directions,
                  [from[0] - 1, from[1]],
                  [...movements, "L", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
            if (
              from[0] + 1 < solvedMaze.length &&
              solvedMaze[from[0] + 1][from[1]] === " "
            ) {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[2],
                  directions,
                  [from[0] + 1, from[1]],
                  [...movements, "R", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    console.log(direction);
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
            if (from[1] - 1 >= 0 && solvedMaze[from[0]][from[1] - 1] === " ") {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[1],
                  directions,
                  [from[0], from[1] - 1],
                  [...movements, "B", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
          } else if (
            from[0] - 1 >= 0 &&
            solvedMaze[from[0] - 1][from[1]] === " "
          ) {
            from[0] -= 1;
            direction = directions[0];
            movements = [...movements, "L", "F"];
          } else if (
            from[0] + 1 < solvedMaze.length &&
            solvedMaze[from[0] + 1][from[1]] === " "
          ) {
            from[0] += 1;
            direction = directions[2];
            movements = [...movements, "R", "F"];
            z = 0;
          } else if (
            from[1] - 1 >= 0 &&
            solvedMaze[from[0]][from[1] - 1] === " "
          ) {
            from[1] -= 1;
            direction = directions[1];
            movements = [...movements, "B", "F"];
            z = 0;
          }
        }
        if (
          from[0] >= 0 &&
          from[0] < solvedMaze.length &&
          from[1] >= 0 &&
          from[1] < solvedMaze[from[0]].length &&
          direction === "v"
        ) {
          // ! ["^", "<", "v", ">"]
          if (solvedMaze[from[0]][from[1]] === " ") {
            if (
              from[0] >= 0 &&
              from[0] < solvedMaze.length &&
              from[1] >= 0 &&
              from[1] < solvedMaze[from[0]].length
            ) {
              solvedMaze[from[0]][from[1]] = direction;
              setSolvedMaze([...solvedMaze]);
            }
          }
          if (
            from[0] + 1 < solvedMaze.length &&
            solvedMaze[from[0] + 1][from[1]] === " "
          ) {
            from[0] += 1;
            if (
              from[0] >= 0 &&
              from[0] < solvedMaze.length &&
              from[1] >= 0 &&
              from[1] < solvedMaze[from[0]].length
            ) {
              solvedMaze[from[0]][from[1]] = direction;
              setSolvedMaze([...solvedMaze]);
            }
            movements.push("F");
            z = 0;
            if (
              from[1] + 1 < solvedMaze[0].length &&
              solvedMaze[from[0]][from[1] + 1] === " "
            ) {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[3],
                  directions,
                  [from[0], from[1] + 1],
                  [...movements, "L", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
            if (from[1] - 1 >= 0 && solvedMaze[from[0]][from[1] - 1] === " ") {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[1],
                  directions,
                  [from[0], from[1] - 1],
                  [...movements, "R", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
            if (from[0] - 1 >= 0 && solvedMaze[from[0] - 1][from[1]] === " ") {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[0],
                  directions,
                  [from[0] - 1, from[1]],
                  [...movements, "B", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
          } else if (
            from[1] + 1 < solvedMaze[0].length &&
            solvedMaze[from[0]][from[1] + 1] === " "
          ) {
            from[1] += 1;
            direction = directions[3];
            movements = [...movements, "L", "F"];
          } else if (
            from[1] - 1 >= 0 &&
            solvedMaze[from[0]][from[1] - 1] === " "
          ) {
            from[1] -= 1;
            direction = directions[1];
            movements = [...movements, "R", "F"];
            z = 0;
          } else if (
            from[0] - 1 >= 0 &&
            solvedMaze[from[0] - 1][from[1]] === " "
          ) {
            from[0] -= 1;
            direction = directions[0];
            movements = [...movements, "B", "F"];
            z = 0;
          }
        }
        if (
          from[0] >= 0 &&
          from[0] < solvedMaze.length &&
          from[1] >= 0 &&
          from[1] < solvedMaze[from[0]].length &&
          direction === "<"
        ) {
          // ! ["^", "<", "v", ">"]
          if (solvedMaze[from[0]][from[1]] === " ") {
            if (
              from[0] >= 0 &&
              from[0] < solvedMaze.length &&
              from[1] >= 0 &&
              from[1] < solvedMaze[from[0]].length
            ) {
              solvedMaze[from[0]][from[1]] = direction;
              setSolvedMaze([...solvedMaze]);
            }
          }
          if (from[1] - 1 >= 0 && solvedMaze[from[0]][from[1] - 1] === " ") {
            from[1] -= 1;
            if (
              from[0] >= 0 &&
              from[0] < solvedMaze.length &&
              from[1] >= 0 &&
              from[1] < solvedMaze[from[0]].length
            ) {
              solvedMaze[from[0]][from[1]] = direction;
              setSolvedMaze([...solvedMaze]);
            }
            movements.push("F");
            z = 0;
            if (
              from[0] + 1 < solvedMaze.length &&
              solvedMaze[from[0] + 1][from[1]] === " "
            ) {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[2],
                  directions,
                  [from[0] + 1, from[1]],
                  [...movements, "L", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
            if (from[0] - 1 >= 0 && solvedMaze[from[0] - 1][from[1]] === " ") {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[0],
                  directions,
                  [from[0] - 1, from[1]],
                  [...movements, "R", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
            if (
              from[1] + 1 < solvedMaze[0].length &&
              solvedMaze[from[0]][from[1] + 1] === " "
            ) {
              if (!(JSON.stringify(solvedMaze) in memo)) {
                const res: SomeType = handlingMaze(
                  directions[3],
                  directions,
                  [from[0], from[1] + 1],
                  [...movements, "B", "F"],
                  memo
                );
                if (res) {
                  movements = res.movements;
                  setSolvedMaze([...res.maze]);
                  if (
                    from[0] >= 0 &&
                    from[0] < solvedMaze.length &&
                    from[1] >= 0 &&
                    from[1] < solvedMaze[from[0]].length
                  ) {
                    solvedMaze[from[0]][from[1]] = direction;
                    setSolvedMaze([...solvedMaze]);
                  }
                  memo[JSON.stringify(solvedMaze)] = movements;
                  direction = res.direction;
                  from = res.from;
                } else {
                  memo[JSON.stringify(solvedMaze)] = false;
                }
              }
            }
          } else if (
            from[0] + 1 < solvedMaze.length &&
            solvedMaze[from[0] + 1][from[1]] === " "
          ) {
            from[0] += 1;
            direction = directions[2];
            movements = [...movements, "L", "F"];
          } else if (
            from[0] - 1 >= 0 &&
            solvedMaze[from[0] - 1][from[1]] === " "
          ) {
            from[0] -= 1;
            direction = directions[0];
            movements = [...movements, "R", "F"];
            z = 0;
          } else if (
            from[1] + 1 < solvedMaze[0].length &&
            solvedMaze[from[0]][from[1] + 1] === " "
          ) {
            from[1] += 1;
            direction = directions[3];
            movements = [...movements, "B", "F"];
            z = 0;
          }
        }
        z++;
      }
      return handlingMaze(direction, directions, from, movements, memo);
    }
    let direction: "^" | "<" | "v" | ">" = "<";
    let from: [number, number] = [0, 0];
    let movements: Array<string> = [];
    let memo: { [key: string]: Array<string> | boolean } = {};
    // Have a nice sleep ;)
    const directions: ["^", "<", "v", ">"] = ["^", "<", "v", ">"];

    for (let x = 0; x < solvedMaze.length; x++) {
      let y = -1;
      for (let i = 0; i < directions.length; i++) {
        y = solvedMaze[x].indexOf(directions[i]);
        if (y > -1) {
          from[0] = x;
          from[1] = y;
          break;
        }
      }
      if (y > -1) {
        from = [x, y];
        direction = solvedMaze[x][y] as typeof direction;
        break;
      }
    }
    console.log(from, direction);
    let z = 0;
    while (from !== [0, 0]) {
      // if (!(JSON.stringify(solvedMaze) in memo)) {
      const res: SomeType = handlingMaze(
        direction,
        directions,
        [from[0], from[1]],
        [...movements],
        memo
      );
      if (res) {
        movements = res.movements;
        maze = res.maze;
        direction = res.direction;
        console.log(from, res.from);
        from = res.from;
        console.log(from);
        if (
          from[0] >= 0 &&
          from[0] < maze.length &&
          from[1] >= 0 &&
          from[1] < maze[from[0]].length
        )
          maze[from[0]][from[1]] = direction;
        memo[JSON.stringify(maze)] = movements;
        if (checker(res.maze, res.from)) {
          console.log(`done!`);
          return;
        }
      } else {
        memo[JSON.stringify(maze)] = true;
      }
      // }
      if (z > 3) {
        if (checker(maze, from)) {
          return;
        }
        console.log(
          `here`,
          maze.map((item) => item.join("")),
          from,
          direction
        );
        return;
      }

      z++;
    }
    return;
  };

  return (
    <div
      className="center"
      style={{ flexDirection: "column", padding: "20px" }}
    >
      <div className="center" style={{ flexDirection: "row", gap: "20px" }}>
        <h1>Maze {i + 1}</h1>
        <button
          type="button"
          style={{
            padding: "10px 15px",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={() => {
            const moves: string[] = printMovements(solvedMaze);
            const zzz = mazify(solvedMaze);
            console.log(moves, zzz);
            handleClick();
          }}
        >
          Solve
        </button>
      </div>
      <div
        style={{
          flexDirection: "column",
          overflow: "auto",
          alignItems: "flex-start",
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
          width: "90vw",
        }}
      >
        {solvedMaze.map((row, r) => (
          <div
            key={r}
            className="center"
            style={{
              flexDirection: "row",
              overflow: "auto",
            }}
          >
            {row.map((col, c) => {
              return col === "#" ? (
                <div key={c * 200} className="size wall"></div>
              ) : col === " " ? (
                <div key={c * 200} className="size space"></div>
              ) : (
                <div key={c * 200} className="size other">
                  {col}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Draw;
