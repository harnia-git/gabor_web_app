let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 8;
let cardSize = 150;
let images = [];

function preload() {
  for (let i = 0; i < 16; i++) {
    images[i] = loadImage('/static/img/image' + i + '.jpg');
  }
}

function setup() {
  createCanvas(600, 600);
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
    fill(0);
    text('Congratulations! You Win!', 50, height / 2);
  }
}

function displayCards() {
  for (let card of cards) {
    push(); // Save the current drawing state
    translate(card.x, card.y); // Move the origin to the card's center
    if (card.isFlipped || card.isMatched) {
      image(card.img, -cardSize / 2, -cardSize / 2, cardSize, cardSize);
    } else {
      fill(200);
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