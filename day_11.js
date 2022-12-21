const fs = require('fs');
const file = fs.readFileSync('./day_11.txt', 'utf-8');

const test = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const input = file.split(/\r?\n/);

const formatInput = () => {
  let monkeys = {};
  let divisors = [];
  const startingItems = (str) => {
    return str
      .split(':')[1]
      .split(',')
      .map((n) => Number(n));
  };

  const operation = (str) => {
    let [t, n, e, o, op, val] = str.split(' ').filter((x) => x != '');

    //console.log(str.split(' ').filter((x) => x != ''));

    return [op, Number(val)];
  };

  const divisibleBy = (str) => {
    return (
      str
        .split(' ')
        .filter((n) => Number(n))
        .map((n) => Number(n))[0] ?? 0
    );
  };

  for (let i = 0; i < input.length; i += 7) {
    let n = Math.floor(i / 7);

    //console.log(input.slice(i, i + 7));

    let monkey = {
      startingItems: startingItems(input[i + 1]),
      operation: operation(input[i + 2]),
      test: divisibleBy(input[i + 3]),
      ifTrue: divisibleBy(input[i + 4]),
      ifFalse: divisibleBy(input[i + 5]),
      numItemsInspected: 0,
    };
    divisors.push(monkey.test);
    //console.log(monkey);
    monkeys[n] = monkey;
  }

  return [monkeys, divisors];
};

const [monkeys, divisors] = formatInput();

let divisor = divisors.reduce((a, b) => a * b);

const rounds = 10000;

const updateWorryLevel = (worryLevel, operation) => {
  let opValue = Number.isNaN(operation[1]) ? worryLevel : operation[1];

  switch (operation[0]) {
    case '+':
      worryLevel += opValue;
      break;
    case '-':
      worryLevel -= opValue;
      break;
    case '*':
      worryLevel *= opValue;
      break;
    case '/':
      worryLevel /= opValue;
      break;
  }

  return worryLevel % divisor;
};

const runTest = (worryLevel, divisor, ifTrue, ifFalse) => {
  return worryLevel % divisor === 0 ? ifTrue : ifFalse;
};

for (let i = 1; i <= rounds; i++) {
  for ([key, val] of Object.entries(monkeys)) {
    let items = [...val.startingItems];

    items.forEach((item) => {
      let worryLevel = updateWorryLevel(item, val.operation);

      let newMonkey = runTest(worryLevel, val.test, val.ifTrue, val.ifFalse);

      //console.log(worryLevel, newMonkey);
      monkeys[key].numItemsInspected += 1;
      monkeys[newMonkey].startingItems.push(worryLevel);
      monkeys[key].startingItems.shift();
    });
  }
}

let itemsInspected = [];

for ([key, val] of Object.entries(monkeys)) {
  itemsInspected.push(val.numItemsInspected);
}

let monkeyBusiness = itemsInspected
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, b) => a * b);

console.log(monkeys);
console.log(monkeyBusiness);
