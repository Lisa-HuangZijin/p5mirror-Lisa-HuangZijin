// https://editor.p5js.org/p5name/sketches/p261KC1ow
// ims perlin v7 colors
// x2 changes in for loop

let my = {};

function setup() {
  createCanvas(windowWidth, windowHeight - 55);
  my.backg = 0;
  background(my.backg);
  // noStroke();
  my.x1 = 0;
  my.x2 = 0;
  my.x1step = 0.01;
  my.x2step = 0.000025; // less is tighter x spacing
  my.y1scale = 0.001;
  my.ylen = height / 60;
  my.y1 = 0;
  my.y1step = 0.01;
  my.time = 0;
  my.timeMax = 5 * 1000; // milliseconds to restart
  
  let a = 100;
  let aRed = [255, 0, 0, a];
  let aGreen = [0, 255, 0, a];
  let aGold = [255, 214, 0, a];
  my.colors =  [aRed, aGreen, aGold, my.backg];
  // my.colors =  [aRed, aGreen, aGold, my.backg, my.backg, my.backg];
  // my.colors =  [aRed, aGreen, aGold];
  my.colorIndex = 0;

  setup_fullScreenBtn();
}

function draw() {
  my.time += deltaTime;
  if (my.time > my.timeMax) {
    my.time = 0;
    background(my.backg, 10);
    my.colorIndex = (my.colorIndex+1) % my.colors.length;
  }
  my.x1 = random();
  for (let ytop = 0; ytop < height; ytop += my.ylen) {
    my.x1 += my.x1step;
    my.x2 += my.x2step;
    my.y1 += my.y1step;
    let ny = ytop * my.y1scale;
    let len = noise(my.x1, my.y1) * my.ylen;
    // let len = noise(my.x1, my.y1, my.x2) * my.ylen;
    let x = noise(my.x2, ny) * width;
    let ymid = ytop + my.ylen * 0.5;
    stroke(my.backg);
    line(x, ytop, x, ytop + my.ylen);
    let foreColor = my.colors[my.colorIndex];
    stroke(foreColor);
    let hlen = len * 0.5;
    line(x, ymid - hlen, x, ymid + hlen);
    // line(x, ymid - hlen, x, ytop + my.len);
  }
  // my.x2 += my.x2step;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup_fullScreenBtn() {
  my.fullScreenBtn = createButton('Full Screen');
  my.fullScreenBtn.mousePressed(full_screen_action);
  my.fullScreenBtn.style('font-size:42px');
}

function full_screen_action() {
  my.fullScreenBtn.remove();
  fullscreen(1);
  let delay = 3000;
  setTimeout(ui_present_window, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
  // init_dim();
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

// https://editor.p5js.org/p5name/sketches/LLhJrWagm
// ims perlin v6 deltaTime

// https://editor.p5js.org/p5name/sketches/ev0PtLO79
// ims perlin v6 reverse
