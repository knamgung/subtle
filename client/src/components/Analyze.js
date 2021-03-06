import React, { Component } from "react";
import ImageUploader from "react-images-upload";

export default class Analyze extends Component {
  state = {
    pictures: [],
    load: false
  };

  onDrop = pictures => {
    let newPictures = [];

    this.setState({
      load: true
    });

    pictures.forEach((picture, index) => {
      var reader = new FileReader();
      reader.onloadend = function() {
        let newImage = {
          imgSrc: reader.result
        };
        newPictures.push(newImage);
        this.setState(
          {
            pictures: newPictures
          },
          () => {
            this.props.sketchThis(this.state.pictures);
          }
        );
      }.bind(this);

      this.setState({
        load: false
      });

      reader.readAsDataURL(picture);
    });
  };
  render() {
    const { pictures, load } = this.state;
    const { startAnalyzing } = this.props;

    return (
      <div className="analyze">
        <div className="analyze__title">
          <h1 className="analyze__header">Upload Photos</h1>
          <p className="analyze__desc">upload your photos here</p>
        </div>
        <div className="upload">
          <div className="upload__button">
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={this.onDrop.bind(this)}
              imgExtension={[".jpg", ".jpeg", ".png"]}
              label={".jpg | .jpeg | .png"}
              maxFileSize={5242880}
            />
          </div>
        </div>

        {load === true ? (
          <h5>Wait</h5>
        ) : (
          <PhotoSet pictures={pictures}></PhotoSet>
        )}

        {pictures.length > 0 ? (
          <div className="analyze__start">
            <button className="analyze__start--cta" onClick={startAnalyzing}>
              start!
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

class PhotoSet extends Component {
  render() {
    let { pictures } = this.props;
    let renderPhoto = pictures.map((pic, i) => {
      return (
        <div
          className="photo__card"
          key={i}
          style={{
            backgroundImage: `url(${pic.imgSrc})`
          }}
        ></div>
      );
    });

    return <div className="photo">{renderPhoto}</div>;
  }
}
