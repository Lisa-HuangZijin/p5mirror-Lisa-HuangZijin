// https://editor.p5js.org/p5name/sketches/ZO-2p0H5_
// ims noise rotate

let inc = 0.001;
// let inc = 0.02;
let start = 0;
let rot = 0;
// let rotDelta = 0.0;
let rotDelta = 0.2;
let incAccel = 6;
// let incAccel = 2;
let my = {};

function setup() {
  my.canv = createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0,10);
  
  translate(width/2, height/2)
  rotate(radians(rot))
  rot =  (rot + rotDelta) ;
  stroke(255);
  noFill();
  beginShape();
  let xoff = start;
  for (let x = -width; x < width; x++) {
    stroke(255);
    // let y = random(height);
    let y = (noise(xoff) - 0.5) * height;
    vertex(x, y);
    
    xoff += inc;
  }
  endShape();
  
  start += inc * incAccel;
}


// Graphing 1D Perlin Noise (1D Noise Graph)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/noise/0.4-graphing-1d.html
// https://youtu.be/y7sgcFhk6ZM

// Adding Y-Axis: https://editor.p5js.org/codingtrain/sketches/nCYG2SCNq
// Noise Graph: https://editor.p5js.org/codingtrain/sketches/EZeHXBhei
// Noisy Sin: https://editor.p5js.org/codingtrain/sketches/M_kuAXwV2

// This example has been updated to use es6 syntax. To learn more about es6 visit: https://thecodingtrain.com/Tutorials/16-javascript-es6
