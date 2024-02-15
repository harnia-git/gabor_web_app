let cp5;
let lattice;
let base = [];
let row = 30;
let col;
let scalar;
let tileColor;
let hor = 0,
  ver = 0; // 初期値を設定
let img;
let coordinatesTextbox;
let resultTextbox;
let numberTextbox;
let numb = [0, 0];
let cnt = 0;
let flag = false;

function preload() {
    img = loadImage("/static/merged_imagecol01.png"); // 画像のパスを正しく指定してください
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 1);
  scalar = height * 1.0 / row;
  controller();
  makeHexVector();
  col = ceil(row / (base[1].x - 1.0 / sqrt(3)));
  setTileColor();
  coordinatesTextbox = document.getElementById("coordinates");
  resultTextbox = document.getElementById("result");
  numberTextbox = document.getElementById("number");
}

function draw() {
  background(1, 0, 1);
  deformLattice();
  drawTiling(); // deformHex()を呼び出す必要がなくなりました
}

function handle(x){
    cnt++;
    if(cnt % 2 != 0){
        numb[0] = x;
    } else {
        numb[1] = x;
    }
        if (numb[0] == '1' && numb[1] == '4') {
           resultTextbox.value = 'OK';
        } else if (numb[0] == '2' && numb[1] == '11') {
           resultTextbox.value = 'OK';
        } else if (numb[0] == '3' && numb[1] == '7') {
           resultTextbox.value = 'OK';
        } else if (numb[0] == '4' && numb[1] == '9') {
           resultTextbox.value = 'OK';
        } else if (numb[0] == '5' && numb[1] == '11') {
           resultTextbox.value = 'OK';
        } else if (numb[0] == '6' && numb[1] == '15') {
           resultTextbox.value = 'OK';
        } else if (numb[0] == '8' && numb[1] == '10') {
           resultTextbox.value = 'OK';
        } else if (numb[0] == '13' && numb[1] == '16') {
           resultTextbox.value = 'OK';
        } else if (numb[0] == '12' && numb[1] == '1') {
            resultTextbox.value = 'OK';
        } else if (numb[0] == '14' && numb[1] == '2') {
            resultTextbox.value = 'OK';
        } else if (numb[0] == '7' && numb[1] == '3') {
            resultTextbox.value = 'OK';
        } else if (numb[0] == '9' && numb[1] == '4') {
            resultTextbox.value = 'OK';
        } else if (numb[0] == '11' && numb[1] == '5') {
            resultTextbox.value = 'OK';
        } else if (numb[0] == '15' && numb[1] == '6') {
            resultTextbox.value = 'OK';
        } else if (numb[0] == '10' && numb[1] == '8') {
            resultTextbox.value = 'OK';
        } else if (numb[0] == '16' && numb[1] == '13'){
            resultTextbox.value = 'OK';
        } else {
        resultTextbox.value = '';
    }
    console.log(`x: ${x}`);
    console.log(`cnt: ${cnt}`);
    console.log(`numb[0]: ${numb[0]}`);
    console.log(`numb[1]: ${numb[1]}`);
}

function mouseClicked() {
    var x = mouseX;
    var y = mouseY;
    coordinatesTextbox.value = '座標: ' + x + ', ' + y;

    if (x >= 0 && x <= 149 && y >= 0 && y <= 149) {
        numberTextbox.value = '1';
        handle(numberTextbox.value);
    }  else if (x >= 150 && x <= 299 && y >= 0 && y <= 149) {
        numberTextbox.value = '2';
        handle(numberTextbox.value);
    }  else if (x >= 300 && x <= 449 && y >= 0 && y <= 149) {
        numberTextbox.value = '3';
        handle(numberTextbox.value);
    }  else if (x >= 450 && x <= 599 && y >= 0 && y <= 149) {
        numberTextbox.value = '4';
        handle(numberTextbox.value);
    }  else if (x >= 0 && x <= 149 && y >= 150 && y <= 299) {
        numberTextbox.value = '5';
        handle(numberTextbox.value);
    }  else if (x >= 150 && x <= 299 && y >= 150 && y <= 299) {
        numberTextbox.value = '6';
        handle(numberTextbox.value);
    }  else if (x >= 300 && x <= 449 && y >= 150 && y <= 299) {
        numberTextbox.value = '7';
        handle(numberTextbox.value);
    }  else if (x >= 450 && x <= 599 && y >= 150 && y <= 299) {
        numberTextbox.value = '8';
        handle(numberTextbox.value);
    }  else if (x >= 0 && x <= 149 && y >= 300 && y <= 449)  {
        numberTextbox.value = '9';
        handle(numberTextbox.value);
    }  else if (x >= 150 && x <= 299 && y >= 300 && y <= 449)  {
        numberTextbox.value = '10';
        handle(numberTextbox.value);
    }  else if (x >= 300 && x <= 449 && y >= 300 && y <= 449)  {
        numberTextbox.value = '11';
        handle(numberTextbox.value);
    }  else if (x >= 450 && x <= 599 && y >= 300 && y <= 449)  {
        numberTextbox.value = '12';
        handle(numberTextbox.value);
    }  else if (x >= 0 && x <= 149 && y >= 450 && y <= 599)  {
        numberTextbox.value = '13';
        handle(numberTextbox.value);
    }  else if (x >= 150 && x <= 299 && y >= 450 && y <= 599)  {
        numberTextbox.value = '14';
        handle(numberTextbox.value);
    }  else if (x >= 300 && x <= 449 && y >= 450 && y <= 599)  {
        numberTextbox.value = '15';
        handle(numberTextbox.value);
    }  else if (x >= 450 && x <= 599 && y >= 450 && y <= 599)  {
        numberTextbox.value = '16';
        handle(numberTextbox.value);
    }  else  {
        numberTextbox.value = '0';
        handle(numberTextbox.value);
    }
}

function controller() {
  cp5 = createSlider(-1, (sqrt(3) - 1) / 2, 0, 0.01);
  cp5.position(900, 10);
  cp5.changed(() => hor = cp5.value());

  cp5 = createSlider(0, 1, 0, 0.01);
  cp5.position(900, 50);
  cp5.changed(() => ver = cp5.value());
}

function makeHexVector() {
  base[0] = createVector(cos(PI / 2), sin(PI / 2));
  base[1] = createVector(cos(PI / 6), sin(PI / 6));
}

function setTileColor() {
  tileColor = new Array(row + 1)
    .fill(0)
    .map(() => new Array(col + 1).fill(color(random(1), 0.3, 0.8))); 
}

function deformLattice() {
  lattice = new Array(row + 1).fill(0).map(() => new Array(col + 1));
  for (let i = 0; i < row + 1; i++) {
    for (let j = 0; j < col + 1; j++) {
      let v = createVector(base[0].x * i * scalar, base[0].y * i * scalar);
      v.add(createVector(base[1].x * j * scalar, base[1].y * j * scalar));
      v.add(hor * scalar * j / sqrt(3), 0);
      lattice[i][j] = createVector(v.x, v.y % (height + scalar));
    }
  }
}

function drawTiling() {
  for (let i = 0; i < lattice.length; i++) {
    for (let j = 0; j < lattice[0].length; j++) {
      push();
      translate(lattice[i][j].x, lattice[i][j].y);
      scale(pow(-1, j), 1);
      fill(tileColor[i][j]);
      drawHexagon();
      pop();
    }
  }
  image(img, 0, 0, width, height);
}

function drawHexagon() {
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = PI / 3 * i;
    let x = cos(angle) * (scalar / sqrt(3));
    let y = sin(angle) * (scalar / sqrt(3));
    x = x * (1 + hor);
    if (i > 1 && i < 5) {
      y = y - 0.5 * ver * scalar / sqrt(3);
    } else {
      y = y + 0.5 * ver * scalar / sqrt(3);
    }
    vertex(x, y);
  }
  endShape(CLOSE);
}
