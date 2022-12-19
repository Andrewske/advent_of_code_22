const fs = require('fs');
const file = fs.readFileSync('./day_8.txt', 'utf-8');

const test = `30373
25512
65332
33549
35390`;

const input = file.split(/\r?\n/);

let visible = input.length * 4 - 4;

const checkVisible = (group, i) => {
  let group1 = group.slice(0, i);
  let group2 = group.slice(i + 1);

  return (
    !group1.filter((a) => a >= group[i]).length > 0 ||
    !group2.filter((b) => b >= group[i]).length > 0
  );
};

for (let x = 1; x < input.length - 1; x++) {
  for (let y = 1; y < input[x].length - 1; y++) {
    let row = input[x].split('');
    let col = input.map((row) => row[y]);

    if (checkVisible(row, y)) {
      visible += 1;
      continue;
    }

    if (checkVisible(col, x)) {
      visible += 1;
    }
  }
}

console.log(visible);
