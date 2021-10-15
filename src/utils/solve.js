function checker(maze, from) {
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

const handleClick = (solvedMaze) => {
  //   solvedMaze=([...maze]);
  function handlingMaze(
    direction = "<",
    directions = ["^", "<", "v", ">"],
    from,
    movements = [],
    memo = {}
  ) {
    let z = 0;
    while (from !== [0, 0]) {
      if (z > 1) {
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
            solvedMaze = [...solvedMaze];
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
            solvedMaze = [...solvedMaze];
          }
          movements.push("F");
          z = 0;
          if (from[1] - 1 >= 0 && solvedMaze[from[0]][from[1] - 1] === " ") {
            if (!(JSON.stringify(solvedMaze) in memo)) {
              const res = handlingMaze(
                directions[1],
                directions,
                [from[0], from[1] - 1],
                [...movements, "L", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
              const res = handlingMaze(
                directions[3],
                directions,
                [from[0], from[1] + 1],
                [...movements, "R", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
              const res = handlingMaze(
                directions[2],
                directions,
                [from[0] + 1, from[1]],
                [...movements, "B", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
            solvedMaze = [...solvedMaze];
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
            solvedMaze = [...solvedMaze];
          }
          movements.push("F");
          z = 0;
          if (from[0] - 1 >= 0 && solvedMaze[from[0] - 1][from[1]] === " ") {
            if (!(JSON.stringify(solvedMaze) in memo)) {
              const res = handlingMaze(
                directions[0],
                directions,
                [from[0] - 1, from[1]],
                [...movements, "L", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
              const res = handlingMaze(
                directions[2],
                directions,
                [from[0] + 1, from[1]],
                [...movements, "R", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
              const res = handlingMaze(
                directions[1],
                directions,
                [from[0], from[1] - 1],
                [...movements, "B", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
            solvedMaze = [...solvedMaze];
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
            solvedMaze = [...solvedMaze];
          }
          movements.push("F");
          z = 0;
          if (
            from[1] + 1 < solvedMaze[0].length &&
            solvedMaze[from[0]][from[1] + 1] === " "
          ) {
            if (!(JSON.stringify(solvedMaze) in memo)) {
              const res = handlingMaze(
                directions[3],
                directions,
                [from[0], from[1] + 1],
                [...movements, "L", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
              const res = handlingMaze(
                directions[1],
                directions,
                [from[0], from[1] - 1],
                [...movements, "R", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
              const res = handlingMaze(
                directions[0],
                directions,
                [from[0] - 1, from[1]],
                [...movements, "B", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
            solvedMaze = [...solvedMaze];
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
            solvedMaze = [...solvedMaze];
          }
          movements.push("F");
          z = 0;
          if (
            from[0] + 1 < solvedMaze.length &&
            solvedMaze[from[0] + 1][from[1]] === " "
          ) {
            if (!(JSON.stringify(solvedMaze) in memo)) {
              const res = handlingMaze(
                directions[2],
                directions,
                [from[0] + 1, from[1]],
                [...movements, "L", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
              const res = handlingMaze(
                directions[0],
                directions,
                [from[0] - 1, from[1]],
                [...movements, "R", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
              const res = handlingMaze(
                directions[3],
                directions,
                [from[0], from[1] + 1],
                [...movements, "B", "F"],
                memo
              );
              if (res) {
                movements = res.movements;
                solvedMaze = [...res.maze];
                if (
                  from[0] >= 0 &&
                  from[0] < solvedMaze.length &&
                  from[1] >= 0 &&
                  from[1] < solvedMaze[from[0]].length
                ) {
                  solvedMaze[from[0]][from[1]] = direction;
                  solvedMaze = [...solvedMaze];
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
  let direction = "<";
  let from = [0, 0];
  let movements = [];
  let memo = {};
  // Have a nice sleep ;)
  const directions = ["^", "<", "v", ">"];

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
      direction = solvedMaze[x][y];
      break;
    }
  }
  let z = 0;
  while (from !== [0, 0]) {
    if (!(JSON.stringify(solvedMaze) in memo)) {
      const res = handlingMaze(
        direction,
        directions,
        [from[0], from[1]],
        [...movements],
        memo
      );
      if (res) {
        movements = res.movements;
        solvedMaze = res.maze;
        direction = res.direction;
        from = res.from;
        if (
          from[0] >= 0 &&
          from[0] < solvedMaze.length &&
          from[1] >= 0 &&
          from[1] < solvedMaze[from[0]].length
        )
          solvedMaze[from[0]][from[1]] = direction;
        memo[JSON.stringify(solvedMaze)] = movements;
        if (checker(res.maze, res.from)) {
          return movements;
        }
      } else {
        break;
      }
    }
    if (z > 1) {
      if (checker(solvedMaze, from)) {
        return movements;
      }
      return [];
    }

    z++;
  }
  return movements;
};

export { handleClick as printMovements };
