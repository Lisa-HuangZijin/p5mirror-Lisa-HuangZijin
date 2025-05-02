// put the shareable link from Teachable Machine here
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/0I-DmTyTH/';

let classifier;
let video;
let label1 = '';  // to store the classification
let label2 = '';
let label3 = '';
let confidence1 = '';
let confidence2 = '';
let confidence3 = '';

// load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  // create the video
  // Teachable Machine recorded the camera as if looking into a mirror
  // (right and left swapped); because of this, we flip the camera image as well
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  // start classifying
  classifier.classifyStart(video, gotResult);
}

function draw() {
  background(0);
  // draw the video
  image(video, 0, 0);

  // draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label1 + " @ " + confidence1, width / 2, height - 4);
  text(label2 + " @ " + confidence2, width / 2, height - 4-8);
  text(label3 + " @ " + confidence3, width / 2, height - 4-24);
}

// this function is executed whenever classification finishes
// it's thus a "callback function"
function gotResult(results) {
  // the results are in an array ordered by confidence
  label1 = results[0].label;
  confidence1 = results[0].confidence;
  label2 = results[1].label;
  confidence1 = results[1].confidence;
  label3 = results[2].label;
  confidence1 = results[2].confidence;
}
