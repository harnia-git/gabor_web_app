let img;
let shapes = [];
const shapesNum = 100;
let coordinatesTextbox;
let resultTextbox;
let numberTextbox;
let selectedNumbers = [];
let cnt = 0;
let selectedImageNumber = 1; // 選択された画像の番号

const palette = ["#00ff7f", "#ffff00", "#00ffff", "#0000cd", "#ff69b4"];

function preload() {
  loadSelectedImage();
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  for (let i = 0; i < shapesNum; i++) {
    shapes.push(new Shape());
  }

  noStroke();
  background(palette[0]);
  createInterface();
}

function loadSelectedImage() {
  img = loadImage(`/static/merged_imagecol0${selectedImageNumber}.png`);
}

function createInterface() {
  coordinatesTextbox = document.getElementById("coordinates");
  resultTextbox = document.getElementById("result");
  numberTextbox = document.getElementById("number");

  // HTMLファイルに imageSelector というIDを持つ要素が存在するか確認する
  const imageSelector = document.getElementById("imageSelector");
  if (imageSelector) {
      imageSelector.addEventListener("change", function () {
          selectedImageNumber = parseInt(imageSelector.value);
          background(255);
          loadSelectedImage();
          resultTextbox.value = '';
      });

      // 画像の番号を1から5までの選択肢としてドロップダウンメニューに追加
      for (let i = 1; i <= 5; i++) {
          const option = document.createElement("option");
          option.value = i;
          imageSelector.add(option);
      }
  } else {
      console.error("Element with id 'imageSelector' not found in the HTML file.");
  }
}

function draw() {
  for (let i = 0; i < shapes.length; i++) {
    // 図形の一部にオーバーレイをかける。それ以外は通常描画
    if (i < shapes.length / 3) {
      blendMode(BLEND);
    } else {
      blendMode(OVERLAY);
    }
    shapes[i].move();
    shapes[i].display();
  }
  image(img, 0, 0);
}

function handle(number) {
  cnt++;
  selectedNumbers.push(number);

  if (cnt % 2 === 0) {
      const pair = checkPair(selectedNumbers[0], selectedNumbers[1]);
      resultTextbox.value = pair ? 'OK' : 'NG';
      selectedNumbers = [];
  } else {
      resultTextbox.value = '';
  }
}

function checkPair(num1, num2) {
  // 選択された画像によって条件を変更
  const pairs = getPairsForSelectedImage();

  return pairs.some(pair => (pair[0] === num1 && pair[1] === num2) || (pair[0] === num2 && pair[1] === num1));
}

function getPairsForSelectedImage() {
  // 画像に応じてペアの条件を返す
  switch (selectedImageNumber) {
      case 1:
          return [
              ['1', '4'], ['2', '11'], ['3', '16'],
              ['5', '14'], ['6', '12'], ['7', '9'],
              ['8', '15'], ['12', '14'], ['4', '1'],
              ['7', '2'], ['11', '4'], ['10', '5'],
              ['16', '6'], ['13', '8'], ['15', '9'],
              ['14', '12']
          ];
      case 2:
          return [
              ['1', '13'], ['2', '5'], ['3', '16'],
              ['4', '9'], ['6', '15'], ['7', '11'],
              ['8', '10'], ['12', '14'], ['13', '1'],
              ['5', '2'], ['16', '3'], ['9', '4'],
              ['15', '6'], ['11', '7'], ['10', '8'],
              ['14', '12']
          ];
      case 3:
          return [
              ['1', '12'], ['2', '15'], ['3', '6'],
              ['4', '5'], ['7', '9'], ['8', '14'],
              ['10', '13'], ['11', '16'], ['12', '1'],
              ['15', '2'], ['6', '3'], ['5', '4'],
              ['9', '7'], ['14', '8'], ['13', '10'],
              ['16', '11']
          ];
      case 4:
          return [
              ['1', '3'], ['2', '8'], ['4', '11'],
              ['5', '13'], ['6', '7'], ['9', '15'],
              ['10', '12'], ['14', '16'], ['3', '1'],
              ['8', '2'], ['11', '4'], ['13', '5'],
              ['7', '6'], ['15', '9'], ['12', '10'],
              ['16', '14']
          ];
      default:
          return [];
  }
}

function getRegion(x, y) {
  const gridX = Math.floor(x / 150);
  const gridY = Math.floor(y / 150);
  return gridY * 4 + gridX + 1; // 領域の番号は1から始まるため
}

function mouseClicked() {
  const x = mouseX;
  const y = mouseY;
  coordinatesTextbox.value = '座標: ' + x + ', ' + y;

  const region = getRegion(x, y);
  numberTextbox.value = region.toString();

  handle(numberTextbox.value);
}

class Shape {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.maxD = random(5, 100);
    this.d = 0;
    this.nx = random(1000);
    this.ny = random(1000);
    this.n = random(1000);
    this.rotateSpeed = random(3, 10) * random([-1, 1]);
    this.c = color(random(palette));
    this.c.setAlpha(random(5, 30));
    this.shapeAngle = 360 / random([3, 6]);
  }

  move() {
    this.d = this.maxD * abs(sin(this.n * 1000));

    this.x = map(noise(this.n, this.nx), 0, 1, -width * 0.5, width * 1.5);
    this.y = map(noise(this.n, this.ny), 0, 1, -height * 0.5, height * 1.5);
    this.n += 0.005;
  }

  display() {
    fill(this.c);

    push();
    translate(this.x, this.y);
    rotate(frameCount * this.rotateSpeed);
    beginShape();
    for (let i = 0; i < 360; i += this.shapeAngle) {
      vertex(cos(i) * this.d, sin(i) * this.d);
    }
    endShape(CLOSE);
    pop();
  }
}