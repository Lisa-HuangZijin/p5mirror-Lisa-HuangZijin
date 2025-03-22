// https://editor.p5js.org/p5name/sketches/vlm26-OWl
// ims black-n rgg-1 noise

let my = {};

function setup() {
  init_noise();
  my.gitter = 10;
  my.bgAlpha = 5;
  my.width = 400;
  my.height = 400;
  my.xpos = 0;
  my.ypos = 0;
  my.xspeed = 1;
  my.yspeed = 1;
  // my.xlen = 0;
  // my.ylen = 0;
  my.debug = 1;
  // my.fullScreenBtn = 0;
  my.startTime = 0;
  my.changeTime = 5.0;
  my.colors = ["red", "green", "gold"];
  my.colorIndex = 0;

  if (!my.debug) {
    my.width = windowWidth;
    my.height = windowHeight;
  }
  createCanvas(my.width, my.height);
  noStroke();

  my.fullScreenBtn = createButton("Full Screen");
  my.fullScreenBtn.mousePressed(full_screen_action);
  my.fullScreenBtn.style("font-size:42px");

  my.startTime = millis() / 1000.0;

  new_pos();

  // init_dim();
}

function draw() {
  background(0, my.bgAlpha);

  strokeWeight(1);
  // stroke(255);
  stroke(my.colors[my.colorIndex]);

  let x = my.xpos + random(-my.gitter,my.gitter);
  let y = my.ypos + random(-my.gitter,my.gitter);
  
  line(0, y, width, y);

  line(x, 0, x, height);

  // update_noise()
  update_bounce();
}

function init_noise() {
  my.noiseX = 0;
  my.noiseY = 0;
  my.noiseOffset1 = 0;
  my.noiseOffset2 = 10000;
  my.noiseDelta = 0.01
}

function update_noise() {
  my.noiseX = noise(my.noiseOffset1);
  my.noiseY = noise(my.noiseOffset2);

  my.noiseOffset1 += my.noiseDelta;
  my.noiseOffset2 += my.noiseDelta;
}

function update_bounce() {
  my.ypos += my.yspeed + my.noiseY;
  if (my.ypos > height || my.ypos < 0) {
    my.yspeed *= -1;
    changeColor();
  }
  my.xpos += my.xspeed + my.noiseX;
  if (my.xpos > width || my.xpos < 0) {
    my.xspeed *= -1;
    changeColor();
  }
}

function changeColor() {
  my.colorIndex = (my.colorIndex + 1) % my.colors.length;
}

function new_pos() {
  my.xpos = random(0, width);
  my.ypos = random(0, height);
}

function check_time() {
  let now = millis() / 1000;
  if (now - my.startTime > my.changeTime) {
    my.startTime = now;
    new_pos();
  }
}

// From
// https://editor.p5js.org/jht1493/sketches/5LgILr8RF

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

// https://editor.p5js.org/jht9629-nyu/sketches/8Iazn1D_P
// ims black-n white-1

// https://editor.p5js.org/jht9629-nyu/sketches/3VKJ-q8ar
// ims03-jht scrolling color bars

// https://editor.p5js.org/jht9629-nyu/sketches/Mpgun-Kti
// ims black-n white-1 bounce

// https://editor.p5js.org/p5name/sketches/bpUutVbYo
// ims black-n rgg-1 bounce

// https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/perlin/intro-to-perlin-noise
