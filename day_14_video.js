const fs = require('fs');
const file = fs.readFileSync('./day_14.txt', 'utf-8');

const test = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const lines = file.replace(/\r/g, '').trim().split('\n');

const getInput = () => {
  const map = new Set();

  let maxY = 0;

  for (const line of lines) {
    const points = line.split(' -> ').map((point) => {
      const [x, y] = point.split(',').map(Number);

      if (y > maxY) maxY = y;

      return { x, y };
    });

    let currentPoint = points.shift();

    while (points.length) {
      let targetPoint = points.shift();

      // Draw line between points

      while (
        currentPoint.x !== targetPoint.x ||
        currentPoint.y !== targetPoint.y
      ) {
        map.add(`${currentPoint.x},${currentPoint.y}`);
        if (currentPoint.x !== targetPoint.x) {
          const delta =
            (targetPoint.x - currentPoint.x) /
            Math.abs(targetPoint.x - currentPoint.x);
          currentPoint.x += delta;
        } else {
          const delta =
            (targetPoint.y - currentPoint.y) /
            Math.abs(targetPoint.y - currentPoint.y);
          currentPoint.y += delta;
        }
      }
      map.add(`${currentPoint.x},${currentPoint.y}`);
    }
  }
  return { map, maxY };
};

const part1 = () => {
  const { map, maxY } = getInput();

  let sandIntoEndlessVoid = false;
  let sandBlocks = 0;

  while (!sandIntoEndlessVoid) {
    let point = { x: 500, y: 0 };

    sandBlocks++;

    while (!sandIntoEndlessVoid) {
      if (!map.has(`${point.x},${point.y + 1}`)) {
        point.y++;
      } else if (!map.has(`${point.x - 1},${point.y + 1}`)) {
        point.y++;
        point.x--;
      } else if (!map.has(`${point.x + 1},${point.y + 1}`)) {
        point.y++;
        point.x++;
      } else {
        map.add(`${point.x},${point.y}`);
        break;
      }
      if (point.y >= maxY) {
        sandIntoEndlessVoid = true;
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
    let point = { x: 500, y: 0 };

    sandBlocks++;

    while (true) {
      if (point.y === maxY + 1) {
        map.add(`${point.x},${point.y}`);
        break;
      } else if (!map.has(`${point.x},${point.y + 1}`)) {
        point.y++;
      } else if (!map.has(`${point.x - 1},${point.y + 1}`)) {
        point.y++;
        point.x--;
      } else if (!map.has(`${point.x + 1},${point.y + 1}`)) {
        point.y++;
        point.x++;
      } else {
        map.add(`${point.x},${point.y}`);
        break;
      }
    }
  }

  console.log(sandBlocks);
};

part1();
//part2();
