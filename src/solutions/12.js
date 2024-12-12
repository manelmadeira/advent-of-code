const DIRECTIONS = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

let up = {};
let down = {};
let left = {};
let right = {};

function addWalls(dir, row, col) {
  if (dir === 0) {
    if (right[col]) {
      right[col].push(row);
    } else {
      right[col] = [row];
    }
  } else if (dir === 1) {
    if (down[row]) {
      down[row].push(col);
    } else {
      down[row] = [col];
    }
  } else if (dir === 2) {
    if (left[col]) {
      left[col].push(row);
    } else {
      left[col] = [row];
    }
  } else if (dir === 3) {
    if (up[row]) {
      up[row].push(col);
    } else {
      up[row] = [col];
    }
  }
}

function mapRegion(map, visited, startingRow, startingCol) {
  let areaCount = 1;
  let externalWalls = 0;

  const maxRow = map.length - 1;
  const maxCol = map[0].length - 1;
  const letter = map[startingRow][startingCol];

  let neighbourCount = 0;
  for (let dir = 0; dir < DIRECTIONS.length; dir += 1) {
    const newRow = startingRow + DIRECTIONS[dir][0];
    const newCol = startingCol + DIRECTIONS[dir][1];
    const coordinateId = [newRow, newCol].join(";");

    if (newRow < 0 || newRow > maxRow || newCol < 0 || newCol > maxCol) {
      externalWalls += 1;
      addWalls(dir, newRow, newCol);
      continue;
    }

    const neighbourLetter = map[newRow][newCol];

    if (letter === neighbourLetter && !visited.has(coordinateId)) {
      neighbourCount += 1;

      visited.set(coordinateId, true);
      const [area, sides] = mapRegion(map, visited, newRow, newCol);

      externalWalls += sides;
      areaCount += area;
    } else if (!visited.has(coordinateId)) {
      externalWalls += 1;
      addWalls(dir, newRow, newCol);
    }
  }

  return [areaCount, externalWalls];
}

function countSides(up, down, left, right) {
  let sides = 0;

  [up, down, left, right].forEach((side) => {
    Object.keys(side).forEach((key) => {
      let internalCount = 1;
      const values = side[key].sort(function (a, b) {
        return a - b;
      });

      for (let i = 0; i < values.length - 1; i += 1) {
        if (values[i + 1] - values[i] > 1) {
          internalCount += 1;
        }
      }

      sides += internalCount;
    });
  });

  return sides;
}

export function solutionPartOne(map) {
  const mapCounter = new Map();
  const totalVisited = new Map();

  for (let row = 0; row < map.length; row += 1) {
    for (let col = 0; col < map[row].length; col += 1) {
      const letter = map[row][col];

      const previousVisited = totalVisited.get(letter);

      if (
        !previousVisited ||
        (previousVisited && !previousVisited.has([row, col].join(";")))
      ) {
        let visited = new Map();
        visited.set([row, col].join(";"), true);

        // reset walls
        up = {};
        down = {};
        left = {};
        right = {};

        const [area, walls] = mapRegion(map, visited, row, col);
        const sides = countSides(up, down, left, right);
        mapCounter.set(`${letter};${row};${col}`, [area, walls, sides]);

        if (totalVisited.has(letter)) {
          totalVisited.set(
            letter,
            new Map([...totalVisited.get(letter), ...visited])
          );
        } else {
          totalVisited.set(letter, visited);
        }
      }
    }
  }

  let sum = 0;
  mapCounter.forEach(([area, walls, sides], key) => {
    sum += area * walls;
  });

  let newSum = 0;
  mapCounter.forEach(([area, _, sides]) => {
    newSum += area * sides;
  });

  return [sum, newSum];
}
