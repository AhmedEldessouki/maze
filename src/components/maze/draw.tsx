import React from "react";
import { esc } from "../../utils/solve";
import "./draw.css";

function Draw({ maze, i }: { maze: Array<Array<string>>; i: number }) {
  const [solvedMaze, setSolvedMaze] = React.useState(maze);
  const handleClick = () => {
    setSolvedMaze([...esc(solvedMaze)]);
  };
  return (
    <div className="center" style={{ width: "500px", flexDirection: "column" }}>
      <div className="center" style={{ flexDirection: "row", gap: "20px" }}>
        <h1>Maze {i + 1}</h1>
        <button
          type="button"
          style={{
            padding: "10px 15px",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={handleClick}
        >
          Solve
        </button>
      </div>
      <div className="center" style={{ flexDirection: "row" }}>
        {solvedMaze.map((row, r) => (
          <div
            className="center"
            style={{ maxWidth: "500px", flexDirection: "column" }}
          >
            {row.map((col, c) => {
              return col === "#" ? (
                <div className="size wall"></div>
              ) : col === " " ? (
                <div className="size space"></div>
              ) : (
                <div className="size other">{col}</div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Draw;
