import React from "react";

class PictureCanvas extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    this.refs.canvas.width = this.props.image.width;
    this.refs.canvas.height = this.props.image.height;
    ctx.clearRect(0, 0, this.props.image.width, this.props.image.height);
    ctx.drawImage(this.props.image, 0, 0);
  }

  render() {
    return <canvas ref="canvas"></canvas>;
  }
}

export default PictureCanvas;
