import React from "react";
import { mazes } from "../../data/mazes";
import { esc } from "../../utils/solve";
import Draw from "./draw";

const mazeArray: string[][][] = mazes.map((maze) =>
  maze.map((row) => row.split(""))
);
function Maze() {
  const [mazes, setMazes] = React.useState(mazeArray);
  return (
    <div className="center" style={{ gap: "10px", flexDirection: "column" }}>
      {mazes.map((item, i) => (
        <div
          className="center"
          style={{ gap: "10px", flexDirection: "column" }}
        >
          <Draw maze={item} i={i} />
        </div>
      ))}
    </div>
  );
}

export default Maze;
