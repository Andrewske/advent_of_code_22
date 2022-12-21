const fs = require('fs');
const file = fs.readFileSync('./day_12.txt', 'utf-8');

// Got stuck on my solution and finished in day_12_video by watching thibpat use the dijkstra algorithm

const test = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const input = test.replace(/\r/g, '').trim().split('\n');
const gridHeight = input.length;
const gridWidth = input[0].length;
const visited = {};

const el = 'abcdefghijklmnopqrstuvwxyz'.split('');

const findLocation = (grid, isStart = true) => {
  const l = isStart ? 'S' : 'E';
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === l) return [i, j];
    }
  }
};

const end = findLocation(input, false);

const distance = ([x1, y1], [x2, y2]) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

const checkDir = (dir, [x1, y1], [x2, y2]) => {
  if (x2 < 0 || y2 < 0 || x2 >= gridHeight || y2 >= gridWidth) return false;
  //if (input[x2][y2] === 'E') return [[x2, y2], distance([x2, y2], end)];
  if (visited[[x2, y2]]) return false;
  //console.log([x1, y1], [x2, y2], distance([x2, y2], end));

  if ((input[x1][y1] === 'z') & (input[x2][y2] === 'E'))
    return [[x2, y2], distance([x2, y2], end)];

  if (input[x1][y1] !== 'S') {
    // console.log('indexOf', {
    //   curr: [x1, y1],
    //   next: [x2, y2],
    //   distance: distance([x2, y2], end),
    //   curr_i: el.indexOf(input[x1][y1]),
    //   next_i: el.indexOf(input[x2][y2]),
    // });
    if (el.indexOf(input[x2][y2]) === -1) return false;
    if (el.indexOf(input[x2][y2]) - el.indexOf(input[x1][y1]) > 1) return false;
  }

  return [[x2, y2], distance([x2, y2], end)];
};

const takeStep = (curr) => {
  if (!visited[curr]) {
    visited[curr] = true;
  }
  //console.log({ curr, next: [curr[0] - 1, curr[1]] });
  let moveUp = checkDir('up', curr, [curr[0] - 1, curr[1]]);
  //console.log({ curr, next: [curr[0] + 1, curr[1]] });
  let moveDown = checkDir('down', curr, [curr[0] + 1, curr[1]]);
  //console.log({ curr, next: [curr[0], curr[1] - 1] });
  let moveLeft = checkDir('left', curr, [curr[0], curr[1] - 1]);
  //console.log({ curr, next: [curr[0], curr[1] + 1] });
  let moveRight = checkDir('right', curr, [curr[0], curr[1] + 1]);

  let smallestDistance = Infinity;

  let moves = [moveUp, moveDown, moveLeft, moveRight].filter((x) => x != false);

  moves.forEach(([loc, dist]) => {
    if (dist < smallestDistance) {
      smallestDistance = dist;
    }
  });

  return moves.filter(([loc, dist]) => dist === smallestDistance)[0];
};

console.table(input);

const fewestSteps = () => {
  let curr = findLocation(input);
  let numSteps = 0;
  let end = false;

  while (!end) {
    try {
      let [next, dist] = takeStep(curr);
      console.log(next);
      curr = next;
      numSteps++;
      if (dist === 0) end = true;
    } catch (error) {
      console.log({ error, curr });
      end = true;
    }
  }

  return numSteps + 1;
};

const findPath = () => {
  let path = [findLocation(input)];

  let shortestPath = Infinity;
};

//console.log(takeStep([3, 1]));
//console.log('distance', distance([3, 2], end));
//console.log(fewestSteps());
console.table(input);
console.log(gridHeight, gridWidth, end);
