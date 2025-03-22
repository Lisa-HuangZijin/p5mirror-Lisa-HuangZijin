// https://editor.p5js.org/p5name/sketches/E_hAnmkzr
// ims black-n rgg shape

let my = {};

function setup() {
  my.points = [];
  // my.strokeWeights = [1,2,4]
  my.strokeWeights = [1]
  my.jitter = 0;
  my.bgAlpha = 8;
  my.width = 400;
  my.height = 200;
  my.xpos = 0;
  my.ypos = 0;
  my.xspeed = 1;
  my.yspeed = 1;
  // my.xlen = 0;
  // my.ylen = 0;
  my.debug = 0;
  my.startTime = 0;
  my.changeTime = 5.0;
  my.colors = ["red", "green", "gold"];
  my.colorIndex = 0;

  if (!my.debug) {
    my.width = windowWidth;
    my.height = windowHeight;
  }
  createCanvas(my.width, my.height);
  // noStroke();

  setup_fullScreenBtn()

  my.startTime = millis() / 1000.0;

  new_pos();

}

function draw() {
  background(0, my.bgAlpha);

  strokeWeight(random(my.strokeWeights));
  // stroke(255);
  stroke(my.colors[my.colorIndex]);

  let x = my.xpos + random(-my.jitter,my.jitter);
  let y = my.ypos + random(-my.jitter,my.jitter);
  
  // draw_points(y % width, x % height);
  // draw_points(x, y);
  // draw_points(my.xpos, y);
  // draw_points(x, );
  // draw_points(my.ypos, my.xpos);

  line(0, y, width, y);
  line(x, 0, x, height);

  update_bounce();
}

function draw_points(x, y) {
  my.points.push( {x, y});
  if (my.points.length > width) {
    my.points.splice(0, 1);
  }
  noFill();
  beginShape();
  for (let pt of my.points) {
    vertex(pt.x, pt.y);
  }
  endShape();
}

function update_bounce() {
  my.ypos += my.yspeed;
  if (my.ypos > height || my.ypos < 0) {
    my.yspeed *= -1;
    changeColor();
  }
  my.xpos += my.xspeed ;
  if (my.xpos > width || my.xpos < 0) {
    my.xspeed *= -1;
    changeColor();
  }
}

function changeColor() {
  my.colorIndex = (my.colorIndex + 1) % my.colors.length;
  my.points = [];
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

function setup_fullScreenBtn() {
  my.fullScreenBtn = createButton("Full Screen");
  my.fullScreenBtn.mousePressed(full_screen_action);
  my.fullScreenBtn.style("font-size:42px");
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

// https://editor.p5js.org/jht9629-nyu/sketches/8Iazn1D_P
// ims black-n white-1

// https://editor.p5js.org/jht9629-nyu/sketches/3VKJ-q8ar
// ims03-jht scrolling color bars

// https://editor.p5js.org/jht9629-nyu/sketches/Mpgun-Kti
// ims black-n white-1 bounce

// https://editor.p5js.org/p5name/sketches/bpUutVbYo
// ims black-n rgg-1 bounce

// https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/perlin/intro-to-perlin-noise

// https://editor.p5js.org/p5name/sketches/vlm26-OWl
// ims black-n rgg-1 noise

// https://editor.p5js.org/p5name/sketches/IfOxC4gMZ
// ims black-n rgg-1 gitter

