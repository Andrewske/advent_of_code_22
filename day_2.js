const fs = require('fs');
const file = fs.readFileSync('./day_2.txt', 'utf-8');

const input = file.split(/\r?\n/);

const key = {
  X: {
    points: 1,
    C: 'win',
    B: 'lose',
    A: 'tie',
  },
  Y: {
    points: 2,
    C: 'lose',
    B: 'tie',
    A: 'win',
  },
  Z: {
    points: 3,
    C: 'tie',
    B: 'win',
    A: 'lose',
  },
};

let total = 0;

input.forEach((match) => {
  let [elfPick, myPick] = match.split(' ');

  switch (key[myPick][elfPick]) {
    case 'win':
      total += key[myPick].points + 6;
      break;
    case 'tie':
      total += key[myPick].points + 3;
      break;
    case 'lose':
      total += key[myPick].points + 0;
      break;
  }
});

console.log(total);
