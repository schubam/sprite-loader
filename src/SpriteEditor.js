import React from "react";
import PictureCanvas from "./PictureCanvas";

function elt(type, props, ...children) {
  const dom = document.createElement(type);
  if (props) {
    Object.assign(dom, props);
  }
  for (let child of children) {
    if (typeof child != "string") {
      dom.appendChild(child);
    } else {
      dom.appendChild(document.createTextNode(child));
    }
  }
  return dom;
}

function pictureFromImage(image) {
  let width = Math.min(100, image.width);
  let height = Math.min(100, image.height);
  let canvas = elt("canvas", { width, height });
  let context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
}

function finishLoad(file, dispatch) {
  if (file == null) return;

  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let image = elt("img", {
      onload: () => dispatch({ picture: image }),
      src: reader.result
    });
  });
  reader.readAsDataURL(file);
}

const LoadButton = ({ dispatch }) => (
  <input
    type="file"
    onChange={e => finishLoad(e.target.files[0], dispatch)}
    label="📁 Load"
  />
);

class SpriteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
    this.setImage = this.setImage.bind(this);
  }

  setImage(action) {
    this.setState(() => {
      return { image: action.picture };
    });
  }

  render() {
    return (
      <div>
        <PictureCanvas width={640} height={480} image={this.state.image} />
        <LoadButton dispatch={this.setImage} />
      </div>
    );
  }
}

export default SpriteEditor;
