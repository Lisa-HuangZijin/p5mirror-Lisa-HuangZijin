//3D creature orgins from the 3D flower created by Kazuki Umeda, I watched his youtube tutorial https://www.youtube.com/watch?v=YsGeMIpEcY4&t=220s
//vector rotation learnt from chatGPT below is the code and instruction https://editor.p5js.org/Lisa-HuangZijin/sketches/1r4bbZydi
//handPose keypoints example code from ml5!
//解决了遮挡问题，把3D打开又关上哈哈哈哈


let creature;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setuphandPose();

  colorMode(HSB);
  angleMode(DEGREES);
  strokeWeight(4);

  creature = new Creature();
}

function draw() {
  background(0);
  drawhandPose();

  if (handsDetect && openHand) {
    creature.follow(indexX, indexY, 0);
    creature.rotZ = lerp(creature.rotZ, 0, 0.03);
  } else if (handsDetect && !openHand) {
    // creature.rotZ += 5;
    // creature.rotY += 5;

    creature.follow(indexX, indexY +180 * cos(frameCount*2), 200 * sin(frameCount*2));
  } 
  if(hands.length==0||!indexX){
    creature.follow(
      windowWidth * 0.4 * sin(frameCount),
      windowWidth * 0.2 * cos(frameCount),
      0
    );
   creature.rotZ = lerp(creature.rotZ, 0, 0.03);
  }

  creature.update();
  creature.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (keyCode === ENTER) {
    fullscreen(!fullscreen());
  }
}

function lerpAngle(a, b, t) {
  let diff = b - a;
  if (abs(diff) > 180) diff -= 360 * Math.sign(diff);
  return a + diff * t;
}

class Creature {
  constructor() {
    this.pos = createVector(0, 0, 0);
    this.prevPos = this.pos.copy();
    this.target = createVector(0, 0, 0);

    this.rotY = 0;
    this.rotX = 0;
    this.rotZ = 0;
  }

  follow(x, y, z) {
    this.target.set(x, y, z);
  }
  aroundCenter() {}

  update() {
    this.prevPos.set(this.pos);
    this.pos.lerp(this.target, 0.05);

    let velocity = p5.Vector.sub(this.pos, this.prevPos);
    if (velocity.mag() > 0.01) velocity.normalize();

    let targetY = atan2(velocity.x, velocity.z);
    let targetX = asin(-velocity.y);

    this.rotY = lerpAngle(this.rotY, targetY, 0.06);
    this.rotX = lerpAngle(this.rotX, targetX, 0.06);
  }

  display() {
    push();

    // Temporarily disable depth testing
    const gl = _renderer.GL || _renderer.drawingContext;
    gl.disable(gl.DEPTH_TEST);

    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.rotY);
    rotateX(this.rotX + 90);
    rotateZ(this.rotZ);
    this.drawCreature();

    // Turn depth test back on
    gl.enable(gl.DEPTH_TEST);

    pop();
  }

  drawCreature() {
    for (let r = 0; r <= 1; r += 0.04) {
      stroke(255, 0, r * 100);
      //stroke(255, 0, r * 100 + 50); // or +80, depending on how pale it looks

      beginShape(POINTS);
      for (let theta = -360; theta <= 2700; theta += 2) {
        let phi =
          (180 / map(sin(frameCount * 5), -1, 1, 2, 10)) *
          Math.exp(
            -theta / (map(abs(sin(frameCount * 1 + PI)), 0, 1, 100, 10) * 180)
          );

        let petalCut =
          1 -
          (1 / 2) *
            pow((5 / 4) * pow(1 - ((3.6 * theta) % 360) / 90, 2) - 1 / 4, 2);

        let hangDown =
          map(cos(frameCount * 5 + 0.5), -1, 1, -3, 5) *
          pow(r, 2) *
          pow(1.3 * r - 1, 2) *
          sin(phi);

        if (0 < petalCut * (r * sin(phi) + hangDown * cos(phi))) {
          let pX =
            260 * petalCut * (r * sin(phi) + hangDown * cos(phi)) * sin(theta);
          let pY = -260 * petalCut * (r * cos(phi) - hangDown * sin(phi));
          let pZ =
            260 * petalCut * (r * sin(phi) + hangDown * cos(phi)) * cos(theta);
          vertex(pX, pY, pZ);
        }
      }
      endShape();
    }
  }
}
