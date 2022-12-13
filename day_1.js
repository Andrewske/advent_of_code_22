const fs = require('fs');
const input = fs.readFileSync('./day_1.txt', 'utf-8');

let elves = [];
let current = [];

input.split(/\r?\n/).forEach((line) => {
  if (line == '') {
    elves.push(current);
    current = [];
  } else {
    current.push(line);
  }
});

console.log(
  elves
    .map((arr) => arr.reduce((a, b) => a + Number(b), 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b)
);
