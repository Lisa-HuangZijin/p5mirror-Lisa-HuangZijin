function setup() {
  createCanvas(700, 700, WEBGL);
  colorMode(HSB);
  angleMode(DEGREES);
  stroke(205, 50, 100);
  strokeWeight(4);
}

function draw() {
  background(220, 50, 15);
  orbitControl(); //use mouse to change the perspective

  for (let phi = 0; phi <= 350; phi += 5) {
    beginShape(POINTS);
    for (let theta = 0; theta <= 180; theta += 5) {
      let pX = 250 * sin(phi) * sin(theta);
      let pY = -250 * cos(phi);
      let pZ = 250 * sin(phi) * cos(theta);
      vertex(pX, pY, pZ);
    }
    endShape();
  }
}
