const fs = require('fs');
const file = fs.readFileSync('./day_15.txt', 'utf-8');

const test = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const lines = file.replace(/\r/g, '').trim().split('\n');

const manhattanDistance = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const getInput = (rowNumber = 0, beaconsOnRow = new Set()) => {
  const regexForX = /x=(?<x>-?\d*\.{0,1}\d+)/;
  const regexForY = /y=(?<y>-?\d*\.{0,1}\d+)/;

  let sensorPositions = [];

  for (const line of lines) {
    let sensor = {};
    let points = line.match(/x=(-?\d*\.{0,1}\d+), y=(-?\d*\.{0,1}\d+)/g);

    let [[x1, y1], [x2, y2]] = points.map((point) => {
      let x = point.match(regexForX).groups.x;
      let y = point.match(regexForY).groups.y;

      return [x, y];
    });

    if (Number(y2) === rowNumber) {
      //console.log(line);
      beaconsOnRow.add(`${x2},${y2}`);
    }

    sensor.x = Number(x1);
    sensor.y = Number(y1);
    sensor.distance = manhattanDistance(x1, y1, x2, y2);

    sensorPositions.push(sensor);
  }

  return sensorPositions;
};

const pointsWithinDistance = (
  { x, y, distance },
  points = [],
  row,
  max = 0
) => {
  if (max > 0) {
    for (let i = 0; i <= max; i++) {
      for (let j = 0; j <= max; j++) {
        if (points.has(`${i},${j}`)) continue;
        if (manhattanDistance(x, y, i, j) <= distance) {
          points.add(`${i},${j}`);
        }
      }
    }
  } else {
    for (let i = x - distance; i <= x + distance; i++) {
      if (manhattanDistance(x, y, i, row) <= distance) {
        points.push([i, row]);
      }
    }
  }

  return points;
};

// console.log(
//   pointsWithinDistance(
//     { x: 8, y: 7, distance: 9 },
//     (points = {}),
//     (row = 0),
//     (max = 20)
//   )
// );
// console.log(manhattanDistance(8, 7, 12, 3));

const part1 = () => {
  const row = 2000000;
  //const row = 10;
  let beaconsOnRow = new Set();
  const sensors = getInput(row, beaconsOnRow);
  let pointsOnRow = new Set();

  for (const sensor of sensors) {
    let points = [];

    pointsWithinDistance(sensor, points, row);

    points
      .filter(([x, y]) => y === row)
      .map(([x, y]) => `${x},${y}`)
      .forEach(pointsOnRow.add, pointsOnRow);
  }

  console.log(pointsOnRow.size - beaconsOnRow.size);
};

const part2 = () => {
  const row = 11;
  const max = 4000000;
  //const max = 20;

  const sensors = getInput();

  for (let y = 0; y < max; y++) {
    const intervals = [];

    for (const sensor of sensors) {
      const minDistance = manhattanDistance(sensor.x, sensor.y, sensor.x, y);

      if (minDistance <= sensor.distance) {
        const distanceAroundSensorX = sensor.distance - minDistance;
        let from = sensor.x - distanceAroundSensorX;
        let to = sensor.x + distanceAroundSensorX;

        intervals.push([from, to]);
      }
    }

    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i - 1][1] >= intervals[i][0]) {
        intervals[i - 1][1] = Math.max(intervals[i - 1][1], intervals[i][1]);
        intervals.splice(i, 1);
        i--;
      }
    }

    const res = [];
    for (const interval of intervals) {
      if (interval[0] > max || 0 > interval[1]) {
        continue;
      }
      res.push([Math.max(interval[0], 0), Math.min(interval[1], max)]);
    }

    if (res.length > 1) {
      const x = res[0][1] + 1;
      console.log(x * 4e6 + y);
      return;
    }
  }

  // for (const sensor of sensors) {
  //   pointsWithinDistance(sensor, points, row, max);

  //   // points
  //   //   .filter(([x, y]) => y === row)
  //   //   .map(([x, y]) => `${x},${y}`)
  //   //   .forEach(pointsOnRow.add, pointsOnRow);
  // }

  // //console.log(points);

  // for (let i = 0; i <= max; i++) {
  //   for (let j = 0; j <= max; j++) {
  //     if (!points.has(`${i},${j}`)) {
  //       console.log([i, j]);
  //     }
  //   }
  // }

  //console.log(points);

  //console.log(pointsOnRow.size - beaconsOnRow.size);
};

//part1();
part2();
