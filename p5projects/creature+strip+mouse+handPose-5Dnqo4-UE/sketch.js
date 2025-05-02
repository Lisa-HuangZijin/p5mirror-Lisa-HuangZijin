//3D creature orgins from the 3D flower created by Kazuki Umeda, I watched his youtube tutorial https://www.youtube.com/watch?v=YsGeMIpEcY4&t=220s
//vector rotation learnt from chatGPT below is the code and instruction https://editor.p5js.org/Lisa-HuangZijin/sketches/1r4bbZydi
//handPose keypoints example code from ml5!
//需要改进的问题：让
let posVec, prevousPosVec, targetVec;
let currentY = 0;
let currentX = 0;

let segments = [];
const segmentNumber = 20;
const segmentBaseSize = 20;

function setup() {
  
  createCanvas(windowWidth,windowHeight, WEBGL);
  
  setuphandPose()
  
  colorMode(HSB);
  angleMode(DEGREES);
  strokeWeight(4);

  posVec = createVector(0, 0, 0);
  prevousPosVec = posVec.copy();
  targetVec = createVector(0, 0, 0);
  
  for (let i = 0; i < segmentNumber; i++) {
    segments.push(
      new Segment(
        width / 2 + i * segmentBaseSize * 0.8,
        height / 2,
        segmentBaseSize,
        255,
        i
      )
    );
  }
}

function draw() {
  background(0);
  //orbitControl();
  
  drawhandPose()
  
  
  
  
  segments.forEach((seg, index) => {
    seg.update(index);
    seg.display();
  });
 
  if(indexX&&indexY){
    if(hands[1]){//还是没有达到效果//优先右手的效果
      targetVec.set(indexX , indexY , 0);
    }else
    {targetVec.set(indexX , indexY , 0);}
  }else{
    targetVec.set(mouseX - width / 2, mouseY - height / 2, 0);
  }

  

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
  
  if (hands.handedness === "Right" && hands.keypoints){
    // ellipse(indexX,indexY,200)
    push()
    translate(indexX,indexY,0)
    sphere(200)
    pop()
  }
  
  
}


function lerpAngle(a, b, t) {
  let diff = b - a;
  if (abs(diff) > 180) {
    diff -= 360 * Math.sign(diff);
  }
  return a + diff * t;
}

function drawCreature() {
  push()
  stroke(255)
  rotateX(90)
  translate(0,0,220)
  //ellipse(0,0,150,150)
  //drawTails()
  pop()
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

class Segment {
  constructor(x, y, size, col, index) {
    this.home = createVector(x, y, 0);
    this.position = createVector(x, y, 0);
    this.target = createVector(x, y, 0);
    this.size = size;
    this.color = col;
    this.index = index;
    this.energy = 0;
    this.lerpSmooth = 0;

    this.angleY = 0; // for facing direction
    this.angleX = 0;
  }

  update(index) {
    if (index === 0) {
  this.target = posVec.copy(); 
      //this.target=p5.Vector.add(posVec.copy(),createVector(0,0,100))
  // let anchor=p5.Vector.sub(createVector(10,0,0),posVec.copy())
  // point(anchor.x,anchor.y)
  this.lerpSmooth = 0.04;
} else {
  this.target = segments[index - 1].position.copy();
  this.lerpSmooth = 0.10;
}


    // Update position smoothly
    this.position.lerp(this.target, this.lerpSmooth);

    // Direction vector for rotation
    let dir = p5.Vector.sub(this.target, this.position);
    if (dir.mag() > 0.01) {
      dir.normalize();
      this.angleY = atan2(dir.x, dir.z);  // turn left/right
      this.angleX = asin(-dir.y);         // look up/down
    }

    // Animate size
    this.size = segmentBaseSize * (0.8 + 0.4 * sin(frameCount * 10 + this.index*40));
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);

    //Rotate segment to face its motion direction
    rotateY(this.angleY);
    rotateX(this.angleX);

    stroke(this.color);
    fill(255)
    // strokeWeight(2);

//ellipse(0,0,1,1)


push();
translate(0, 0, 0);
sphere(this.size / 8);
pop();


    pop();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    let fs = fullscreen();
    fullscreen(!fs); 
    //fullscreen(true);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function drawTails(){
  // ellipse(0,0,30)
  // point(30*sin(PI),30*cos(PI))
  // //  segments.forEach((seg, index) => {
  //   seg.update(index);
  //   seg.display();
  // });
}