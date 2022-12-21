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

const getInput = (grouByPairs) => {
  let exp = groupByPairs ? '\n\n' : '\n';
  const groups = file.replace(/\r/g, '').trim().split(groups);
  return groups.map((group) => {
    const [left, right] = group.split('\n').map((line) => JSON.parse(line));

    return { left, right };
  });
};

const checkOrder = (left, right, result) => {
  const leftIsNumber = typeof left === 'number';
  const rightIsNumber = typeof right === 'number';

  if (leftIsNumber && rightIsNumber) {
    if (left < right) {
      result.rightOrder = true;
      return;
    }
    if (left > right) {
      result.rightOrder = false;
      return;
    }
  } else if (!leftIsNumber && !rightIsNumber) {
    let index = 0;

    while (true) {
      if (index > left.length - 1 && index <= right.length - 1) {
        // left ran out of items
        result.rightOrder = true;
        return;
      } else if (index <= left.length - 1 && index > right.length - 1) {
        // right ran out of items
        result.rightOrder = false;
        return;
      } else if (index > left.length - 1 && index > right.length - 1) {
        // both ran out of items
        return;
      }

      // compare the two elements
      checkOrder(left[index], right[index], result);

      // if we have set the variable result.rightOrder then stop
      if (typeof result.rightOrder !== 'undefined') {
        return;
      }

      index++;
    }
  } else {
    if (leftIsNumber) {
      checkOrder([left], right, result);
    } else {
      checkOrder(left, [right], result);
    }
  }
};

const part1 = () => {
  const groups = getInput(true);

  let numCorrect = 0;

  groups.map(({ left, right }, i) => {
    //console.log(left, right);
    let result = {};

    checkOrder(left, right, result);

    //console.log(i + 1, result);
    if (result.rightOrder) numCorrect += i + 1;
  });

  console.log(numCorrect);
};

const part2 = () => {
  const input = getInput(false);

  console.log(input);

  //   groups.sort(({ left, right }) => {
  //     //console.log(left, right);
  //     let result = {};

  //     checkOrder(left, right, result);

  //     //console.log(i + 1, result);
  //     if (result.rightOrder) numCorrect += i + 1;
  //   });
};

part1();
part2();
