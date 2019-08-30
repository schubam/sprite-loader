import React from "react";
import PictureCanvas from "./PictureCanvas";
import LoadButton from "./LoadButton";
import ScalingPictureCanvas from "./ScalingPictureCanvas";
import Picture from "./picture";
import ZoomTool from "./ZoomTool";

const initialState = {
  image: null,
  picture: Picture.empty(100, 100, "#f0f0f0"),
  scale: 1.00
};

class SpriteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.setImageData = this.setImageData.bind(this);
    this.changeScale = this.changeScale.bind(this);
  }

  changeScale(e) {
    this.setState({ scale: parseFloat(e.target.value) });
  }

  setImageData(action) {
    this.setState({
      image: action.image,
      picture: action.picture
    });
  }

  render() {
    return (
      <div>
        <ZoomTool scale={this.state.scale} dispatch={this.changeScale} />
        <br />
        {this.state.image && <PictureCanvas image={this.state.image} />}
        <br />
        {this.state.picture && (
          <ScalingPictureCanvas
            picture={this.state.picture}
            scale={this.state.scale}
          />
        )}
        <br />
        <LoadButton dispatch={this.setImageData} />
      </div>
    );
  }
}

export default SpriteEditor;
