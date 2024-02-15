let img;
let coordinatesTextbox;
let resultTextbox;
let numberTextbox;
let selectedNumbers = [];
let cnt = 0;
let selectedImageNumber = 1; // 選択された画像の番号

function preload() {
  loadSelectedImage();
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  frameRate(10);
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
  image(img, 0, 0);
  loadPixels();
  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let loc = (x + y * img.width) * 4;
      let r = img.pixels[loc];
      
      let maxdist = 100;
      let d = Math.abs(x - mouseX) + Math.abs(y - mouseY);
      let adjustbrightness = (255 * (maxdist - d)) / maxdist;
      r += adjustbrightness;
      
      let pixloc = (y * width + x) * 4;
      pixels[pixloc] = r;
      pixels[pixloc + 1] = r;
      pixels[pixloc + 2] = r;
      pixels[pixloc + 3] = 255;
    }
  }
  updatePixels(); // getImageDataのパフォーマンス向上のためにwillReadFrequentlyをtrueに設定
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
