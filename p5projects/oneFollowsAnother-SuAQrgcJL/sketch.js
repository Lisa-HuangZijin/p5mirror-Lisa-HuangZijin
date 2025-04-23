let segments = [];
let palette;
const MAX_SEGMENTS = 12;
const SEGMENT_SIZE = 40;
const STATE = { COHESIVE: 0, CHAOTIC: 1, TRANSITION: 2 }; //transition state haven't been developed yet
let currentState = STATE.COHESIVE;

function setup() {
  createCanvas(800, 600);
  palette = [
    color(224, 13, 30),
    color(255, 221, 10),
    color(5, 56, 137),
    color(231, 233, 232),
  ];

  // Create serpent segments
  for (let i = 0; i < MAX_SEGMENTS; i++) {
    segments.push(
      new Segment(
        width / 2 + i * SEGMENT_SIZE * 0.8,
        height / 2,
        SEGMENT_SIZE,
        palette[i % palette.length],
        i
      )
    );
  }
}

function draw() {
  background(5, 56, 137);

  // Update and display all segments
  segments.forEach((seg, index) => {
    seg.update(index);
    seg.display();
  });

  // State transitions
  if (frameCount % 600 === 0) toggleState();
}

function toggleState() {
  if (currentState === STATE.COHESIVE) {
    currentState = STATE.CHAOTIC;
  } else {
    currentState = STATE.COHESIVE;
  }
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
  }

  update(index) {
    // Follow previous segment or mouse (for head)
    if (index === 0) {
      if (currentState === STATE.COHESIVE) {
        this.target = createVector(mouseX, mouseY);
      } else {
        this.target = createVector(
          width / 2 + cos(frameCount * 0.05) * 200,
          height / 2 + sin(frameCount * 0.07) * 150
        );
      }
    } else {
      this.target = segments[index - 1].position.copy();
    }

    // Add sin offset based on state
    let offset;
    if (currentState === STATE.CHAOTIC) {
      offset = createVector(
        cos(frameCount * 0.1 + this.index) * 20,
        sin(frameCount * 0.1 + this.index) * 20
      );
    } else {
      offset = createVector(0, 0);
    }

    this.position.lerp(p5.Vector.add(this.target, offset), 0.2);

    this.size = SEGMENT_SIZE * (0.8 + 0.2 * sin(frameCount * 0.1 + this.index));

    if (currentState === STATE.CHAOTIC) {
      this.angle = sin(frameCount * 0.15 + this.index) * 0.5;
    } else {
      this.angle = sin(frameCount * 0.05 + this.index) * 0.2;
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);

    // Main body
    fill(this.color);
    noStroke();
    rect(0, 0, this.size, this.size / 2, 5);

    // Decoration
    fill(palette[(this.index + 1) % palette.length]);
    ellipse(-this.size / 3, 0, this.size / 4);
    ellipse(this.size / 3, 0, this.size / 4);

    // Chaotic state effects
    if (currentState === STATE.CHAOTIC) {
      stroke(255);
      strokeWeight(2);
      noFill();
      line(-this.size / 2, -this.size / 4, this.size / 2, this.size / 4);
    }

    pop();
  }
}

function mousePressed() {
  toggleState();
}
