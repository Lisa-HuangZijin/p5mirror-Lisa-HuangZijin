//问题是有的时候video会把creature盖住
let video;
let handPose;
let hands = [];
let smoothedZ = 0;
let indexX, indexY;
let handsNotDetect=true

function preload() {
  handPose = ml5.handPose({ flipped: true });
  myFont = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
  //mainFont = loadFont("Titillium+Web.ttf");
}

function setuphandPose() {
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  //video.position(120, windowHeight + 120);
  handPose.detectStart(video, gotHands);
  textFont(myFont);
}

function gotHands(results) {
  hands = results;

  if (hands.length > 0 && hands[0].confidence > 0.1) {
    lastHandTime = millis(); // ⏱️ store the current timestamp
  }
}


function drawhandPose() {
  push();
  translate(-width / 2, -height / 2); // Top-left corner
  push();
  translate(width, 0); // Move to the right edge
  scale(-1, 1); // Flip horizontally
  tint(0, 0, 255, 10);
  image(video, 0, 0, width, height); // Draw flipped
  noTint();
  pop();
  noStroke();
  fill(0, 0, 0, 0.5);
  rect(0, 0, windowWidth, windowHeight);
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

        let x = map(
          keypoint.x,
          0,
          video.width,
          -windowWidth / 2,
          windowWidth / 2
        );
        let y = map(
          keypoint.y,
          0,
          video.height,
          -windowHeight / 2,
          windowHeight / 2
        );
        if (i == 8) {
          indexX = map(
            keypoint.x,
            0,
            video.width,
            -windowWidth / 2,
            windowWidth / 2
          );
          indexY = map(
            keypoint.y,
            0,
            video.height,
            -windowHeight / 2,
            windowHeight / 2
          );
        }

        push();
        translate(-width / 2, -height / 2); // Text position in top-left of screen
        fill(255);
        textSize(32);
        textAlign(LEFT, TOP);
        
        handsDetect=hands.length > 0 && hands[0].confidence > 0.1;
        
        if (handsDetect) {
          text("Hands detected", 20, 20);
        } else {
          //text("No hands", 20, 20);
        }
        pop();
        //       push();
        //       translate(x, y, 0);
        //       if (hand.handedness === "Left") {
        //         fill(255, 100, 255);
        //       } else {
        //         fill(255, 255, 255);
        //       }
        //       noStroke();
        //       ellipse(0, 0, 16);
        //       pop();
      }
    }
  }
}
