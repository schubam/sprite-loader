import React from "react";

const zoomLevels = [
  [1.0, "1x"],
  [2.0, "2x"],
  [3.0, "3x"],
  [4.0, "4x"],
  [5.0, "5x"],
  [6.0, "6x"],
  [7.0, "7x"],
  [8.0, "8x"],
  [9.0, "9x"],
  [10.0, "10x"]
];

const ZoomTool = ({ scale, dispatch }) => (
  <div>
    <label>Zoom:</label>
    <select onChange={dispatch} defaultValue={scale}>
      {zoomLevels.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export default ZoomTool;
