import React, { Component } from "react";
import ImageUploader from "react-images-upload";

export default class Analyze extends Component {
  state = {
    pictures: [],
    load: false
  };

  onDrop = pictures => {
    console.log(pictures);
    let newPictures = [];
    let picProcessed = 0;
    this.setState({
      load: true
    });

    pictures.forEach((picture, index) => {
      console.log(picProcessed, pictures.length);
      var reader = new FileReader();
      reader.onloadend = function() {
        let newImage = {
          image: picture,
          imgSrc: reader.result
        };
        newPictures.push(newImage);
        this.setState(
          {
            pictures: newPictures,
            load: false
          },
          () => {
            this.props.sketchThis(this.state.pictures);
          }
        );
      }.bind(this);

      reader.readAsDataURL(picture);
    });
  };
  render() {
    const { pictures, load } = this.state;

    return (
      <div className="analyze">
        <div>
          <h1>Upload Photos</h1>
          <p>upload your photos here</p>
        </div>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={this.onDrop.bind(this)}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
        />
        {load === true ? (
          <h5>Wait</h5>
        ) : (
          <PhotoSet pictures={pictures}></PhotoSet>
        )}
      </div>
    );
  }
}

const PhotoSet = ({ pictures }) => {
  console.log(pictures);
  let renderPhoto = pictures.map(pic => {
    console.log(pic);
    return (
      <div
        className="photo__card"
        style={{
          backgroundImage: `url(${pic.imgSrc})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
    );
  });

  return <div className="photo">{renderPhoto}</div>;
};
