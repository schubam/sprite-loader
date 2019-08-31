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

function drawGrid(canvas, w, h) {
  const context = canvas.getContext("2d");
  context.strokeStyle = "magenta";
  context.lineWidth = 1;
  context.strokeRect(0, 0, w, h);
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
  let [background, setBackground] = useState();
  let [grid, setGrid] = useState();

  useEffect(() => {
    const handler = e => {
      const rect = canvas.current.getBoundingClientRect();
      const p = {
        x: Math.floor((e.clientX - rect.left) / scale),
        y: Math.floor((e.clientY - rect.top) / scale)
      };

      const gridPos = findRect(p, scale);
      if (!pos) {
        setPos(gridPos);
      } else if (pos.x !== gridPos.x || pos.y !== gridPos.y) {
        setPos(gridPos);
      }
    };
    canvas.current.addEventListener("mousemove", handler);

    return () => {
      canvas.current.removeEventListener("mousemove", handler);
    };
  });

  useEffect(() => {
    canvas.current.width = picture.width * scale;
    canvas.current.height = picture.height * scale;

    const buffer = document.createElement("canvas");
    buffer.width = canvas.current.width;
    buffer.height = canvas.current.height;

    drawPicture(picture, buffer, scale);
    setBackground(buffer);
  }, [picture, scale]);

  useEffect(() => {
    const buffer = document.createElement("canvas");
    const w = 16 * scale;
    const h = 16 * scale;
    buffer.width = w;
    buffer.height = h;

    drawGrid(buffer, w, h);
    setGrid(buffer);
  }, [scale]);

  useEffect(() => {
    if (background) {
      const context = canvas.current.getContext("2d");
      context.drawImage(background, 0, 0);
    }
    if (pos && grid) {
      const context = canvas.current.getContext("2d");
      const { x, y, w, h } = pos;
      context.drawImage(grid, x * w, y * h);
    }
  }, [grid, pos, background]);

  return <canvas ref={canvas}></canvas>;
};

export default PictureCanvas;
