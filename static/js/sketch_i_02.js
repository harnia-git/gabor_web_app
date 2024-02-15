let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 8;
let cardSize = 150;
let images = [];
let t = 0; // time variable

function preload() {
  for (let i = 0; i < 16; i++) {
    images[i] = loadImage('/static/img/image' + i + '.jpg');
  }
}

function setup() {
  createCanvas(600, 600);
  noStroke();
  fill(40, 200, 40);
  createCards();
  shuffleCards();
}

function createCards() {
  let positions = createCardPositions();
  for (let i = 0; i < positions.length; i++) {
    let imgIndex = floor(i / 2);
    let card = {
      x: positions[i].x,
      y: positions[i].y,
      img: images[imgIndex],
      isFlipped: false,
      isMatched: false,
    };
    cards.push(card);
  }
}

function createCardPositions() {
  let positions = [];
  
  // 一時的な配列を作成し、初期の位置を格納します
  let initialPositions = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      initialPositions.push(createVector(j * cardSize + cardSize / 2, i * cardSize + cardSize / 2));
    }
  }

  // Fisher-Yates シャッフルアルゴリズムを使用してランダムに並び替えます
  while (initialPositions.length > 0) {
    const randomIndex = Math.floor(Math.random() * initialPositions.length);
    const randomPosition = initialPositions.splice(randomIndex, 1)[0];
    positions.push(randomPosition);
  }
  return positions;
}

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function draw() {
  background(1, 0, 1);
  displayCards();

  if (flippedCards.length === 2) {
    checkMatch();
  }

  if (matchedPairs === totalPairs) {
    textSize(24);
    fill(0, 255, 0);
    text('Congratulations! You Win!', 50, height / 2);
  }

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 30) {
    for (let y = 0; y <= height; y = y + 30) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 8); // draw particle
    }
  }

  t = t + 0.01; // update time
}

function displayCards() {
  for (let card of cards) {
    push(); // Save the current drawing state
    translate(card.x, card.y); // Move the origin to the card's center

    // 描画されるカードの部分
    if (card.isFlipped || card.isMatched) {
      image(card.img, -cardSize / 2, -cardSize / 2, cardSize, cardSize);
    } else {
      fill(255, 0, 0);
      // 黒い枠線の色を指定
      stroke(0);
      // 枠線の太さを指定
      strokeWeight(2);
      // 四角形を描画
      rect(-cardSize / 2, -cardSize / 2, cardSize, cardSize);
    }

    pop(); // Restore the original drawing state
  }
}


function mousePressed() {
  if (flippedCards.length < 2) {
    for (let card of cards) {
      if (!card.isFlipped && !card.isMatched && dist(mouseX, mouseY, card.x, card.y) < cardSize / 2) {
        card.isFlipped = true;
        flippedCards.push(card);
      }
    }
  }

  if (flippedCards.length === 2) {
    setTimeout(() => {
      flipBack();
    }, 1000);
  }
}

function checkMatch() {
  if (flippedCards[0].img === flippedCards[1].img) {
    flippedCards[0].isMatched = true;
    flippedCards[1].isMatched = true;
    flippedCards = [];
    matchedPairs++;
  } else {
    // If cards don't match, flip them back after a short delay
    setTimeout(() => {
      flipBack();
    }, 1000);
  }
}

function flipBack() {
  for (let card of flippedCards) {
    card.isFlipped = false;
  }
  flippedCards = [];
}