const fs = require('fs');
const file = fs.readFileSync('./day_14.txt', 'utf-8');

const test = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const lines = file.replace(/\r/g, '').trim().split('\n');

const getInput = () => {
  const map = new Set();

  let maxY = 0;

  for (const line of lines) {
    let pathPoints = line.split(' -> ');

    for (let i = 0; i < pathPoints.length - 1; i++) {
      let [x1, y1] = pathPoints[i].split(',').map(Number);
      let [x2, y2] = pathPoints[i + 1].split(',').map(Number);

      // Check for the boundaries
      if (maxY < Math.max(y1, y2)) maxY = Math.max(y1, y2);

      let xPoints = getBetweenPoints(x1, x2);
      let yPoints = getBetweenPoints(y1, y2);

      if (xPoints.length) {
        xPoints.forEach((x) => {
          map.add(`${x},${y1}`);
        });
      }

      if (yPoints.length) {
        yPoints.forEach((y) => {
          map.add(`${x1},${y}`);
        });
      }
    }
  }
  return { map, maxY };
};

const getBetweenPoints = (a, b) => {
  let min = Math.min(a, b);
  let max = Math.max(a, b);

  return Array.from(new Array(max - min + 1), (x, i) => i + min);
};

const setupMap = (paths, map) => {
  for (const path of paths) {
    let pathPoints = path.split(' -> ');

    for (let i = 0; i < pathPoints.length - 1; i++) {
      let [x1, y1] = pathPoints[i].split(',').map(Number);
      let [x2, y2] = pathPoints[i + 1].split(',').map(Number);

      // Check for the boundaries
      if (map.lowest < Math.max(y1, y2)) map.lowest = Math.max(y1, y2);

      let xPoints = getBetweenPoints(x1, x2);
      let yPoints = getBetweenPoints(y1, y2);

      if (xPoints.length) {
        xPoints.forEach((x) => {
          map.rocks.add(`${x},${y1}`);
        });
      }

      if (yPoints.length) {
        yPoints.forEach((y) => {
          map.rocks.add(`${x1},${y}`);
        });
      }
    }
  }
};

const move = (map, next) => {
  let [x, y] = next;

  let down = [x, y + 1];
  let left = [x - 1, y + 1];
  let right = [x + 1, y + 1];

  if (!map.has(`${x},${y + 1}`)) {
    return down;
  } else if (!map.has(`${x - 1},${y + 1}`)) {
    return left;
  } else if (!map.has(`${x + 1},${y + 1}`)) {
    return right;
  } else {
    map.add(`${x},${y}`);
    return null;
  }
};

const part1 = () => {
  const { map, maxY } = getInput();

  console.log(map);

  const start = [500, 1];

  let sandInEndlessVoid = false;
  let sandBlocks = 0;

  while (!sandInEndlessVoid) {
    let next = new Array(...start);
    sandBlocks++;

    while (!sandInEndlessVoid) {
      next = move(map, next);

      if (!next) break;

      if (next[1] > maxY) {
        sandInEndlessVoid = true;
        sandBlocks--;
      }
    }
  }

  console.log(sandBlocks);
};

const part2 = () => {
  const { map, maxY } = getInput();
  let sandBlocks = 0;

  while (true) {
    if (map.has(`${500},${0}`)) break;
    let x = 500;
    let y = 0;

    sandBlocks++;

    while (true) {
      if (y === maxY + 1) {
        map.add(`${x},${y}`);
        break;
      } else if (!map.has(`${x},${y + 1}`)) {
        y++;
      } else if (!map.has(`${x - 1},${y + 1}`)) {
        y++;
        x--;
      } else if (!map.has(`${x + 1},${y + 1}`)) {
        y++;
        x++;
      } else {
        map.add(`${x},${y}`);
        break;
      }
    }
  }

  console.log(sandBlocks);
};

//part1();
part2();
