const fs = require('fs');
const file = fs.readFileSync('./day_10.txt', 'utf-8');

const test = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const input = file.split(/\r?\n/).map((row) => row.split(' '));

const CRT = Array.from({ length: 6 }, (e) => Array(40).fill('.'));

let cycleNumber = 1;
let valueOfX = 1;

let signalStrengths = {};

const draw = (i) => {
  let row = Math.floor(i / 40);
  let col = i % 40;

  if (col >= valueOfX - 1 && col <= valueOfX + 1) {
    CRT[row][col] = '#';
  }
};

const cycle = (func, value) => {
  draw(cycleNumber - 1);

  cycleNumber++;
  valueOfX += value;

  if (cycleNumber % 20 === 0) {
    signalStrengths[cycleNumber] = cycleNumber * valueOfX;
  }
};

const program = () => {
  for (let i = 0; i < input.length; i++) {
    let [func, value = 0] = input[i];
    switch (func) {
      case 'addx':
        cycle('addx', 0);
        cycle('addx', Number(value));
        break;
      case 'noop':
        cycle('noop', 0);
        break;
    }
  }
};

program();

let answer = [20, 60, 100, 140, 180, 220].reduce(
  (a, b) => a + signalStrengths[b],
  0
);

console.log(answer);

console.log(CRT.map((line) => line.reduce((a, b) => a + b)));
