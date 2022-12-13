const fs = require('fs');
const file = fs.readFileSync('./day_2.txt', 'utf-8');

const input = file.split(/\r?\n/);

const key = {
  X: {
    points: 1,
    C: 'Y',
    B: 'X',
    A: 'Z',
  },
  Y: {
    points: 2,
    C: 'Z',
    B: 'Y',
    A: 'X',
  },
  Z: {
    points: 3,
    C: 'X',
    B: 'Z',
    A: 'Y',
  },
};

let total = 0;

input.forEach((match) => {
  let [elfPick, myPick] = match.split(' ');

  let choice = key[myPick][elfPick];

  console.log([elfPick, myPick, choice]);

  switch (myPick) {
    case 'Z':
      total += key[choice].points + 6;
      break;
    case 'Y':
      total += key[choice].points + 3;
      break;
    case 'X':
      total += key[choice].points + 0;
      break;
  }
});

console.log(total);
