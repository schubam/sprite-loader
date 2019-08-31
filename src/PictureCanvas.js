import React, { useState, useEffect, useRef } from "react";

function drawPicture(picture, canvas, scale) {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  const context = canvas.getContext("2d");
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      context.fillStyle = picture.pixel(x, y);
      context.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

function drawCurrentGridPos(canvas, { x, y, w, h }, scale) {
  const context = canvas.getContext("2d");
  context.strokeStyle = "magenta";
  context.lineWidth = 1;
  context.strokeRect(x * w, y * h, w, h);
}

function findRect(pos, scale) {
  const w = 16 * scale;
  const h = 16 * scale;
  const x = Math.floor((pos.x * scale) / w);
  const y = Math.floor((pos.y * scale) / h);
  return { x, y, w, h };
}

const PictureCanvas = ({ scale, picture }) => {
  const canvas = useRef(null);
  let [pos, setPos] = useState();

  useEffect(() => {
    const handler = e => {
      const rect = canvas.current.getBoundingClientRect();
      const p = {
        x: Math.floor((e.clientX - rect.left) / scale),
        y: Math.floor((e.clientY - rect.top) / scale)
      };

      const gridPos = findRect(p, scale);
      setPos(gridPos);
    };
    canvas.current.addEventListener("mousemove", handler);

    return () => {
      canvas.current.removeEventListener("mousemove", handler);
    };
  });

  useEffect(() => {
    drawPicture(picture, canvas.current, scale);
    if (pos) {
      drawCurrentGridPos(canvas.current, pos, scale);
    }
  });

  return <canvas ref={canvas}></canvas>;
};

export default PictureCanvas;
