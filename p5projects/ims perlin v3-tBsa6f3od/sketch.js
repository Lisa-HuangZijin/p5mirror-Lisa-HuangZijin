// https://editor.p5js.org/p5name/sketches/tBsa6f3od
// ims perlin v3

let xoff1 = 0;
let xstep = 0.01;
let xstep2 = 0.005;
let xscale = 1.2;
// let xoff2 = 10000;
let my = {};

function setup() {
  createCanvas(500, 400);
  my.backg = 200;
  background(my.backg)
  // noStroke();
  my.x = 0;
  my.len = height / 20;
}

function draw() {
  // background(50, 5);

  for (let ytop = 0; ytop < height; ytop += my.len) {
    xoff1 += xstep;
    // let x = my.x;
    let x = noise(my.x, ytop) * width;
    let ymid = ytop + my.len * 0.5;
    let len = noise(xoff1, ytop) * my.len;
    stroke(my.backg);
    line(x, ytop, x, ytop + my.len);
    stroke(0);
    let hlen = len * 0.5;
    line(x, ymid - hlen, x, ymid + hlen);
    // line(x, ymid - hlen, x, ytop + my.len);
  }
  my.x += xstep2;
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

// https://editor.p5js.org/p5name/sketches/h2G8X82wt
// ims perlin v1

// https://editor.p5js.org/p5name/sketches/Ce9F9d_lu
// ims perlin v2
