let images = [];
let selectedImage;
let gridSize = 4;
let cellSize;
let resultMessage;

function preload() {
  for (let i = 1; i <= gridSize * gridSize; i++) {
    images.push(loadImage(`static/img/image${i}.jpg`));
  }
}

function setup() {
  // 左側のキャンバス
  createCanvas(600, 600);
  cellSize = width / gridSize;

  resultMessage = createP(''); // 結果を表示するための要素
  resultMessage.style('font-size', '24px');

  // ゲームを開始
  startGame();
}

function draw() {
  background(255);

  // 左側のキャンバスに画像群を表示
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const imgIndex = i * gridSize + j;
      image(images[imgIndex], j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }

  // マウスが左側のキャンバス上でクリックされたら判定
  if (mouseIsPressed && mouseX < width) {
    checkAnswer();
  }
}

// ゲーム開始時に初期化
function startGame() {
  // ランダムに1つの画像を選択
  selectedImage = random(images);

  // シャッフルした画像群を表示順に設定
  images = shuffle(images);

  // 結果メッセージをリセット
  resultMessage.html('');
}

// 正解かどうかを確認
function checkAnswer() {
  // クリックされたセルのインデックスを計算
  const clickedCellX = floor(mouseX / cellSize);
  const clickedCellY = floor(mouseY / cellSize);
  const clickedIndex = clickedCellY * gridSize + clickedCellX;

  // 選択された画像とクリックされた画像が同じか判定
  if (images[clickedIndex] === selectedImage) {
    resultMessage.html('OK');
  } else {
    resultMessage.html('NG');
  }

  // 1秒後に次のゲームを始める
  setTimeout(startGame, 1000);
}
