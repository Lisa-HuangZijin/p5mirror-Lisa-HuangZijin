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

  
  if (indexX && indexY) {
    creature.follow(indexX, indexY, 220);
  } else {
    creature.follow(mouseX - width / 2, mouseY - height / 2, 0);
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
  }

  follow(x, y, z) {
    this.target.set(x, y, z);
  }

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
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.rotY);
    rotateX(this.rotX + 90);
    this.drawCreature(); 
  }

  drawCreature() {
    for (let r = 0; r <= 1; r += 0.04) {
      stroke(255, 0, r * 100 + 20);
      beginShape(POINTS);
      for (let theta = -360; theta <= 2700; theta += 2) {
        let phi = (180 / map(sin(frameCount * 5), -1, 1, 2, 10)) *
          Math.exp(-theta / (map(abs(sin(frameCount * 1 + PI)), 0, 1, 100, 10) * 180));
        
        let petalCut = 1 - (1 / 2) *
          pow((5 / 4) * pow(1 - ((3.6 * theta % 360) / 90), 2) - 1 / 4, 2);

        let hangDown = map(cos(frameCount * 5 + 0.5), -1, 1, -3, 5) *
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
}
