const fs = require('fs');
const file = fs.readFileSync('./day_3.txt', 'utf-8');

const test = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

const input = file.split(/\r?\n/);

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let total = 0;

for (let i = 0; i < input.length - 2; i += 3) {
  let [elf1, elf2, elf3] = [
    input[i].split(''),
    input[i + 1].split(''),
    input[i + 2].split(''),
  ].sort((a, b) => a.length - b.length);

  let no = [];

  elf1.every((item) => {
    if (no.includes(item)) return true;

    if (elf2.includes(item) && elf3.includes(item)) {
      console.log(item);
      total += priority.indexOf(item) + 1;
      return false;
    } else {
      no.push(item);
      return true;
    }
  });
}

console.log(total);

// input.forEach((sack) => {
//   const half = Math.ceil(sack.length / 2);
//   let [comp1, comp2] = [
//     sack.slice(0, half).split(''),
//     sack.slice(half).split(''),
//   ];

//   let error = comp1.filter((item) => comp2.includes(item));

//   total += priority.indexOf(error[0]) + 1;
// });

// console.log(total);
