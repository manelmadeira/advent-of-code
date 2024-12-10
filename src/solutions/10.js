const MOVE_COORD = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
];

function canMove(map, coordinates, step) {
  const stepCoordinates = [];
  const maxRow = map.length - 1;
  const maxCol = map[0].length - 1;

  const [row, col] = coordinates;

  for (let i = 0; i < MOVE_COORD.length; i += 1) {
    const newRow = row + MOVE_COORD[i][0];
    const newCol = col + MOVE_COORD[i][1];

    if (newRow < 0 || newRow > maxRow || newCol < 0 || newCol > maxCol) {
      continue;
    }

    const foundNextStep = map[newRow][newCol] === step + 1;

    if (foundNextStep && step + 1 === 9) {
      const point = [newRow, newCol].join(",");

      if (!stepCoordinates.includes(point)) {
        stepCoordinates.push(point);
      }
    } else if (foundNextStep) {
      const tempPaths = canMove(map, [newRow, newCol], step + 1);

      (tempPaths || []).forEach((point) => {
        if (!stepCoordinates.includes(point)) {
          stepCoordinates.push(point);
        }
      });
    }
  }

  return stepCoordinates.length > 0 ? stepCoordinates : null;
}

export function solutionPartOne(map) {
  const foundPaths = new Map();

  for (let row = 0; row < map.length; row += 1) {
    for (let col = 0; col < map[row].length; col += 1) {
      const pointer = map[row][col];

      if (pointer === 0) {
        // check surrondings
        const paths = canMove(map, [row, col], 0);

        if (paths) {
          foundPaths.set([row, col].join(","), paths);
        }
      }
    }
  }

  let sum = 0;
  foundPaths.forEach((path) => {
    sum += path.length;
  });

  return sum;
}

function canMoveTwo(map, coordinates, step) {
  const stepCoordinates = [];
  const maxRow = map.length - 1;
  const maxCol = map[0].length - 1;

  const [row, col] = coordinates;

  for (let i = 0; i < MOVE_COORD.length; i += 1) {
    const newRow = row + MOVE_COORD[i][0];
    const newCol = col + MOVE_COORD[i][1];

    if (newRow < 0 || newRow > maxRow || newCol < 0 || newCol > maxCol) {
      continue;
    }

    const foundNextStep = map[newRow][newCol] === step + 1;

    if (foundNextStep && step + 1 === 9) {
      const point = [row, col].join(",");
      const nextPoint = [newRow, newCol].join(",");

      stepCoordinates.push([point, nextPoint]);
    } else if (foundNextStep) {
      const tempPaths = canMoveTwo(map, [newRow, newCol], step + 1);

      if (tempPaths !== null) {
        tempPaths.forEach((path) => {
          stepCoordinates.push([[row, col].join(","), ...path]);
        });
      }
    }
  }

  return stepCoordinates.length > 0 ? stepCoordinates : null;
}

export function solutionPartTwo(map) {
  const foundPaths = new Map();

  for (let row = 0; row < map.length; row += 1) {
    for (let col = 0; col < map[row].length; col += 1) {
      const pointer = map[row][col];

      if (pointer === 0) {
        // check surrondings
        const paths = canMoveTwo(map, [row, col], 0);

        if (paths) {
          foundPaths.set([row, col].join(","), paths);
        }
      }
    }
  }

  let sum = 0;
  foundPaths.forEach((path) => {
    sum += path.length;
  });

  return sum;
}
