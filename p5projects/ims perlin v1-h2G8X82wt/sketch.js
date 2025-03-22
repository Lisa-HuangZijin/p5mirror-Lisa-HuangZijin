// https://editor.p5js.org/p5name/sketches/h2G8X82wt
// ims perlin v1

let xoff1 = 0;
let xstep = 0.01;
let xscale = 1.2;
// let xoff2 = 10000;

function setup() {
  createCanvas(500, 400);
  background(200)
  // noStroke();
}

function draw() {
  // background(50, 5);

  let x = map(noise(xoff1, 0) * xscale, 0, 1, 0, width);
  let y = map(noise(xoff1, 1) * xscale, 0, 1, 0, height);
  // let y = map(noise(xoff2), 0, 1, 0, height);

  xoff1 += xstep;
  // xoff2 += 0.01;

  ellipse(x, y, 24, 24);
}

// https://editor.p5js.org/codingtrain/sketches/nCYG2SCNq
// Perlin Noise - Adding Y Axis

// Graphing 1D Perlin Noise (Adding Y-Axis)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/noise/0.4-graphing-1d.html
// https://youtu.be/y7sgcFhk6ZM

// Adding Y-Axis: https://editor.p5js.org/codingtrain/sketches/nCYG2SCNq
// Noise Graph: https://editor.p5js.org/codingtrain/sketches/EZeHXBhei
// Noisy Sin: https://editor.p5js.org/codingtrain/sketches/M_kuAXwV2

// This example has been updated to use es6 syntax. To learn more about es6 visit: https://thecodingtrain.com/Tutorials/16-javascript-es6
