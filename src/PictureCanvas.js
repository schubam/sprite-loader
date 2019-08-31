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

class PictureCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridPos: null
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(e) {
    const rect = this.refs.canvas.getBoundingClientRect();
    const pos = {
      x: Math.floor((e.clientX - rect.left) / this.props.scale),
      y: Math.floor((e.clientY - rect.top) / this.props.scale)
    };

    const gridPos = findRect(pos, this.props.scale);
    this.setState({ gridPos });
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    drawPicture(this.props.picture, this.refs.canvas, this.props.scale);
    if (this.state.gridPos) {
      drawCurrentGridPos(
        this.refs.canvas,
        this.state.gridPos,
        this.props.scale
      );
    }
  }

  render() {
    return <canvas ref="canvas" onMouseMove={this.handleMouseMove}></canvas>;
  }
}

export default PictureCanvas;
