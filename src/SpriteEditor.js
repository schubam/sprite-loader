import React from "react";
import PictureCanvas from "./PictureCanvas";
import LoadButton from "./LoadButton";
import Picture from "./picture";
import ZoomTool from "./ZoomTool";

const initialState = {
  picture: Picture.empty(160, 160, "#f0f0f0"),
  scale: 4.0
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
    this.setState({ picture: action.picture });
  }

  render() {
    return (
      <>
        <div>
          <LoadButton dispatch={this.setImageData} />
          <ZoomTool scale={this.state.scale} dispatch={this.changeScale} />
        </div>
        <div>
          <PictureCanvas
            picture={this.state.picture}
            scale={this.state.scale}
          />
        </div>
      </>
    );
  }
}

export default SpriteEditor;
