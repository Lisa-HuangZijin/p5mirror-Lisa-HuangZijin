let video, handPose, hands = [];
let opening, opening_, vDensity, vDensity_, flowerDegree;
let targetX = 0, targetY = 0, targetZ = 0;
let posX = 0, posY = 0, posZ = 0;

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(700, 700, WEBGL);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);

  colorMode(HSB);
  angleMode(DEGREES);
  strokeWeight(4);

  opening_ = createDiv();
  opening = createSlider(1.5, 10, 2, 0.2);
  
  vDensity_ = createDiv();
  vDensity = createSlider(2, 100, 8, 0.01);
  
  flowerDegree = createSlider(-15, 15, 1, 1);
}

function gotHands(results) {
  hands = results;
}

function draw() {
  background(0);
  orbitControl(); // optional for 3D viewing
  //rotateZ(90);

  // Track index finger of right hand
  for (let hand of hands) {
    if (hand.handedness === "Right") {
      let indexTip = hand.keypoints.find(k => k.name === "index_finger_tip");
      if (indexTip) {
        // Flip x to match canvas, center in WebGL
        targetX = map(-indexTip.x + width, 0, width, -width / 2, width / 2);
        targetY = map(indexTip.y, 0, height, -height / 2, height / 2);
        targetZ = 0; // You can try mapping depth if you use depth estimation
      }
    }
  }

  // Smooth interpolation
  posX = lerp(posX, targetX, 0.1);
  posY = lerp(posY, targetY, 0.1);
  posZ = lerp(posZ, targetZ, 0.1);

  // Draw the generative creature at (posX, posY, posZ)
  push();
  translate(posX, posY, posZ);
  drawCreature();
  pop();
}

function drawCreature() {
  for (let r = 0; r <= 1; r += 0.04) {
    stroke(255, 0, r * 100 + 20);
    beginShape(POINTS);
    for (let theta = -2 * 180; theta <= 180 * 15; theta += 2) {
      let phi = (180 / map(sin(frameCount * 5), -1, 1, 2, 10)) *
        Math.exp(-theta / (map(abs(sin(frameCount * 2.5 + PI)), 0, 1, 100, 10) * 180));
      let petalCut = 1 - (1 / 2) * pow((5 / 4) * pow(1 - ((3.6 * theta % 360) / 90), 2) - 1 / 4, 2);
      let hangDown = map(sin(frameCount * 5 + PI), -1, 1, -3, 5) *
        pow(r, 2) * pow(1.3 * r - 1, 2) * sin(phi);

      if (0 < petalCut * (r * sin(phi) + hangDown * cos(phi))) {
        let pX = 260 * petalCut * (r * sin(phi) + hangDown * cos(phi)) * sin(theta);
        let pY = -260 * petalCut * (r * cos(phi) - hangDown * sin(phi));
        let pZ = 260 * petalCut * (r * sin(phi) + hangDown * cos(phi)) * cos(theta);
        vertex(pX, pY, pZ);
      }
    }
    endShape();
  }
}
