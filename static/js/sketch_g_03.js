let lattice;
let num = 5;
let scalar;
let tiles = [];

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 1);
  background(0, 0, 1);
  scalar = height * 1.0 / num;
  makeLattice();
  makePatternP6M();
  drawTiling();
}

function draw() {
  // No code needed here for this example
}

function mouseClicked() {
  makePatternP6M();
  drawTiling();
}

function makeLattice() {
  let base0 = createVector(cos(PI / 2), sin(PI / 2));
  let base1 = createVector(cos(PI / 6), sin(PI / 6));

  let m = ceil(num / base1.x);
  lattice = new Array(num + 1).fill().map(() => new Array(m + 1));

  for (let i = 0; i < num + 1; i++) {
    for (let j = 0; j < m + 1; j++) {
      let v = p5.Vector.add(p5.Vector.mult(base0, i * scalar), p5.Vector.mult(base1, j * scalar));
      lattice[i][j] = createVector(v.x, v.y % (height + scalar));
    }
  }
}

function makePatternP6M() {
  tiles = [];

  let rand = [];
  for (let i = 0; i < 4; i++) {
    rand[i] = random(-1, 1);
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      let tri = makeTriangle(rand);
      tri[0].mult(1, pow(-1, i));
      tri[1].mult(1, pow(-1, i));
      tri[2].mult(1, pow(-1, i));
      tri = rotateTriangle(tri, PI / 3 * j);
      tiles.push({ triangle: tri, color: color(random(1), 1, 1) });
    }
  }
}

function rotateTriangle(tri, angle) {
  for (let i = 0; i < tri.length; i++) {
    let x = tri[i].x;
    let y = tri[i].y;
    tri[i].x = x * cos(angle) - y * sin(angle);
    tri[i].y = x * sin(angle) + y * cos(angle);
  }
  return tri;
}

function drawTiling() {
  // Clear the canvas
  background(0, 0, 1);

  for (let vecArr of lattice) {
    for (let vec of vecArr) {
      for (let tile of tiles) {
        push();
        translate(vec.x, vec.y);
        fill(tile.color);
        noStroke();
        beginShape();
        vertex(0, 0);
        vertex(tile.triangle[0].x, tile.triangle[0].y);
        vertex(tile.triangle[1].x, tile.triangle[1].y);
        endShape(CLOSE);
        pop();
      }
    }
  }
}

function makeTriangle(rand) {
  let v = [];
  for (let i = 0; i < 2; i++) {
    v[i] = p5.Vector.fromAngle(i * PI / 3).mult(scalar);
  }

  let ctr = [];
  for (let i = 0; i < 4; i++) {
    ctr[i] = p5.Vector.mult(v[floor(i / 2)], rand[i]);
  }

  return [createVector(0, 0), createVector(ctr[0].x, ctr[0].y), createVector(ctr[1].x, ctr[1].y)];
}
