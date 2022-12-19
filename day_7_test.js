const test = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const readData = () => {
  const setPath = (path, value, obj) => {
    let iter = obj;
    for (const folder of path.slice(0, -1)) {
      if (!iter[folder]) {
        iter[folder] = {};
      }
      iter = iter[folder];
    }
    iter[path.slice(-1)[0]] = value;
  };

  const data = test.split(/\r?\n/);

  const treeData = {};
  let i = 0;
  let currentPath = [];

  while (data[i]) {
    const tokens = data[i].split(' ');
    console.log(tokens);

    if (tokens[0] === '$') {
      if (tokens[1] === 'cd') {
        if (tokens[2] === '/') {
          currentPath = [];
        } else if (tokens[2] === '..') {
          currentPath.pop();
        } else {
          currentPath.push(tokens[2]);
        }
      }
    } else if (tokens[0] === 'dir') {
      // do nothing
    } else {
      setPath([...currentPath, tokens[1]], Number(tokens[0]), treeData);
    }

    i++;
  }

  // uncomment for viewing tree
  console.log(JSON.stringify(treeData, null, 2));

  return treeData;
};

const main = () => {
  const AT_MOST = 100000;
  const treeData = readData();
  const folderSizes = {};

  const calculateSize = (obj, currentPath = ['.']) => {
    let size = 0;

    for (const [key, value] of Object.entries(obj)) {
      size +=
        typeof value === 'object'
          ? calculateSize(value, [...currentPath, key])
          : value;
    }

    folderSizes[currentPath.join('/')] = size;

    return size;
  };

  calculateSize(treeData);

  const res = Object.values(folderSizes)
    .filter((size) => size <= AT_MOST)
    .reduce((a, b) => a + b, 0);

  console.log(res);
};

main();
