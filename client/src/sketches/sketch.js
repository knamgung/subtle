import p5 from "p5";
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
      <div>
        {pictures !== null ? (
          <div>
            <img src={loading}></img>
            <P5Wrapper
              sketch={sketch}
              newPicHandler={this.newPicHandler}
            ></P5Wrapper>
          </div>
        ) : (
          <h5>Loading</h5>
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
  let upper = ["leftShoulder", "rightShoulder", "leftHip", "rightHip"];
  let lower = ["leftKnee", "rightKnee", "leftAnkle", "rightAnkle"];
  let filteredPose = [];
  let whatShot;
  let poses = [];
  let pics = [];
  let results = [];
  let i = 0;
  let newPicHandler;

  p.setup = function() {
    pics = pictures;
    p.createCanvas(800, 800);

    if (i < pics.length) {
      console.log("PICS", i);
      img = p.createImg(pics[i].imgSrc, poseReady);
      img.hide();
    }
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.newPicHandler !== null) {
      console.log("sadsads", props);
      newPicHandler = props.newPicHandler;
    }
  };

  function poseReady() {
    p.resizeCanvas(img.width, img.height, true);
    poseNet = ml5.poseNet(modelReady);
    poseNet.on("pose", pose => {
      poses = pose;
      console.log("poses", poses, i);
      filterShot();
    });
  }

  function modelReady() {
    if (img !== undefined) {
      poseNet.singlePose(img);
      console.log("moodelReady", i);
    }
  }

  p.draw = function() {
    p.background(255);

    if (poses.length > 0 && i < pics.length) {
      console.log(`Whats I in Draw`, i);

      // drawSkeleton(poses);
      // drawKeypoints(poses);
      // p.text(whatShot, 40, 50);
      i++;
      console.log("Reach 3?", i);
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
    console.log("CHECK", poses, i);
    shot = { face: false, upper: false, lower: false };
    filteredPose = poses[0].pose.keypoints.filter(pose => {
      return pose.score > 0.92;
    });
    console.log(`filteredPose`, filteredPose);
    for (let j = 0; j < filteredPose.length; j++) {
      if (face.indexOf(filteredPose[j].part) > -1) {
        shot.face = true;
      } else if (upper.indexOf(filteredPose[j].part) > -1) {
        shot.upper = true;
      } else if (lower.indexOf(filteredPose[j].part) > -1) {
        shot.lower = true;
      }
    }
    whichShot(shot);
  }

  function whichShot() {
    console.log("whats pooshing", pics, shot, i);

    if (shot.face) {
      if (shot.upper && shot.lower) {
        whatShot = "Full Body";
        pics[i].result = "Full Body";
      } else if (shot.upper) {
        whatShot = "Upper Body";
        pics[i].result = "Upper Body";
      } else {
        whatShot = "Face Shot";
        pics[i].result = "Face Shot";
      }
    } else if (shot.upper) {
      if (shot.lower) {
        whatShot = "Faceless Full Body";
        pics[i].result = "Faceless Full Body";
      } else {
        whatShot = "Mid Body";
        pics[i].result = "Mid Body";
      }
    } else {
      whatShot = "Lower Body";
      pics[i].result = "Lower Body";
    }

    console.log("Updated", pics, shot);
    p.redraw();
  }

  function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        let keypoint = pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.6) {
          p.fill(255);
          p.stroke(20);
          p.strokeWeight(4);
          p.ellipse(
            p.round(keypoint.position.x),
            p.round(keypoint.position.y),
            8,
            8
          );
        }
      }
    }
  }
  // A function to draw the skeletons
  function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
      let skeleton = poses[i].skeleton;
      // For every skeleton, loop through all body connections
      for (let j = 0; j < skeleton.length; j++) {
        let partA = skeleton[j][0];
        let partB = skeleton[j][1];
        p.stroke(0);
        p.strokeWeight(15);
        p.line(
          partA.position.x,
          partA.position.y,
          partB.position.x,
          partB.position.y
        );
      }
    }
  }
}
