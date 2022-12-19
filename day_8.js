const fs = require('fs');
const file = fs.readFileSync('./day_8.txt', 'utf-8');

const test = `30373
25512
65332
33549
35390`;

const input = file.split(/\r?\n/).map((row) => row.split(''));

let visible = input.length * 4 - 4;

const checkVisible = (group, i) => {
  let group1 = group.slice(0, i);
  let group2 = group.slice(i + 1);

  return (
    !group1.filter((a) => a >= group[i]).length > 0 ||
    !group2.filter((b) => b >= group[i]).length > 0
  );
};

const viewingDistance = (group, x) => {
  let total = 0;

  group.every((el) => {
    total += 1;
    return el < x;
  });

  return total;
};

const main = () => {
  let maxScenicScore = 0;

  for (let x = 1; x < input.length - 1; x++) {
    for (let y = 1; y < input[x].length - 1; y++) {
      let row = input[x];
      let col = input.map((row) => row[y]);
      let el = input[x][y];

      let left = viewingDistance(row.slice(0, y).reverse(), el);
      let right = viewingDistance(row.slice(y + 1), el);
      let up = viewingDistance(col.slice(0, x).reverse(), el);
      let down = viewingDistance(col.slice(x + 1), el);

      let score = left * right * up * down;

      maxScenicScore = score > maxScenicScore ? score : maxScenicScore;

      // Part 1
      if (checkVisible(row, y)) {
        visible += 1;
        continue;
      }

      if (checkVisible(col, x)) {
        visible += 1;
      }
    }
  }
  return maxScenicScore;
};

console.log(main());
console.log(visible);
