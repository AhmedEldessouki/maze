type SomeType =
  | {
      maze: Array<Array<string>>;
      direction: "^" | "<" | "v" | ">";
      current: [number, number];
      movements: Array<string>;
    }
  | false;

function checker(maze: Array<Array<string>>, current: [number, number]) {
  if (current[0] === 0) {
    return true;
  } else if (current[1] === 0) {
    return true;
  } else if (current[0] === maze.length - 1) {
    return true;
  } else if (current[1] === maze[0].length - 1) {
    return true;
  }
  return false;
}

function handlingMaze(
  maze: Array<Array<string>>,
  direction: "^" | "<" | "v" | ">" = "<",
  directions: ["^", "<", "v", ">"] = ["^", "<", "v", ">"],
  current: [number, number],
  movements: Array<string> = [],
  memo: { [key: string]: Array<string> | boolean } = {}
): SomeType {
  let z = 0;
  while (current !== [0, 0]) {
    if (z > 2) {
      // console.log(
      //   `handle`,
      //   maze.map((item) => item.join("")),
      //   current,
      //   direction
      // );
      if (checker(maze, current))
        return { current, movements, direction, maze };
      return false;
    }
    if (
      current[0] >= 0 &&
      current[0] < maze.length &&
      current[1] >= 0 &&
      current[1] < maze[current[0]].length &&
      direction === "^"
    ) {
      if (maze[current[0]][current[1]] === " ") {
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
      }
      if (current[0] - 1 >= 0 && maze[current[0] - 1][current[1]] === " ") {
        current[0] -= 1;
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
        movements.push("F");
        z = 0;
        if (current[1] - 1 >= 0 && maze[current[0]][current[1] - 1] === " ") {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[1],
              directions,
              [current[0], current[1] - 1],
              [...movements, "L", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
        if (
          current[1] + 1 < maze[0].length &&
          maze[current[0]][current[1] + 1] === " "
        ) {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[3],
              directions,
              [current[0], current[1] + 1],
              [...movements, "R", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
        if (
          current[0] + 1 < maze.length &&
          maze[current[0] + 1][current[1]] === " "
        ) {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[2],
              directions,
              [current[0] + 1, current[1]],
              [...movements, "B", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
      } else if (
        current[1] - 1 >= 0 &&
        maze[current[0]][current[1] - 1] === " "
      ) {
        current[1] -= 1;
        direction = directions[1];
        movements = [...movements, "L", "F"];
      } else if (
        current[1] + 1 < maze[0].length &&
        maze[current[0]][current[1] + 1] === " "
      ) {
        current[1] += 1;
        direction = directions[3];
        movements = [...movements, "R", "F"];
        z = 0;
      } else if (
        current[0] + 1 < maze.length &&
        maze[current[0] + 1][current[1]] === " "
      ) {
        current[0] += 1;
        direction = directions[2];
        movements = [...movements, "B", "F"];
        z = 0;
      }
    }
    if (
      current[0] >= 0 &&
      current[0] < maze.length &&
      current[1] >= 0 &&
      current[1] < maze[current[0]].length &&
      direction === ">"
    ) {
      if (maze[current[0]][current[1]] === " ") {
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
      }
      if (
        current[1] + 1 < maze[0].length &&
        maze[current[0]][current[1] + 1] === " "
      ) {
        current[1] += 1;
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
        movements.push("F");
        z = 0;
        if (current[0] - 1 >= 0 && maze[current[0] - 1][current[1]] === " ") {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[0],
              directions,
              [current[0] - 1, current[1]],
              [...movements, "L", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
        if (
          current[0] + 1 < maze[0].length &&
          maze[current[0] + 1][current[1]] === " "
        ) {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[2],
              directions,
              [current[0] + 1, current[1]],
              [...movements, "R", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
        if (current[1] - 1 >= 0 && maze[current[0]][current[1] - 1] === " ") {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[1],
              directions,
              [current[0], current[1] - 1],
              [...movements, "B", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
      } else if (
        current[0] - 1 >= 0 &&
        maze[current[0] - 1][current[1]] === " "
      ) {
        current[0] -= 1;
        direction = directions[0];
        movements = [...movements, "L", "F"];
      } else if (
        current[0] + 1 < maze.length &&
        maze[current[0] + 1][current[1]] === " "
      ) {
        current[0] += 1;
        direction = directions[2];
        movements = [...movements, "R", "F"];
        z = 0;
      } else if (
        current[1] - 1 >= 0 &&
        maze[current[0]][current[1] - 1] === " "
      ) {
        current[1] -= 1;
        direction = directions[1];
        movements = [...movements, "B", "F"];
        z = 0;
      }
    }
    if (
      current[0] >= 0 &&
      current[0] < maze.length &&
      current[1] >= 0 &&
      current[1] < maze[current[0]].length &&
      direction === "v"
    ) {
      // ! ["^", "<", "v", ">"]
      if (maze[current[0]][current[1]] === " ") {
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
      }
      if (
        current[0] + 1 < maze.length &&
        maze[current[0] + 1][current[1]] === " "
      ) {
        current[0] += 1;
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
        movements.push("F");
        z = 0;
        if (
          current[1] + 1 < maze[0].length &&
          maze[current[0]][current[1] + 1] === " "
        ) {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[3],
              directions,
              [current[0], current[1] + 1],
              [...movements, "L", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
        if (current[1] - 1 >= 0 && maze[current[0]][current[1] - 1] === " ") {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[2],
              directions,
              [current[0], current[1] - 1],
              [...movements, "R", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
        if (current[0] - 1 >= 0 && maze[current[0] - 1][current[1]] === " ") {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[0],
              directions,
              [current[0] - 1, current[1]],
              [...movements, "B", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
      } else if (
        current[1] + 1 < maze[0].length &&
        maze[current[0]][current[1] + 1] === " "
      ) {
        current[1] += 1;
        direction = directions[3];
        movements = [...movements, "L", "F"];
      } else if (
        current[1] - 1 >= 0 &&
        maze[current[0]][current[1] - 1] === " "
      ) {
        current[1] -= 1;
        direction = directions[2];
        movements = [...movements, "R", "F"];
        z = 0;
      } else if (
        current[0] - 1 >= 0 &&
        maze[current[0] - 1][current[1]] === " "
      ) {
        current[0] -= 1;
        direction = directions[0];
        movements = [...movements, "B", "F"];
        z = 0;
      }
    }
    if (
      current[0] >= 0 &&
      current[0] < maze.length &&
      current[1] >= 0 &&
      current[1] < maze[current[0]].length &&
      direction === "<"
    ) {
      // ! ["^", "<", "v", ">"]
      if (maze[current[0]][current[1]] === " ") {
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
      }
      if (current[1] - 1 >= 0 && maze[current[0]][current[1] - 1] === " ") {
        current[1] -= 1;
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
        movements.push("F");
        z = 0;
        if (
          current[0] + 1 < maze.length &&
          maze[current[0] + 1][current[1]] === " "
        ) {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[2],
              directions,
              [current[0] + 1, current[1]],
              [...movements, "L", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
        if (current[0] - 1 >= 0 && maze[current[0] - 1][current[1]] === " ") {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[0],
              directions,
              [current[0] - 1, current[1]],
              [...movements, "R", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
        if (
          current[1] + 1 < maze[0].length &&
          maze[current[0]][current[1] + 1] === " "
        ) {
          if (!(JSON.stringify(maze) in memo)) {
            const res: SomeType = handlingMaze(
              maze,
              directions[3],
              directions,
              [current[0], current[1] + 1],
              [...movements, "B", "F"],
              memo
            );
            if (res) {
              movements = res.movements;
              maze = res.maze;
              if (
                current[0] >= 0 &&
                current[0] < maze.length &&
                current[1] >= 0 &&
                current[1] < maze[current[0]].length
              )
                maze[current[0]][current[1]] = direction;
              memo[JSON.stringify(maze)] = movements;
              direction = res.direction;
              current = res.current;
            } else {
              memo[JSON.stringify(maze)] = true;
            }
          }
        }
      } else if (
        current[0] + 1 < maze.length &&
        maze[current[0] + 1][current[1]] === " "
      ) {
        current[0] += 1;
        direction = directions[2];
        movements = [...movements, "L", "F"];
      } else if (
        current[0] - 1 >= 0 &&
        maze[current[0] - 1][current[1]] === " "
      ) {
        current[0] -= 1;
        direction = directions[0];
        movements = [...movements, "R", "F"];
        z = 0;
      } else if (
        current[1] + 1 < maze[0].length &&
        maze[current[0]][current[1] + 1] === " "
      ) {
        current[1] += 1;
        direction = directions[3];
        movements = [...movements, "B", "F"];
        z = 0;
      }
    }
    z++;
  }
  return false;
}

function esc(
  maze: Array<Array<string>>,
  direction: "^" | "<" | "v" | ">" = "<",
  current: [number, number] = [0, 0],
  movements: Array<string> = [],
  memo: { [key: string]: Array<string> | boolean } = {}
): Array<Array<string>> {
  // Have a nice sleep ;)
  const directions: ["^", "<", "v", ">"] = ["^", "<", "v", ">"];
  var starters = ["^", "<", "v", ">"];

  for (var x = 0; x < maze.length; x++) {
    var y = -1;
    for (var i = 0; i < starters.length; i++) {
      y = maze[x].indexOf(starters[i]);
      if (y > -1) {
        current[0] = x;
        current[1] = y;
        break;
      }
    }
    if (y > -1) {
      current = [x, y];
      direction = maze[x][y] as typeof direction;
      break;
    }
  }
  console.log(current, direction);
  let z = 0;
  while (current !== [0, 0]) {
    if (!(JSON.stringify(maze) in memo)) {
      const res: SomeType = handlingMaze(
        maze,
        direction,
        directions,
        [current[0], current[1]],
        [...movements],
        memo
      );

      if (res) {
        movements = res.movements;
        maze = res.maze;
        direction = res.direction;
        current = res.current;
        if (
          current[0] >= 0 &&
          current[0] < maze.length &&
          current[1] >= 0 &&
          current[1] < maze[current[0]].length
        )
          maze[current[0]][current[1]] = direction;
        memo[JSON.stringify(maze)] = movements;
        if (checker(res.maze, res.current)) {
          return maze;
        } else {
          return maze;
        }
      } else {
        memo[JSON.stringify(maze)] = true;
      }
    }
    if (z > 3) {
      if (checker(maze, current)) {
        return maze;
      }
      console.log(
        `here`,
        maze.map((item) => item.join("")),
        current,
        direction
      );
      return maze;
    }

    z++;
  }
  return maze;
}

export { esc };