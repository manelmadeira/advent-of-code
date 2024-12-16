const WALL = "#";
const EMPTY = ".";
const END = "E";

const DIRECTIONS = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

function printVisited(map, visited) {
  const tmpArr = [];
  for (let row = 0; row < map.length; row += 1) {
    const tmpRow = [];

    for (let col = 0; col < map[row].length; col += 1) {
      if (
        visited.has(`${row}:${col}`) ||
        visited.has(`${row}:${col}:0`) ||
        visited.has(`${row}:${col}:1`) ||
        visited.has(`${row}:${col}:2`) ||
        visited.has(`${row}:${col}:3`)
      ) {
        tmpRow.push("O");
      } else {
        tmpRow.push(map[row][col]);
      }
    }

    tmpArr.push(tmpRow);
  }

  console.log(tmpArr.map((row) => row.join("")).join("\n"));
}

function countRotations(currentDir, newDir) {
  const dirs = [
    [1, 2, 3, 0, 1, 2, 3],
    [2, 3, 0, 1, 2, 3, 0],
    [3, 0, 1, 2, 3, 0, 1],
    [0, 1, 2, 3, 0, 1, 2],
  ];

  let minDiff = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < dirs[currentDir].length; i += 1) {
    if (dirs[currentDir][i] === newDir && Math.abs(i - 3) < minDiff) {
      minDiff = Math.abs(i - 3);
    }
  }

  return minDiff;
}

function calculate(currentDir, nextDir) {
  return 1 + countRotations(currentDir, nextDir) * 1000;
}

let queue = [];
let valids = [];

function isStillValid(head) {
  if (!valids.length) {
    return true;
  }

  for (let v = 0; v < valids.length; v += 1) {
    if (head.score > valids[v].score) {
      return false;
    }
  }

  return true;
}

function findAllCells(maxCells, visitPath) {
  let finalCells = new Map();
  let queue = [];

  visitPath.forEach((cell, key) => {
    queue.push(`${key}:${cell}`);
  });

  while (queue.length > 0) {
    const cell = queue.shift();

    if (!finalCells.has(cell)) {
      finalCells.set(cell);

      if (maxCells.has(cell)) {
        const [_, paths] = maxCells.get(cell);

        paths.forEach((path) => {
          path.forEach((_, coord) => {
            queue.push(`${coord}:${_}`);
          });
        });
      }
    }
  }

  return finalCells;
}

export function solutionPartOne(map) {
  const startRow = map.length - 2;
  const startCol = 1;
  const initDir = 0; // right

  queue = [
    {
      row: startRow,
      col: startCol,
      dir: initDir,
      visited: new Map(),
      score: 0,
    },
  ];
  valids = [];

  const maxCells = new Map();

  let count = 0;
  while (queue.length > 0) {
    const head = queue.shift();

    count += 1;

    for (let d = 0; d < DIRECTIONS.length; d += 1) {
      // don't go back
      if (head.dir === (d + 2) % DIRECTIONS.length) {
        continue;
      }

      const nextRow = head.row + DIRECTIONS[d][0];
      const nextCol = head.col + DIRECTIONS[d][1];
      const nextPos = map[nextRow][nextCol];
      const nextKey = `${nextRow}:${nextCol}`;

      if (nextPos === WALL) {
        continue;
      }

      if (nextPos === END) {
        head.visited.set(nextKey, d);
        head.score += calculate(head.dir, d);

        valids.push(head);

        break;
      }

      if (nextPos === EMPTY && !head.visited.has(nextKey)) {
        const newHead = {
          row: nextRow,
          col: nextCol,
          dir: d,
          visited: new Map(head.visited),
          score: head.score + calculate(head.dir, d),
        };

        newHead.visited.set(nextKey, d);

        const newKeyDir = `${nextKey}:${d}`;
        if (maxCells.has(newKeyDir)) {
          const [score, paths] = maxCells.get(newKeyDir);

          if (newHead.score > score) {
            break;
          } else if (newHead.score === score) {
            maxCells.set(newKeyDir, [score, [...paths, newHead.visited]]);
            break;
          } else {
            maxCells.set(newKeyDir, [newHead.score, [newHead.visited]]);
          }
        } else {
          maxCells.set(newKeyDir, [newHead.score, [newHead.visited]]);
        }

        if (isStillValid(newHead)) {
          queue.push(newHead);
        }
      }
    }
  }

  let min = Number.MAX_SAFE_INTEGER;
  let visitPath;
  for (let v = 0; v < valids.length; v += 1) {
    if (valids[v].score < min) {
      min = valids[v].score;
      visitPath = valids[v].visited;
    }
  }

  const finalCells = findAllCells(maxCells, visitPath);

  // printVisited(map, finalCells);

  let sum = new Map();
  finalCells.forEach((_, key) => {
    const [row, col] = key.split(":");

    sum.set(`${row}:${col}`);
  });

  return [min, sum.size + 1];
}
