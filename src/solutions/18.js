import { transpileModule } from "typescript";

const WALL = "#";
const EMPTY = ".";
const DIRECTIONS = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

let queue = [];
let valids = [];

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

export function solutionPartOne(map) {
  queue = [
    {
      row: 0,
      col: 0,
      dir: 0,
      visited: new Map(),
      score: 0,
    },
  ];

  valids = [];

  const maxCells = new Map();

  while (queue.length > 0) {
    const head = queue.shift();

    for (let d = 0; d < DIRECTIONS.length; d += 1) {
      // don't go back
      if (head.dir === (d + 2) % DIRECTIONS.length) {
        continue;
      }

      const nextRow = head.row + DIRECTIONS[d][0];
      const nextCol = head.col + DIRECTIONS[d][1];

      if (nextRow < 0 || nextRow > map.length - 1) {
        continue;
      }

      if (nextCol < 0 || nextCol > map[nextRow].length - 1) {
        continue;
      }

      const nextPos = map[nextRow][nextCol];
      const nextKey = `${nextRow}:${nextCol}`;

      if (nextPos === WALL) {
        continue;
      }

      if (nextRow === map.length - 1 && nextCol === map[nextRow].length - 1) {
        head.visited.set(nextKey, d);
        head.score += 1;

        valids.push(head);

        break;
      }

      if (nextPos === EMPTY && !head.visited.has(nextKey)) {
        const newHead = {
          row: nextRow,
          col: nextCol,
          dir: d,
          visited: new Map(head.visited),
          score: head.score + 1,
        };
        newHead.visited.set(nextKey, d);

        const newKeyDir = `${nextKey}:${d}`;
        if (maxCells.has(newKeyDir)) {
          const score = maxCells.get(newKeyDir);

          if (newHead.score >= score) {
            break;
          } else {
            maxCells.set(newKeyDir, newHead.score);
          }
        } else {
          maxCells.set(newKeyDir, newHead.score);
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

  return visitPath ? visitPath.size : false;
}

function createMap(coords, maxBytes, width, height) {
  const map = [];
  for (let row = 0; row < height + 1; row += 1) {
    const newRow = [];

    for (let col = 0; col < width + 1; col += 1) {
      newRow.push(".");
    }

    map.push(newRow);
  }

  for (let i = 0; i < maxBytes; i += 1) {
    const [col, row] = coords[i].split(",");
    map[row][col] = "#";
  }

  return map;
}

export function solutionPartTwo(coords, width, height) {
  let prevMaxBytes = 0;
  let maxBytes = coords.length - 1;

  while (true) {
    const map = createMap(coords, maxBytes, width, height);
    const path = solutionPartOne(map);

    if (!path) {
      if (Math.abs(prevMaxBytes - maxBytes) === 1) {
        return coords[maxBytes - 1];
      }
    }

    const newMaxBytes = Math.ceil(Math.abs(prevMaxBytes - maxBytes) / 2);
    if (path) {
      const tmp = maxBytes + newMaxBytes;

      prevMaxBytes = maxBytes;
      maxBytes = tmp;
    } else {
      const tmp = maxBytes - newMaxBytes;

      prevMaxBytes = maxBytes;
      maxBytes = tmp;
    }
  }
}
