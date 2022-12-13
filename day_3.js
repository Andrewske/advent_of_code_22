const fs = require('fs');
const file = fs.readFileSync('./day_3.txt', 'utf-8');

const test = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

const input = file.split(/\r?\n/);

const priority = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let total = 0;

input.forEach((sack) => {
  const half = Math.ceil(sack.length / 2);
  let [comp1, comp2] = [
    sack.slice(0, half).split(''),
    sack.slice(half).split(''),
  ];

  let error = comp1.filter((item) => comp2.includes(item));

  total += priority.indexOf(error[0]) + 1;
});

console.log(total);
