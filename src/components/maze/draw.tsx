import React from "react";
import "./draw.css";
function Draw({ maze }: { maze: Array<Array<string>> }) {
  return (
    <div className="center" style={{ width: "500px", flexDirection: "row" }}>
      {maze.map((row) => (
        <div
          className="center"
          style={{ maxWidth: "500px", flexDirection: "column" }}
        >
          {row.map((col) => {
            return col === "#" ? (
              <div className="size wall"></div>
            ) : col === " " ? (
              <div className="size space"></div>
            ) : (
              <div className="size">{col}</div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Draw;
