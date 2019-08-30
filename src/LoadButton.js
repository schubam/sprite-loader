import React from "react";
import Picture from "./picture";

function pictureFromImage(image) {
  let width = image.width;
  let height = image.height;
  let canvas = document.createElement("canvas");
  Object.assign(canvas, { width, height });
  let context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  let pixels = [];
  let { data } = context.getImageData(0, 0, width, height);

  function hex(n) {
    return n.toString(16).padStart(2, "0");
  }

  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b] = data.slice(i, i + 3);
    pixels.push("#" + hex(r) + hex(g) + hex(b));
  }
  return new Picture(width, height, pixels);
}

function finishLoad(file, dispatch) {
  if (file == null) return;
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let image = document.createElement("img");
    Object.assign(image, {
      onload: () =>
        dispatch({ image: image, picture: pictureFromImage(image) }),
      src: reader.result
    });
  });
  reader.readAsDataURL(file);
}

const LoadButton = ({ dispatch }) => (
  <input
    type="file"
    onChange={e => finishLoad(e.target.files[0], dispatch)}
    accept="image/png, image/jpeg"
  />
);

export default LoadButton;
