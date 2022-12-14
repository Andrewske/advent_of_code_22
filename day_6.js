const fs = require('fs');
const file = fs.readFileSync('./day_6.txt', 'utf-8');

const input = file.split(/\r?\n/)[0];

const test = 'bvwbjplbgvbhsrlpgdmjqwftvncz';

const notUnique = (letters) => {
  let arr = letters.split('');

  const hash = {};

  for (let i = 0; i < arr.length; i++) {
    if (hash[arr[i]]) return true;
    hash[arr[i]] = 1;
  }

  return false;
};

let pos = 4;

while (notUnique(input.slice(pos - 4, pos))) {
  pos += 1;
}

console.log(pos);
