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

const getInput = (isTest = false, groupByPairs = false) => {
  let exp = groupByPairs ? '\n\n' : '\n';
  let data = isTest ? test : file;

  return data.replace(/\r/g, '').trim().split(exp);
};

const comparePairs = (left, right, result) => {
  let leftIsInt = typeof left === 'number';
  let rightIsInt = typeof right === 'number';

  if (leftIsInt && rightIsInt) {
    if (left !== right) {
      result.rightOrder = left < right;
      return;
    }
  } else if (!leftIsInt && !rightIsInt) {
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

      comparePairs(left[index], right[index], result);

      if (typeof result.rightOrder !== 'undefined') {
        return;
      }

      index++;
    }
  } else {
    if (leftIsInt) {
      comparePairs([left], right, result);
    } else {
      comparePairs(left, [right], result);
    }
  }
};

const part1 = () => {
  let groups = getInput(false, true).map((group) => {
    const [left, right] = group.split('\n').map((line) => JSON.parse(line));

    return { left, right };
  });

  let numCorrect = 0;

  for (let i = 0; i < groups.length; i++) {
    let [left, right] = groups[i];

    let res = {};

    comparePairs(left, right, res);

    if (res.rightOrder) {
      numCorrect += i + 1;
    }
  }

  console.log(numCorrect);
};

const part2 = () => {
  let input = getInput(false, false)
    .filter((x) => x !== '')
    .map((line) => JSON.parse(line));

  const dividerPackets = [[[2]], [[6]]];

  input = [...input, ...dividerPackets];

  input.sort((a, b) => {
    let res = {};
    comparePairs(a, b, res);
    if (res.rightOrder) {
      return -1;
    } else {
      return 1;
    }
  });

  console.log(input);

  console.log(
    dividerPackets.map((p) => input.indexOf(p) + 1).reduce((a, b) => a * b, 1)
  );

  //   groups.sort(({ left, right }) => {
  //     //console.log(left, right);
  //     let result = {};

  //     checkOrder(left, right, result);

  //     //console.log(i + 1, result);
  //     if (result.rightOrder) numCorrect += i + 1;
  //   });
};

//part1();
part2();
