let classifier;
let video;
let label = "";
let confidence = 0;

// Teachable Machine hosted model
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/0I-DmTyTH/';

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json', () => {
    console.log("Model loaded!");
  });
}

function setup() {
  createCanvas(320, 260);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  classifyVideo();
}

function draw() {
  background(0);

  // Flip video to mirror it visually
  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  // Show classification result
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(`${label} (${nf(confidence * 100, 2, 1)}%)`, width / 2, height - 10);
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error("Classification error:", error);
    return;
  }

  // Check if result array exists and has at least one result
  if (results && results.length > 0) {
    console.log("Results:", results); // Helpful for debugging
    label = results[0].label;
    confidence = results[0].confidence;
  } else {
    label = "No result";
    confidence = 0;
  }

  classifyVideo(); // keep looping
}
