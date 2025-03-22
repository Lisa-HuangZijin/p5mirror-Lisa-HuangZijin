// https://editor.p5js.org/p5name/sketches/9GXXTQNgP
// mo-gallery alter-ego

let a_version = "v1 ";
let galleryKey = "mo-1/gallery-@r-ae";
let scrollYmax = (2000 - 300) * 2;
let scrollMod = 1;
let scrollStep = 2;
// window.scrollY > scrollYmax
// let galleryKey = 'mo-gallery-ims-web';
let nitems = 0;
let updateCount = 0;
let doScroll = false;
let rdata; // Firebase object results from server. key is id
let rarr; // Array of items from server
// let rwidth = 1920; // dimensions for image element
// let rheight = 1080;
let rwidth = 1080; // dimensions for image element
let rheight = 1920;
let scrollLimit = 0;
let doSplat = 0;
let debug = 0;

let shuffleBtn;
let fullScreenBtn;
let toggleScrollBtn;
let splatBtn;
let imgs = [];
let totalHeight = 0;
let scrollStartTime;
let lastY;
let stallMaxTime = 1.0;

function setup() {
  noCanvas();
  // console.log('app', fireb_.app);
  if (debug) {
    rwidth = rwidth / 4;
    rheight = rheight / 4;
    scrollLimit = 2;
    doScroll = 1;
  }
  check_url_param();

  // Setup listner for changes to firebase db
  let galleryRef = fireb_.ref(fireb_.database, galleryKey);
  fireb_.onValue(galleryRef, (snapshot) => {
    const data = snapshot.val();
    console.log("galleryRef data", data);
    received_gallery(data);
  });

  shuffleBtn = createButton("Shuffle").mousePressed(() => {
    //console.log('Shuffle');
    received_gallery(rdata, { doShuffle: 1 });
  });
  shuffleBtn.style("font-size:42px");

  fullScreenBtn = createButton("Full Screen").mousePressed(() => {
    ui_toggleFullScreen();
    ui_remove_all();
  });
  fullScreenBtn.style("font-size:42px");

  toggleScrollBtn = createButton("Scroll").mousePressed(() => {
    doScroll = !doScroll;
    console.log("doScroll", doScroll);
    if (doScroll) {
      if (displayWidth <= 1920) {
        ui_toggleFullScreen();
      }
      ui_remove_all();
    }
    // window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  });
  toggleScrollBtn.style("font-size:42px");

  splatBtn = createButton("Splat").mousePressed(() => {
    console.log("splatBtn", doSplat);
    doSplat = !doSplat;
    received_gallery(rdata);
  });
  splatBtn.style("font-size:42px");

  createElement("br");

  ui_init_update();
}

function draw() {
  // calcTotalHeight();
  // console.log('draw');
  if (doScroll && frameCount % scrollMod == 0) {
    // window.scrollBy({ top: window.scrollY + 1, behavior: 'smooth' });
    window.scrollBy(0, 1); // 1
    // let nlimit = scrollLimit || rarr.length;
    // if (window.scrollY >= scrollYmax) {
    if (scrollingStalled()) {
      window.scrollTo(0, scrollStep);
      lastY = 0;
      scrollStartTime = 0;
    }
  }
}

// window.scrollTo(0, 4900);

function scrollingStalled() {
  let now = millis() / 1000.0;
  if (!scrollStartTime) scrollStartTime = now;
  if (!lastY || lastY != window.scrollY) {
    lastY = window.scrollY;
    return false;
  }
  // window.scrollY not changed
  //
  let lapse = now - scrollStartTime;
  if (lapse > stallMaxTime) {
    return true;
  }
  return false;
}

function received_gallery(data, opts) {
  window.scrollTo(0, 0);
  let div = ui_div_empty("id_gallery");
  if (!data) {
    return;
  }
  // div.style('width:1080px; display: flex; align-items: center;')
  // div.style("width:1080px; align-items: center;");
  rdata = data;
  updateCount += 1;

  // for (key in data) {
  //   console.log('key', key);
  //   let val = data[key];

  // Display in reverse order to see new additions first
  rarr = Object.values(data).reverse();
  if (opts && opts.doShuffle) {
    rarr = shuffle(rarr);
  }
  let r = rarr;
  rarr = [r[0],r[1],r[0],r[2],r[0],r[3],r[0]];

  nitems = rarr.length;
  for (let val of rarr) {
    // console.log('received_gallery val', val);
    // let img = createImg( 'https://p5js.org/assets/img/asterisk-01.png', 'the p5 magenta asterisk' );
    // select full resolution media if available
    //
    // let path = val.mediaPathFullRez ?? val.mediaPath;
    let path = val.mediaPathFullRez || val.mediaPath;
    let img = createImg(path, val.authorEmail, "", imageLoaded);
    div.child(img);

    let iwidth = rwidth;
    if (doSplat) {
      iwidth = random(100, 400);
    }
    img.style('width: ' + iwidth + 'px;');
    img.addClass('center-image')
    imgs.push(img);
    ui_init_update();
  }
}

function imageLoaded(arg) {
  // !!@ Displaying arg causes error
  // console.log('imageLoaded', arg);
  console.log("imageLoaded");
}

function calcTotalHeight() {
  totalHeight = 0;
  for (let img of imgs) {
    totalHeight += img.height;
  }
  // console.log('totalHeight', totalHeight)
  if (totalHeight > 0) {
    scrollYmax = totalHeight;
  }
}

function ui_remove_all() {
  shuffleBtn.remove();
  fullScreenBtn.remove();
  toggleScrollBtn.remove();
  splatBtn.remove();
}

function ui_init_update() {
  ui_span("date", a_version + formatDate());
  ui_span("updateCount", " updateCount:" + updateCount);
  ui_span("nitems", " nitems:" + nitems);
}

function formatDate() {
  // return '';
  return new Date().toISOString();
}

function ui_div_empty(id) {
  let div = select("#" + id);
  // console.log('ui_device_selection div', div);
  if (!div) {
    div = createDiv().id(id);
  } else {
    let children = div.child();
    for (let index = children.length - 1; index >= 0; index--) {
      let elm = children[index];
      elm.remove();
    }
  }
  return div;
}

function ui_span(id, html) {
  let span = select("#" + id);
  if (document.fullscreenElement) {
    if (span) {
      span.remove();
    }
    return;
  }
  if (!span) {
    span = createSpan().id(id);
  }
  span.html(html);
}

function ui_toggleFullScreen() {
  if (!document.documentElement.requestFullscreen) {
    console.log("NO document.documentElement.requestFullscreen");
    return;
  }
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// let galleryKey = 'mo-gallery-web';
// let galleryKey = 'mo-gallery-ims-web';

function check_url_param() {
  let query = window.location.search;
  console.log("query", query);
  if (query.length < 1) return;
  let params = params_query(query);
  let ngallery = params["gallery"];
  if (ngallery) {
    // mo-gallery-web
    // rasberry pie does not like back quote
    // galleryKey = `mo-gallery-${ngallery}-web`;
    // galleryKey = ngallery;
    galleryKey = "mo-gallery-" + ngallery;
  }
  console.log("galleryKey", galleryKey);
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function params_query(query) {
  // eg. query='abc=foo&def=%5Basf%5D&xyz=5'
  // params={abc: "foo", def: "[asf]", xyz: "5"}
  const urlParams = new URLSearchParams(query);
  const params = Object.fromEntries(urlParams);
  return params;
}

// https://mobilelabclass-itp.github.io/p5moLibrary/p5js_demo/createImg-board/
// https://mobilelabclass-itp.github.io/p5moLibrary/p5js_demo/createImg-board/?gallery=ims-web
// https://mobilelabclass-itp.github.io/p5moLibrary/p5js_demo/createImg-board/?gallery=web

// https://editor.p5js.org/jht1493/sketches/2OYRyVuhx
// firebase mo-gallery-1

// https://molab-itp.github.io/p5moLibrary/src/demo/mo-gallery-1/?v=119

// https://editor.p5js.org/p5name/sketches/8jzqiCbbk
// https://editor.p5js.org/jht9629-nyu/sketches/VtqUmOlGB
// firebase mo-gallery-ppt

/* Full-page container to center the image */
/* body, html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
 */
/* Optional styling for the image */
/* img {
  max-width: 100%;
  height: auto;
}
 */

    // avoid backquote for rasberry pi browser
    // img.style(`width: ${rwidth}px;`);


// https://editor.p5js.org/p5name/sketches/td6gIUqHZ
// mo-gallery-rroom renewal-rroom
// Display images from Firebase storage as a billboard using createImg
