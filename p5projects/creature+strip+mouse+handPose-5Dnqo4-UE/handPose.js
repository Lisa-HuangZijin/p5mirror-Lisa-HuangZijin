//问题是有的时候video会把creature盖住
let video;
let handPose;
let hands = [];
let smoothedZ = 0;
let indexX,indexY

function preload(){
  handPose = ml5.handPose({ flipped: true }); 
}

function setuphandPose(){
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  //video.position(120, windowHeight + 120);
  handPose.detectStart(video, gotHands);
}

function gotHands(results) {
  hands = results;
}

function drawhandPose() {
  
  // Flip & display the video
  // push();
  // translate(-width / 2, -height / 2);
  // scale(-1, 1);
  // image(video, -video.width, 0); // Flipped display
  // pop();
  // push()
  // translate(0,0,-200)
 push();
  translate(-width/2, -height/2); // Top-left corner

  push();
  translate(width, 0); // Move to the right edge
  scale(-1, 1);        // Flip horizontally
  image(video, 0, 0, width, height); // Draw flipped
  pop();

  pop();
  //pop()


  ambientLight(100);
  directionalLight(255, 255, 255, 0, 0, -1);

  // Draw hand keypoints and a sphere at the right index fingertip (3D)
  //let windowheight=windowWidth/640*480
for (let hand of hands) {
  if (hand.confidence > 0.1) {
    for (let i = 0; i < hand.keypoints.length; i++) {
      let keypoint = hand.keypoints[i];
      
      let x = map(keypoint.x, 0, video.width, -windowWidth / 2, windowWidth / 2);
      let y = map(keypoint.y, 0, video.height, -windowHeight / 2, windowHeight  / 2);
      if(i==8){
        indexX=map(keypoint.x, 0, video.width, -windowWidth / 2, windowWidth / 2);
        indexY=map(keypoint.y, 0, video.height, -windowHeight / 2, windowHeight  / 2);
      }

      push();
      translate(x, y, 0); 
      if (hand.handedness === "Left") {
        fill(255, 100, 255);
      } else {
        fill(255, 255, 255);
      }
      noStroke();
      ellipse(0, 0, 16);
      pop();
    }
  }
}


}