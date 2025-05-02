//解决了遮挡问题，把3D打开又关上哈哈哈哈

let creature;
let HandsDetected

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
    creature.follow(indexX, indexY, 0);
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
    this.pos = createVector(0, -150, 0); // start offset
    this.vel = createVector(2, 0, 0);    // tangential initial velocity
    this.acc = createVector(0, 0, 0);
    this.center = createVector(0, 0, 0);
    this.intensity = 0.001; // attraction strength

    this.target = createVector(0, 0, 0);
    this.prevPos = this.pos.copy();

    this.rotX = 0;
    this.rotY = 0;
    
    this.maxSteerForce = 0.1
    
    

  }

  follow(x, y, z) {
    this.target.set(x, y, z);
  }

  update(handsDetect) {
    this.prevPos.set(this.pos);

    if (hands.length==0) {
      this.orbitUsingPhysics();
    } else {
      this.pos.lerp(this.target, 0.05);

      let velocity = p5.Vector.sub(this.pos, this.prevPos);
      if (velocity.mag() > 0.01) {
        velocity.normalize();
        this.rotY = atan2(velocity.x, velocity.z);
        this.rotX = asin(-velocity.y);
      }
    }
  }

  orbitUsingPhysics() {
    // Gravitational attraction toward center
    let force = p5.Vector.sub(this.center, this.pos);
    this.acc = force.mult(this.intensity);

    // Update motion
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // Use velocity to face direction
    if (this.vel.mag() > 0.01) {
      let v = this.vel.copy().normalize();
      this.rotY = atan2(v.x, v.z);
      this.rotX = asin(-v.y);
    }
  }



  display() {
    push();

    const gl = _renderer.GL || _renderer.drawingContext;
    gl.disable(gl.DEPTH_TEST);

    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateY(this.rotY);
    rotateX(this.rotX + 90);
    this.drawCreature();

    gl.enable(gl.DEPTH_TEST);
    pop();
  }

  drawCreature() {
    for (let r = 0; r <= 1; r += 0.04) {
      stroke(255, 0, r * 100);
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
