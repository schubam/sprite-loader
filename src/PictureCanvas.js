import React from "react";

class PictureCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.props.width, this.props.height);
    if (this.props.image) ctx.drawImage(this.props.image, 0, 0);
    // ctx.fillRect(0, 0, 23, 25);
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
      ></canvas>
    );
  }
}

export default PictureCanvas;
