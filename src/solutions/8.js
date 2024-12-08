const EMPTY = ".";

function findNextTower(map, symbol, startRow, startCol) {
  const towers = [];

  // search same row
  for (let col = startCol + 1; col < map[startRow].length; col += 1) {
    if (map[startRow][col] === symbol) {
      towers.push([startRow, col]);
    }
  }

  for (let row = startRow + 1; row < map.length; row += 1) {
    for (let col = 0; col < map[row].length; col += 1) {
      if (map[row][col] === symbol) {
        towers.push([row, col]);
      }
    }
  }

  return towers;
}

function findAntinodes(firstTowerCoord, nextTowers) {
  const antinodes = [];

  nextTowers.forEach((secondTowerCoord) => {
    const rowDiff = firstTowerCoord[0] - secondTowerCoord[0];
    const colDiff = firstTowerCoord[1] - secondTowerCoord[1];

    antinodes.push([
      firstTowerCoord[0] + rowDiff,
      firstTowerCoord[1] + colDiff,
    ]);
    antinodes.push([
      firstTowerCoord[0] - rowDiff * 2,
      firstTowerCoord[1] - colDiff * 2,
    ]);
  });

  return antinodes;
}

export function solutionPartOne(map) {
  const antinodes = new Map();

  // for each tower
  for (let row = 0; row < map.length; row += 1) {
    for (let col = 0; col < map[row].length; col += 1) {
      const symbol = map[row][col];

      // is tower
      if (symbol !== EMPTY) {
        const nextTowers = findNextTower(map, symbol, row, col);

        if (nextTowers.length) {
          const antis = findAntinodes([row, col], nextTowers);
          antis.forEach(([antinodeRow, antinodeCol]) => {
            if (
              antinodeRow >= 0 &&
              antinodeRow < map.length &&
              antinodeCol >= 0 &&
              antinodeCol < map[antinodeRow].length
            ) {
              antinodes.set([antinodeRow, antinodeCol].join(","));
            }
          });
        }
      }
    }
  }

  return antinodes.size;
}

function findAntinodesV2(map, firstTowerCoord, nextTowers) {
  const antinodes = [];

  nextTowers.forEach((secondTowerCoord) => {
    const rowDiff = firstTowerCoord[0] - secondTowerCoord[0];
    const colDiff = firstTowerCoord[1] - secondTowerCoord[1];

    let count = 0;
    let outOfBounds = false;
    while (!outOfBounds) {
      const newRow = firstTowerCoord[0] + rowDiff * count;
      const newCol = firstTowerCoord[1] + colDiff * count;

      if (
        newRow >= 0 &&
        newRow < map.length &&
        newCol >= 0 &&
        newCol < map[newRow].length
      ) {
        antinodes.push([newRow, newCol]);

        count += 1;
      } else {
        outOfBounds = true;
      }
    }

    count = 1;
    outOfBounds = false;
    while (!outOfBounds) {
      const newRow = firstTowerCoord[0] - rowDiff * count;
      const newCol = firstTowerCoord[1] - colDiff * count;

      if (
        newRow >= 0 &&
        newRow < map.length &&
        newCol >= 0 &&
        newCol < map[newRow].length
      ) {
        antinodes.push([newRow, newCol]);

        count += 1;
      } else {
        outOfBounds = true;
      }
    }
  });

  return antinodes;
}

export function solutionPartTwo(map) {
  const antinodes = new Map();

  // for each tower
  for (let row = 0; row < map.length; row += 1) {
    for (let col = 0; col < map[row].length; col += 1) {
      const symbol = map[row][col];

      // is tower
      if (symbol !== EMPTY) {
        const nextTowers = findNextTower(map, symbol, row, col);

        if (nextTowers.length) {
          const antis = findAntinodesV2(map, [row, col], nextTowers);
          antis.forEach(([antinodeRow, antinodeCol]) => {
            const key = [antinodeRow, antinodeCol].join(",");

            antinodes.set(key);
          });
        }
      }
    }
  }

  return antinodes.size;
}
