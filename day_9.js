const fs = require('fs');
const file = fs.readFileSync('./day_9.txt', 'utf-8');

const test = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const input = file;

// Global Variables

let tails = 9;
let visitedPositions = {};
let knots = {
  0: { x: 0, y: 0 }, // head knot
};

// Move the head in one of the four directions

function moveHead(direction) {
  switch (direction) {
    case 'U': // UP
      ++knots[0].y;
      break;
    case 'L': // LEFT
      --knots[0].x;
      break;
    case 'R': // RIGHT
      ++knots[0].x;
      break;
    case 'D': // DOWN
      --knots[0].y;
      break;
  }

  moveTail(1);
}

// Move the tails according with the described rules

function moveTail(knot) {
  if (knot < 1 || knot > tails) {
    return;
  }

  if (!knots[knot]) {
    knots[knot] = { x: 0, y: 0 };
    recordVisit(knot);
  }

  let head = knots[knot - 1];
  let tail = knots[knot];

  let isDiagonal = head.x !== tail.x && head.y !== tail.y;
  let isTopLeft = head.x < tail.x && head.y > tail.y;
  let isTopRight = head.x > tail.x && head.y > tail.y;
  let isBottomLeft = head.x < tail.x && head.y < tail.y;
  let isBottomRight = head.x > tail.x && head.y < tail.y;

  if (head.x - tail.x < -1) {
    if (isDiagonal) {
      moveTailDiagonally(
        tail,
        isTopLeft,
        isTopRight,
        isBottomLeft,
        isBottomRight
      );
    } else {
      tail.x -= 1;
    }

    recordVisit(knot);
    moveTail(knot + 1);

    return;
  }

  if (head.x - tail.x > 1) {
    if (isDiagonal) {
      moveTailDiagonally(
        tail,
        isTopLeft,
        isTopRight,
        isBottomLeft,
        isBottomRight
      );
    } else {
      tail.x += 1;
    }

    recordVisit(knot);
    moveTail(knot + 1);

    return;
  }

  if (head.y - tail.y < -1) {
    if (isDiagonal) {
      moveTailDiagonally(
        tail,
        isTopLeft,
        isTopRight,
        isBottomLeft,
        isBottomRight
      );
    } else {
      tail.y -= 1;
    }

    recordVisit(knot);
    moveTail(knot + 1);

    return;
  }

  if (head.y - tail.y > 1) {
    if (isDiagonal) {
      moveTailDiagonally(
        tail,
        isTopLeft,
        isTopRight,
        isBottomLeft,
        isBottomRight
      );
    } else {
      tail.y += 1;
    }

    recordVisit(knot);
    moveTail(knot + 1);

    return;
  }

  moveTail(knot + 1);
}

// Move the tail diagonally according with the direction

function moveTailDiagonally(tail, ...directions) {
  [isTopLeft, isTopRight, isBottomLeft, isBottomRight] = directions;

  if (isTopLeft + isTopRight + isBottomLeft + isBottomRight > 1) {
    throw 'invalid input';
  }

  if (isTopLeft) {
    tail.x -= 1;
    tail.y += 1;
  }

  if (isTopRight) {
    tail.x += 1;
    tail.y += 1;
  }

  if (isBottomLeft) {
    tail.x -= 1;
    tail.y -= 1;
  }

  if (isBottomRight) {
    tail.x += 1;
    tail.y -= 1;
  }
}

// Record the visited positions

function recordVisit(knot) {
  if (!visitedPositions[knot]) {
    visitedPositions[knot] = {};
  }

  let position = knots[knot].x + '|' + knots[knot].y;

  if (
    Math.abs(knots[knot - 1].x - knots[knot].x) > 1 ||
    Math.abs(knots[knot - 1].y - knots[knot].y) > 1
  ) {
    throw 'invalid input for the knot ' + knot;
  }

  visitedPositions[knot][position] = true;
}

// Execute the movements

input.split('\n').forEach((step) => {
  [direction, movements] = step.split(' ');

  for (let index = 0; index < parseInt(movements); ++index) {
    moveHead(direction);
  }
});

// Get the answers

let answer1 = Object.keys(visitedPositions['1']).length;
let answer2 = Object.keys(visitedPositions['9']).length;

// Output the answers

console.log(answer1, answer2);
