let video;
let handPose;
let hands = [];
let smoothedZ = 0;

function preload() {
  handPose = ml5.handPose({ flipped: true }); 
}

function setup() {
  createCanvas(640, 480, WEBGL); 
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function gotHands(results) {
  hands = results;
}

function draw() {
  background(0);
  

  // Flip & display the video
  push();
  translate(-width / 2, -height / 2);
  scale(-1, 1);
  image(video, -video.width, 0); // Flipped display
  pop();

  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);

  // Draw hand keypoints and a sphere at the right index fingertip (3D)
  for (let hand of hands) {
    if (hand.confidence > 0.1) {
      for (let i = 0; i < hand.keypoints.length; i++) {
        let keypoint = hand.keypoints[i];
        let x = -keypoint.x + width / 2;
        let y = keypoint.y - height / 2;

        push();
        translate(-x, y, 0); 
        if (hand.handedness === "Left") {
          fill(255, 0, 255);
        } else {
          fill(255, 255, 0);
        }
        noStroke();
        ellipse(0, 0, 16);
        pop();
      }
    }
      if (hand.handedness === "Right" && hand.keypoints3D) {
  let pt = hand.keypoints3D[8];
  // Smooth Z value over time
  smoothedZ = lerp(smoothedZ, pt.z, 0.5); // adjust 0.1 to be smoother (lower = smoother)

  // Scale and flip for canvas
  let scaleFactor = 500;
  let sx = -pt.x * scaleFactor;
  let sy = -pt.y * scaleFactor;
  let sz = -pt.z * scaleFactor;

  // Map smoothed Z to sphere size
  let sphereSize = map(smoothedZ, -0.01, -0.04, 10, 80);
  sphereSize = constrain(sphereSize, 10, 80);
  push();
  translate(hand.keypoints[8].x, hand.keypoints[8].y, 0);
  fill(0, 255, 255);
  noStroke();
  sphere(sphereSize)
  pop();
        //console.log(pt.z)
  }
}

}

for (let hand of hands) {
  if (hand.confidence > 0.1) {
    for (let i = 0; i < hand.keypoints.length; i++) {
      let keypoint = hand.keypoints[i];
      
      let x = map(keypoint.x, 0, video.width, -width / 2, width / 2);
      let y = map(keypoint.y, 0, video.height, -height / 2, height / 2);

      push();
      translate(x, y, 0); 
      if (hand.handedness === "Left") {
        fill(255, 0, 255);
      } else {
        fill(255, 255, 0);
      }
      noStroke();
      ellipse(0, 0, 16);
      pop();
    }
  }
}

