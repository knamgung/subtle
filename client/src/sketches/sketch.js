import "p5/lib/addons/p5.dom";
import ml5 from "ml5";
import P5Wrapper from "react-p5-wrapper";
import loading from "../assets/gifs/subtle-analyzing.gif";

import React, { Component } from "react";

let pictures = null;

export default class Sketch extends Component {
  newPicHandler = pics => {
    if (pics !== null) {
      this.props.sketchedImage(pics, this.props.history);
    }
  };

  render() {
    const { pics } = this.props;
    pictures = pics;
    return (
      <div className="process">
        {pictures !== null ? (
          <div className="process__div">
            <img className="process__gif" src={loading} alt="loading-gif"></img>
            <P5Wrapper
              sketch={sketch}
              newPicHandler={this.newPicHandler}
            ></P5Wrapper>
          </div>
        ) : (
          <h5>Nothings Being Analyzed</h5>
        )}
      </div>
    );
  }
}

function sketch(p) {
  let img;
  let poseNet;
  let shot;
  let face = ["leftEar", "rightEar", "nose", "leftEye", "rightEye"];
  let upper = ["leftShoulder", "rightShoulder"];
  let lower = ["leftKnee", "rightKnee", "leftAnkle", "rightAnkle"];
  let mid = ["leftHip", "rightHip"];
  let filteredPose = [];

  let poses = [];
  let pics = [];

  let i = 0;
  let newPicHandler;

  p.setup = function() {
    pics = pictures;

    if (i < pics.length) {
      img = p.createImg(pics[i].imgSrc, poseReady);
      img.hide();
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.newPicHandler !== null) {
      newPicHandler = props.newPicHandler;
    }
  };

  function poseReady() {
    poseNet = ml5.poseNet(modelReady);
    poseNet.on("pose", pose => {
      poses = pose;

      filterShot();
    });
  }

  function modelReady() {
    if (img !== undefined) {
      poseNet.singlePose(img);
    }
  }

  p.draw = function() {
    p.background(255);

    if (poses.length > 0 && i < pics.length) {
      i++;

      if (i === pics.length) {
        newPicHandler(pics);
      } else {
        p.remove();
        p.setup();
        p.noLoop();
      }
    }
  };

  function filterShot() {
    shot = { face: false, upper: false, lower: false, mid: false };
    filteredPose = poses[0].pose.keypoints.filter(pose => {
      return pose.score > 0.5;
    });

    for (let j = 0; j < filteredPose.length; j++) {
      if (face.indexOf(filteredPose[j].part) > -1) {
        shot.face = true;
      } else if (upper.indexOf(filteredPose[j].part) > -1) {
        shot.upper = true;
      } else if (lower.indexOf(filteredPose[j].part) > -1) {
        shot.lower = true;
      } else if (mid.indexOf(filteredPose[j].part) > -1) {
        shot.mid = true;
      }
    }
    whichShot(shot);
  }

  function whichShot() {
    if (shot.face) {
      if (shot.upper && shot.lower && shot.mid) {
        pics[i].result = "Full Body";
        pics[i].resultValue = "fullBody";
      } else if (shot.upper) {
        pics[i].result = "Upper Body";
        pics[i].resultValue = "upperBody";
      } else {
        pics[i].result = "Face Shot";
        pics[i].resultValue = "faceShot";
      }
    } else if (shot.upper) {
      if (shot.mid && shot.lower) {
        pics[i].result = "Faceless Full Body";
        pics[i].resultValue = "facelessFullBody";
      } else {
        pics[i].result = "Mid Body";
        pics[i].resultValue = "midBody";
      }
    } else if (shot.lower) {
      pics[i].result = "Lower Body";
      pics[i].resultValue = "lowerBody";
    } else {
      pics[i].result = "Undetectable";
      pics[i].resultValue = "undetect";
    }

    p.redraw();
  }
}
