const fs = require('fs');
const file = fs.readFileSync('./day_4.txt', 'utf-8');

const test = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const input = file.split(/\r?\n/);

let total = 0;

input.forEach((pair) => {
  let [elf1, elf2] = pair
    .split(',')
    .map((x) => x.split('-').map((y) => Number(y)));

  if (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) {
    total += 1;
    console.log([elf1, elf2]);
  } else if (elf2[0] <= elf1[0] && elf2[1] >= elf1[1]) {
    total += 1;
    console.log([elf1, elf2]);
  }
});

console.log(total);
