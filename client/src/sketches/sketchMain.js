import "p5/lib/addons/p5.dom";
import ml5 from "ml5";

export default function sketch(p) {
  let video;
  let poseNet;

  let poses = [];

  p.setup = function() {
    p.createCanvas(350, 400);
    video = p.createCapture(p.VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on("pose", gotPoses);
  };

  function gotPoses(pose) {
    poses = pose;
  }

  function modelReady() {}

  p.draw = function() {
    p.background(255);
    p.image(video, 0, 0);

    drawSkeleton(poses);
    drawKeypoints(poses);
  };

  function drawKeypoints() {
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {
          p.fill(105, 190, 255);
          p.stroke(105, 190, 255);
          p.strokeWeight(2);
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

        p.stroke(244, 131, 164);
        p.strokeWeight(5);
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
