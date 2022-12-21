const fs = require('fs');
const file = fs.readFileSync('./day_13.txt', 'utf-8');

const test = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

let isTest = test;

const lines = test.replace(/\r/g, '').trim().split('\n');

const getInput = () => {
  return [...lines];
};

const part1 = () => {
  const input = getInput();
};

const part2 = () => {
  const input = getInput();
};

part1();
part2();
