import React from "react";

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

class PictureCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver(e) {
    const rect = this.refs.canvas.getBoundingClientRect();
    const retval = {
      x: Math.floor((e.clientX - rect.left) / this.props.scale),
      y: Math.floor((e.clientY - rect.top) / this.props.scale)
    };
    console.log(retval);
    return retval;
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    this.refs.canvas.width = this.props.picture.width * this.props.scale;
    this.refs.canvas.height = this.props.picture.height * this.props.scale;
    ctx.clearRect(0, 0, this.props.picture.width, this.props.picture.height);
    drawPicture(this.props.picture, this.refs.canvas, this.props.scale);
  }

  render() {
    return <canvas ref="canvas" onMouseOver={this.handleMouseOver}></canvas>;
  }
}

export default PictureCanvas;
