import React from "react";
import { mazes } from "../../data/mazes";
import Draw from "./draw";

const mazeArray: string[][][] = mazes.map((maze) =>
  maze.map((row) => row.split(""))
);
function Maze() {
  const [mazes] = React.useState(mazeArray);
  return (
    <div
      className="center"
      style={{ gap: "10px", flexDirection: "column", padding: "2rem" }}
    >
      {mazes.map((item, i) => (
        <div
          key={i * 211}
          className="center"
          style={{
            gap: "10px",
            flexDirection: "column",
            alignItems: `flex-start`,
          }}
        >
          <Draw maze={item} i={i} />
        </div>
      ))}
    </div>
  );
}

export default Maze;
