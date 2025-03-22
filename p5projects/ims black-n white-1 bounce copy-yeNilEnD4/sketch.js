
// https://editor.p5js.org/p5name/sketches/yeNilEnD4
// ims black-n white-1 bounce copy
//
// white cross bounces around 
// switches to random location every my.changeTime seconds

let my = {};

function setup() {
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
  background(0);
  // strokeWeight(0);
  // fill("black");
  // rect(0, 0, width, height);
  check_time();
  
  strokeWeight(1);
  stroke(255);

  line(0, my.ypos, width, my.ypos);

  line(my.xpos, 0, my.xpos, height);

  my.ypos += my.yspeed;
  if (my.ypos > height || my.ypos < 0) {
    my.yspeed *= -1;
  }
  my.xpos += my.xspeed;
  if (my.xpos > width || my.xpos < 0) {
    my.xspeed *= -1;
  }
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
