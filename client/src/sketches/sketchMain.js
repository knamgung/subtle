import p5 from "p5";
import "p5/lib/addons/p5.dom";
import ml5 from "ml5";

export default function sketch(p) {
  let video;
  let poseNet;
  //   let shot;
  //   let face = ["leftEar", "rightEar", "nose", "leftEye", "rightEye"];
  //   let upper = ["leftShoulder", "rightShoulder"];
  //   let lower = ["leftKnee", "rightKnee", "leftAnkle", "rightAnkle"];
  //   let mid = ["leftHip", "rightHip"];
  //   let filteredPose = [];
  //   let whatShot;
  let poses = [];
  let pics = [];

  p.setup = function() {
    p.createCanvas(350, 400);
    video = p.createCapture(p.VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on("pose", gotPoses);
  };

  function gotPoses(pose) {
    console.log(pose);
    poses = pose;
  }

  function modelReady() {
    console.log("moodelReady");
  }

  p.draw = function() {
    p.background(255);
    p.image(video, -125, 0);

    drawSkeleton(poses);
    drawKeypoints(poses);
  };

  // function filterShot() {
  //   console.log("CHECK", poses, i);
  //   shot = { face: false, upper: false, lower: false, mid: false };
  //   filteredPose = poses[0].pose.keypoints.filter(pose => {
  //     return pose.score > 0.5;
  //   });
  //   console.log(`filteredPose`, filteredPose);
  //   for (let j = 0; j < filteredPose.length; j++) {
  //     if (face.indexOf(filteredPose[j].part) > -1) {
  //       shot.face = true;
  //     } else if (upper.indexOf(filteredPose[j].part) > -1) {
  //       shot.upper = true;
  //     } else if (lower.indexOf(filteredPose[j].part) > -1) {
  //       shot.lower = true;
  //     } else if (mid.indexOf(filteredPose[j].part) > -1) {
  //       shot.mid = true;
  //     }
  //   }
  //   whichShot(shot);
  // }

  // function whichShot() {
  //   console.log("whats pooshing", pics, shot, i);

  //   if (shot.face) {
  //     if (shot.upper && shot.lower && shot.mid) {
  //       whatShot = "Full Body";
  //       pics[i].result = "Full Body";
  //       pics[i].resultValue = "fullBody";
  //     } else if (shot.upper) {
  //       whatShot = "Upper Body";
  //       pics[i].result = "Upper Body";
  //       pics[i].resultValue = "upperBody";
  //     } else {
  //       whatShot = "Face Shot";
  //       pics[i].result = "Face Shot";
  //       pics[i].resultValue = "faceShot";
  //     }
  //   } else if (shot.upper) {
  //     if (shot.mid && shot.lower) {
  //       whatShot = "Faceless Full Body";
  //       pics[i].result = "Faceless Full Body";
  //       pics[i].resultValue = "facelessFullBody";
  //     } else {
  //       whatShot = "Mid Body";
  //       pics[i].result = "Mid Body";
  //       pics[i].resultValue = "midBody";
  //     }
  //   } else if (shot.lower) {
  //     whatShot = "Lower Body";
  //     pics[i].result = "Lower Body";
  //     pics[i].resultValue = "lowerBody";
  //   } else {
  //     whatShot = "Undetectable";
  //     pics[i].result = "Undetectable";
  //     pics[i].resultValue = "undetect";
  //   }

  //   console.log("Updated", pics, shot);
  //   p.redraw();
  // }

  function drawKeypoints() {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        let keypoint = pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2) {
          p.fill(255);
          p.stroke(20);
          p.strokeWeight(4);
          p.ellipse(
            p.round(keypoint.position.x - 125),
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
          partA.position.x - 125,
          partA.position.y,
          partB.position.x - 125,
          partB.position.y
        );
      }
    }
  }
}
