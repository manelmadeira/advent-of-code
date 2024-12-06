const GUARD_UP = "^";
const GUARD_RIGHT = ">";
const GUARD_DOWN = "v";
const GUARD_LEFT = "<";
const BLOCK = "#";

const WALKING = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

const GUARD_POSITIONS = [GUARD_UP, GUARD_RIGHT, GUARD_LEFT, GUARD_DOWN];

function findGuard(map) {
  // search for guard position
  let guardCoord = [-1, -1];
  let direction = null;
  for (let row = 0; row < map.length; row += 1) {
    for (let col = 0; col < map[row].length; col += 1) {
      if (map[row][col] === GUARD_UP) {
        guardCoord = [row, col];
        direction = "up";
        break;
      } else if (map[row][col] === GUARD_DOWN) {
        guardCoord = [row, col];
        direction = "down";
        break;
      } else if (map[row][col] === GUARD_RIGHT) {
        guardCoord = [row, col];
        direction = "right";
        break;
      } else if (map[row][col] === GUARD_LEFT) {
        guardCoord = [row, col];
        direction = "left";
        break;
      }
    }
  }

  return [guardCoord, direction];
}

function isGuardLeavingMap(map, guardCoord, direction) {
  const maxRow = map.length;
  const maxCol = map[0].length;

  if (direction === "up" && guardCoord[0] === 0) {
    return true;
  } else if (direction === "right" && guardCoord[1] === maxCol - 1) {
    return true;
  } else if (direction === "down" && guardCoord[0] === maxRow - 1) {
    return true;
  } else if (direction === "left" && guardCoord[1] === 0) {
    return true;
  }

  return false;
}

function rotate(direction) {
  switch (direction) {
    case "up": {
      return "right";
    }
    case "right": {
      return "down";
    }
    case "down": {
      return "left";
    }
    case "left": {
      return "up";
    }
  }
}

function walk(map, currentCoord, direction) {
  let newCoord = [
    currentCoord[0] + 1 * WALKING[direction][0],
    currentCoord[1] + 1 * WALKING[direction][1],
  ];

  if (map[newCoord[0]][newCoord[1]] !== BLOCK) {
    return { newCoord, direction };
  }

  const newDirection = rotate(direction);
  return walk(map, currentCoord, newDirection);
}

export function solutionPartOne(map) {
  const visited = new Map();

  let [initialCoord, direction] = findGuard(map);
  let isGuardLeaving = isGuardLeavingMap(map, initialCoord, direction);
  while (!isGuardLeaving) {
    const updatedData = walk(map, initialCoord, direction);

    initialCoord = updatedData.newCoord;
    direction = updatedData.direction;

    visited.set(initialCoord.join(";"));

    isGuardLeaving = isGuardLeavingMap(map, initialCoord, direction);
  }

  return visited.size;
}

function doesItHaveALoop(map) {
  const visited = new Map();

  let isLoop = false;
  let [initialCoord, direction] = findGuard(map);
  let isGuardLeaving = isGuardLeavingMap(map, initialCoord, direction);

  while (!isGuardLeaving && !isLoop) {
    const updatedData = walk(map, initialCoord, direction);

    initialCoord = updatedData.newCoord;
    direction = updatedData.direction;

    if (visited.get(initialCoord.join(";")) === direction) {
      isLoop = true;
    } else {
      visited.set(initialCoord.join(";"), direction);
    }

    isGuardLeaving = isGuardLeavingMap(map, initialCoord, direction);
  }

  return isLoop;
}

export function solutionPartTwo(map) {
  const originalMap = [...map.map((row) => [...row])];
  const loops = new Map();
  const visited = new Map();

  let [initialCoord, direction] = findGuard(map);
  let isGuardLeaving = isGuardLeavingMap(map, initialCoord, direction);
  while (!isGuardLeaving) {
    const updatedData = walk(map, initialCoord, direction);

    initialCoord = updatedData.newCoord;
    direction = updatedData.direction;

    visited.set(initialCoord.join(";"));

    const newMap = [...originalMap.map((row) => [...row])];
    if (
      !GUARD_POSITIONS.includes(newMap[initialCoord[0]][initialCoord[1]]) &&
      !loops.get(initialCoord.join(";"))
    ) {
      newMap[initialCoord[0]][initialCoord[1]] = BLOCK;
      const hasLoop = doesItHaveALoop(newMap);

      if (hasLoop) {
        loops.set(initialCoord.join(";"));
      }
    }

    isGuardLeaving = isGuardLeavingMap(map, initialCoord, direction);
  }

  return loops.size;
}
