//3D creature orgins from the 3D flower created by Kazuki Umeda, I watched his youtube tutorial https://www.youtube.com/watch?v=YsGeMIpEcY4&t=220s
//vector rotation learnt from chatGPT below is the code and instruction https://editor.p5js.org/Lisa-HuangZijin/sketches/1r4bbZydi
let posVec, prevousPosVec, targetVec;
let currentY = 0;
let currentX = 0;

function setup() {
  createCanvas(700, 700, WEBGL);
  colorMode(HSB);
  angleMode(DEGREES);
  strokeWeight(4);

  posVec = createVector(0, 0, 0);
  prevousPosVec = posVec.copy();
  targetVec = createVector(0, 0, 0);
}

function draw() {
  background(0);
  //orbitControl();

  targetVec.set(mouseX - width / 2, mouseY - height / 2, 0);//// store the current position

  prevousPosVec.set(posVec);
  posVec.lerp(targetVec, 0.05);

  let velocity = p5.Vector.sub(posVec, prevousPosVec);
  let SP = velocity.mag();
  if (SP > 0.01) velocity.normalize();

  let targerY = atan2(velocity.x, velocity.z); 
  let targerX = asin(-velocity.y);        

  currentY = lerpAngle(currentY, targerY, 0.06);
  currentX = lerpAngle(currentX, targerX, 0.06);

  push();
  translate(posVec.x, posVec.y, posVec.z);
  rotateY(currentY);
  rotateX(currentX+90);
  drawCreature();
  pop();
}


function lerpAngle(a, b, t) {
  let diff = b - a;
  if (abs(diff) > 180) {
    diff -= 360 * Math.sign(diff);
  }
  return a + diff * t;
}

function drawCreature() {
  for (let r = 0; r <= 1; r += 0.04) {
    stroke(255, 0, r * 100 + 20);
    beginShape(POINTS);
    for (let theta = -360; theta <= 2700; theta += 2) {
      let phi = (180 / map(sin(frameCount * 5), -1, 1, 2, 10)) *
        Math.exp(-theta / (map(abs(sin(frameCount * 1 + PI)), 0, 1, 100, 10) * 180));
      let petalCut = 1 - (1 / 2) * pow((5 / 4) * pow(1 - ((3.6 * theta % 360) / 90), 2) - 1 / 4, 2);
      let hangDown = map(cos(frameCount * 5 +0.5), -1, 1, -3, 5) *
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
