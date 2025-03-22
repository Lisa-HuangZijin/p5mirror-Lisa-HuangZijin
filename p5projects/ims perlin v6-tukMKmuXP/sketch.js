// https://editor.p5js.org/p5name/sketches/tukMKmuXP
// ims perlin v6
// full frame - nay

let my = {};

function setup() {
  createCanvas(windowWidth, windowHeight);
  my.backg = 200;
  background(my.backg)
  // noStroke();
  my.x1 = 0;
  my.x2 = 0;
  my.x1step = 0.01;
  my.x2step = 0.01; // less is tighter x spacing
  my.y1scale = 0.001;
  my.ylen = height / 60;
}

function draw() {
  // background(50, 5);


  for (let i = 0; i < width; i++) {
    for (let ytop = 0; ytop < height; ytop += my.ylen) {
      my.x1 += my.x1step;
      let ny = ytop * my.y1scale
      let len = noise(my.x1, ny) * my.ylen;
      let x = noise(my.x2, ny) * width;
      let ymid = ytop + my.ylen * 0.5;
      stroke(my.backg);
      line(x, ytop, x, ytop + my.ylen);
      stroke(0);
      let hlen = len * 0.5;
      line(x, ymid - hlen, x, ymid + hlen);
      // line(x, ymid - hlen, x, ytop + my.len);
    }
    my.x2 += my.x2step;
  }
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

// https://editor.p5js.org/p5name/sketches/tBsa6f3od
// ims perlin v3

// https://editor.p5js.org/p5name/sketches/FdAetYG8Y
// ims perlin v4
// mirgate to my.

// https://editor.p5js.org/p5name/sketches/eQfSExLDa
// ims perlin v5
// wave on the y axis
