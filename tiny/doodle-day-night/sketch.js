// p5.js + ml5.js (DoodleNet)
// Draw "sun" -> day mode. Draw "moon" or "star" -> night mode.

let classifier;
let statusEl;
let mode = "day";
let lastSwitch = 0;
const minSwitchMs = 800;

const ALIASES = {
  "sun": "sun",
  "moon": "moon",
  "full moon": "moon",
  "star": "star",
  "stars": "star"
};
const NEED = { sun: "day", moon: "night", star: "night" };
const THRESH = 0.5;

let drawLayer;
const pad = 16;
let stars = [];

function preload() {
  classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
  const app = document.getElementById("app") || document.body;
  const canvas = createCanvas(640, 420);
  canvas.parent(app);
  pixelDensity(1);

  drawLayer = createGraphics(280, 280);
  drawLayer.pixelDensity(1);
  clearDoodle();

  const clearButton = createButton("Clear Canvas");
  clearButton.parent(app);
  clearButton.mousePressed(clearDoodle);

  statusEl = createP("Draw a sun, moon, or star");
  statusEl.parent(app);
  statusEl.style("font-size", "14px");
  statusEl.style("margin", "8px 0");

  startClassification();

  for (let i = 0; i < 120; i += 1) {
    stars.push({
      x: random(width),
      y: random(height),
      r: random(1, 2.5),
      tw: random(TWO_PI)
    });
  }
}

function draw() {
  renderScene();

  push();
  translate(pad, pad);
  noStroke();
  fill(255);
  rect(-4, -4, drawLayer.width + 8, drawLayer.height + 8, 8);
  image(drawLayer, 0, 0);
  pop();

  const inPanel = mouseX >= pad && mouseX < pad + drawLayer.width &&
                  mouseY >= pad && mouseY < pad + drawLayer.height;
  if (mouseIsPressed && inPanel) {
    const lx = mouseX - pad;
    const ly = mouseY - pad;
    drawLayer.stroke(0);
    drawLayer.strokeWeight(18);
    drawLayer.line(lx, ly, pmouseX - pad, pmouseY - pad);
  }
}

function renderScene() {
  if (mode === "day") {
    background(180, 220, 255);
    noStroke();
    fill(90, 190, 120);
    rect(0, height * 0.7, width, height * 0.3);

    const t = millis() * 0.001;
    const sx = width * 0.75 + sin(t) * 30;
    const sy = height * 0.25 + cos(t) * 12;
    fill(255, 210, 60);
    noStroke();
    circle(sx, sy, 80);
  } else {
    for (let y = 0; y < height; y += 1) {
      const c = lerpColor(color(10, 15, 30), color(30, 40, 80), y / height);
      stroke(c);
      line(0, y, width, y);
    }
    noStroke();
    for (const s of stars) {
      const a = 180 + 75 * sin(millis() * 0.002 + s.tw);
      fill(255, 255, 255, a);
      circle(s.x, s.y, s.r);
    }
    const t = millis() * 0.0008;
    const mx = width * 0.7 + sin(t * 3) * 20;
    const my = height * 0.25 + cos(t * 3) * 10;
    fill(240, 240, 220);
    noStroke();
    circle(mx, my, 70);
    fill(10, 15, 30);
    circle(mx + 15, my - 5, 70);
  }
}

function startClassification() {
  if (classifier && typeof classifier.classifyStart === "function") {
    classifier.classifyStart(drawLayer.canvas, gotResults);
    return;
  }
  classifyLoop();
}

function classifyLoop() {
  if (!classifier || typeof classifier.classify !== "function") {
    if (statusEl) {
      statusEl.html("Classifier API unavailable. Check ml5 version.");
    }
    return;
  }
  classifier.classify(drawLayer.canvas, (error, results) => {
    if (!error) {
      gotResults(results || []);
    }
    setTimeout(classifyLoop, 120);
  });
}

function gotResults(results) {
  if (!results || results.length === 0) {
    return;
  }

  let best = null;
  for (const r of results) {
    const label = String(r.label || "").toLowerCase();
    const canon = ALIASES[label];
    if (!canon) {
      continue;
    }
    if (!best || r.confidence > best.confidence) {
      best = { canon, confidence: r.confidence };
    }
  }

  if (!best) {
    statusEl.html(`waiting 0.00 | mode: ${mode}`);
    return;
  }

  statusEl.html(`${best.canon} ${nf(best.confidence, 0, 2)} | mode: ${mode}`);

  const now = millis();
  if (best.confidence >= THRESH && now - lastSwitch > minSwitchMs) {
    const target = NEED[best.canon];
    if (target && mode !== target) {
      mode = target;
      lastSwitch = now;
    }
  }
}

function clearDoodle() {
  drawLayer.background(255);
}