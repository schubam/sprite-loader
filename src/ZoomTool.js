import React from "react";
const ZoomTool = ({ scale, dispatch }) => (
  <div>
    {/* <label>Zoom:</label>
    <input
      type="number"
      min={1}
      max={20}
      step={1}
      onChange={dispatch}
      value={scale}
    /> */}
    <label>Zoom:</label>
    <select onChange={dispatch}>
      <option value="1.0">100%</option>
      <option value="1.25">125%</option>
      <option value="1.50">150%</option>
      <option value="2.00">200%</option>
      <option value="3.00">300%</option>
      <option value="4.00">400%</option>
      <option value="5.00">500%</option>
    </select>
  </div>
);

export default ZoomTool;
