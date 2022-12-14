const fs = require('fs');
const file = fs.readFileSync('./day_5.txt', 'utf-8');

const input = file.split(/\r?\n/);

const startingStacks = input.slice(0, input.indexOf(''));

const moves = input.slice(input.indexOf('') + 1);

const numberOfStacks = Math.max(
  ...startingStacks
    .slice(startingStacks.length - 1)[0]
    .split(' ')
    .filter((x) => x !== '')
    .map((a) => Number(a))
);

let stacks = [...Array(numberOfStacks).fill([])];

for (let i = startingStacks.length - 2; i >= 0; i--) {
  let stack = startingStacks[i].split('');
  for (let j = 1; j <= stack.length - 1; j += 4) {
    if (stack[j] !== ' ') {
      stacks[Math.floor(j / 4)] = [...stacks[Math.floor(j / 4)], stack[j]];
    }
  }
}

moves.forEach((move) => {
  let [quantity, from, to] = move.match(/\d+/g);

  let moving = stacks[from - 1].splice(stacks[from - 1].length - quantity);

  stacks[to - 1] = [...stacks[to - 1], ...moving];
});

console.log(stacks);

console.log(
  stacks.map((stack) => stack.filter((x, i) => i === stack.length - 1))
);
