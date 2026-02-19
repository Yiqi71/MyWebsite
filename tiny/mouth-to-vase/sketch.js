/*
 * Mouth Drawing Game + 3D Pattern View
 * - 2D drawing game using ml5.faceMesh (only mouth)
 * - Converts the recorded mouth-width pattern into a rotating 3D display
 */

let faceMesh;
let video;
let faces = [];
const options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

let recording = false;
let startTime = 0;
const duration = 3000;
let lines = [];

let show3D = false;
let modeEl;
let render3D;
let faceReady = false;

function setup() {
  const app = document.getElementById("app") || document.body;
  const canvas = createCanvas(640, 480);
  canvas.parent(app);

  render3D = createGraphics(640, 480, WEBGL);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  const btnRecord = createButton("Start Drawing");
  btnRecord.parent(app);
  btnRecord.mousePressed(startDrawing);

  const btn3D = createButton("Show 3D Pattern");
  btn3D.parent(app);
  btn3D.mousePressed(() => {
    show3D = !show3D;
  });

  modeEl = createP("Press START to record 3s");
  modeEl.parent(app);
  modeEl.style("font-size", "14px");
  modeEl.style("margin", "10px 0 0");

  textAlign(CENTER, CENTER);
  textSize(16);

  initFaceMesh();
}

function draw() {
  if (show3D) {
    draw3DPattern();
    return;
  }

  background(0);
  noFill();
  stroke(100);
  rect(100, 100, 200, 200);

  if (faces.length > 0) {
    const face = faces[0];
    const mouth = face && face.lips ? face.lips : null;

    if (mouth) {
      const mouthWidth = mouth.width || 0;
      const mouthHeight = mouth.height || 1;

      let scaledWidth = map(mouthWidth, 30, 120, 0, 100);
      scaledWidth = constrain(scaledWidth, 20, 100);
      const aspectRatio = mouthWidth / mouthHeight;
      const safeAspect = aspectRatio > 0 ? aspectRatio : 1;
      const scaledHeight = scaledWidth / safeAspect;

      push();
      translate(350, 150);
      image(
        video,
        0,
        0,
        scaledWidth,
        scaledHeight,
        mouth.x,
        mouth.y,
        mouth.width,
        mouth.height
      );

      stroke(255);
      strokeWeight(2);
      const lineCenterY = scaledHeight / 2;
      line(0, lineCenterY, scaledWidth, lineCenterY);
      pop();

      if (recording) {
        const t = millis() - startTime;
        if (t > duration) {
          recording = false;
          modeEl.html("Recording finished. Toggle 3D Pattern.");
        } else {
          lines.push(mouthWidth);
          const y = map(t, 0, duration, 300, 100);
          const w = map(mouthWidth, 30, 120, 0, 100);

          stroke(255);
          line(200 - w / 2, y, 200 + w / 2, y);
        }
      }
    }
  }

  if (!recording && lines.length > 0) {
    stroke(255);
    noFill();
    const step = 200 / lines.length;
    for (let i = 0; i < lines.length; i += 1) {
      const w = map(lines[i], 30, 120, 0, 100);
      const y = 300 - i * step;
      line(200 - w / 2, y, 200 + w / 2, y);
    }
  }

  noStroke();
  fill(255);
  text(
    recording ? "Recording..." : "Press START to record 3s",
    width / 2,
    height - 30
  );
}

function startDrawing() {
  if (show3D) {
    show3D = false;
  }
  if (!faceReady) {
    modeEl.html("Face model is not ready yet.");
    return;
  }
  lines = [];
  startTime = millis();
  recording = true;
  modeEl.html("Recording...");
}

function gotFaces(results) {
  faces = results || [];
}

function startFaceDetection() {
  if (faceMesh && typeof faceMesh.detectStart === "function") {
    faceMesh.detectStart(video, gotFaces);
    faceReady = true;
    return;
  }
  detectLoop();
  faceReady = true;
}

function detectLoop() {
  if (!faceMesh || typeof faceMesh.detect !== "function") {
    modeEl && modeEl.html("FaceMesh API unavailable. Check ml5 version.");
    return;
  }
  faceMesh.detect(video, (results) => {
    gotFaces(results);
    setTimeout(detectLoop, 30);
  });
}

async function initFaceMesh() {
  try {
    if (ml5.tf && typeof ml5.tf.setBackend === "function") {
      await ml5.tf.setBackend("webgl");
      if (typeof ml5.tf.ready === "function") {
        await ml5.tf.ready();
      }
    }
    faceMesh = await ml5.faceMesh(options);
    startFaceDetection();
    modeEl.html("Press START to record 3s");
  } catch (error) {
    console.error("FaceMesh init failed:", error);
    modeEl.html("Face model failed to load. Try refreshing once.");
  }
}

function draw3DPattern() {
  render3D.background(0);
  render3D.noFill();
  render3D.resetMatrix();

  const yaw = millis() * 0.00035;
  render3D.rotateY(yaw);
  render3D.rotateX(-PI / 6);

  if (lines.length > 0) {
    const numSegments = 32;

    for (let seg = 0; seg < numSegments; seg += 1) {
      const angle = (TWO_PI / numSegments) * seg;
      const trailAlpha = map(seg, 0, numSegments, 0, 80);
      render3D.stroke(255, trailAlpha);
      render3D.strokeWeight(3);

      render3D.beginShape();
      for (let i = 0; i < lines.length; i += 1) {
        const w = map(lines[i], 30, 120, 10, 120);
        const y = map(i, 0, lines.length, 100, -100);
        const x = cos(angle) * (w / 2);
        const z = sin(angle) * (w / 2);
        render3D.vertex(x, y, z);
      }
      render3D.endShape();
    }
  }

  render3D.ambientLight(80);
  render3D.directionalLight(255, 255, 255, 0, -1, 1);

  image(render3D, 0, 0);

  noStroke();
  fill(255);
  text("3D Vase Illusion - Press Show 3D Pattern to return", width / 2, 26);
}
