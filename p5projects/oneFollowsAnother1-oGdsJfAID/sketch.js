//inspiration and example code for the behavior of "following" all comes from Daniel Shiffman's code https://editor.p5js.org/codingtrain/sketches/CvGJFQPLa

let segments = [];
const segmentNumber = 20;
const segmentBaseSize = 40;

function setup() {
  createCanvas(800, 600);

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

  segments.forEach((seg, index) => {
    seg.update(index);
    seg.display();
  });
}

class Segment {
  constructor(x, y, size, col, index) {
    this.home = createVector(x, y);
    this.position = createVector(x, y);
    this.target = createVector(x, y);
    this.size = size;
    this.color = col;
    this.index = index;
    this.angle = 0;
    this.energy = 0;
    this.lerpSmooth=0
  }

  update(index) {
    if (index === 0) {
      this.target = createVector(mouseX, mouseY);
      this.lerpSmooth=0.05
    } else {
      this.target = segments[index - 1].position.copy();
      this.lerpSmooth=0.15
    }

    let offset;
    offset = createVector(0, 0);

    this.position.lerp(p5.Vector.add(this.target, offset), this.lerpSmooth);

    this.size =
      segmentBaseSize * (0.8 + 0.4 * sin(frameCount * 0.1 + this.index));
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);

    stroke(this.color);

    ellipse(-this.size / 3, 0, this.size / 4);
    ellipse(this.size / 3, 0, this.size / 4);

    pop();
  }
}
