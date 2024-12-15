// import { generate } from "text-to-image";
// import fileWriter from "text-to-image/extensions/fileWriter";
// import path from "path";

const ROBOT = "@";
const EDGE = "#";
const BOX = "O";
const BIG_BOX = ["[", "]"];
const EMPTY = ".";

const UP = "^";
const RIGHT = ">";
const DOWN = "v";
const LEFT = "<";

function findRobot(map) {
  for (let row = 0; row < map.length; row += 1) {
    for (let col = 0; col < map[row].length; col += 1) {
      if (map[row][col] === ROBOT) {
        return [row, col];
      }
    }
  }

  return null;
}

function moveDirection(map, initPos, offset) {
  const [initRow, initCol] = initPos;
  const [offsetRow, offsetCol] = offset;
  const symbol = map[initRow + offsetRow][initCol + offsetCol];

  if (symbol === EDGE) {
    return false;
  }

  if (symbol === BOX || BIG_BOX.includes(symbol)) {
    const moved = moveDirection(
      map,
      [initRow + offsetRow, initCol + offsetCol],
      offset
    );

    if (moved) {
      map = moved;
    } else {
      return false;
    }
  }

  map[initRow + offsetRow][initCol + offsetCol] = map[initRow][initCol];
  map[initRow][initCol] = EMPTY;

  return map;
}

function move(map, initPos, direction, enlarged = false) {
  if (direction === UP) {
    let moved;

    if (enlarged) {
      moved = moveUpDown(map, [initPos]);
    } else {
      moved = moveDirection(map, initPos, [-1, 0]);
    }

    if (moved) {
      map = moved;
    }
  } else if (direction === RIGHT) {
    const moved = moveDirection(map, initPos, [0, 1]);
    if (moved) {
      map = moved;
    }
  } else if (direction === DOWN) {
    let moved;

    if (enlarged) {
      moved = moveUpDown(map, [initPos], false);
    } else {
      moved = moveDirection(map, initPos, [1, 0]);
    }

    if (moved) {
      map = moved;
    }
  } else if (direction === LEFT) {
    const moved = moveDirection(map, initPos, [0, -1]);
    if (moved) {
      map = moved;
    }
  }

  return map;
}

export function solutionPartOne(map, commands) {
  let newMap = map.map((row) => [...row]);

  for (let i = 0; i < commands.length; i += 1) {
    const command = commands[i];
    const initPos = findRobot(newMap);

    newMap = move(newMap, initPos, command);
  }

  return sum(newMap, BOX);
}

function enlargeMap(map) {
  const newMap = [];
  let count = 0;

  for (let r = 0; r < map.length; r += 1) {
    const row = [];

    for (let c = 0; c < map[r].length; c += 1) {
      if (map[r][c] === EDGE) {
        row.push("#");
        row.push("#");
      } else if (map[r][c] === BOX) {
        count += 1;
        row.push("[");
        row.push("]");
      } else if (map[r][c] === ROBOT) {
        row.push("@");
        row.push(".");
      } else {
        row.push(".");
        row.push(".");
      }
    }

    newMap.push(row);
  }

  return newMap;
}

function validate(map, initPosArr, isUp) {
  const offset = isUp ? -1 : 1;

  for (let i = 0; i < initPosArr.length; i += 1) {
    const [initRow, initCol] = initPosArr[i];
    const symbol = map[initRow + offset][initCol];

    if (symbol === EDGE) {
      return false;
    }

    if (symbol === EMPTY) {
      continue;
    }

    if (symbol === "[") {
      const boxArr = [
        [initRow + offset, initCol],
        [initRow + offset, initCol + 1],
      ];

      const canMove = validate(map, boxArr, isUp);

      if (!canMove) {
        return false;
      }
    } else if (symbol === "]") {
      const boxArr = [
        [initRow + offset, initCol],
        [initRow + offset, initCol - 1],
      ];

      const canMove = validate(map, boxArr, isUp);

      if (!canMove) {
        return false;
      }
    }
  }

  return true;
}

export function moveUpDown(map, initPosArr, up = true) {
  const offset = up ? -1 : 1;
  const isValid = validate(map, initPosArr, up);

  if (!isValid) {
    return false;
  }

  let canMoveUp = true;
  for (let i = 0; i < initPosArr.length; i += 1) {
    const [initRow, initCol] = initPosArr[i];
    const symbol = map[initRow + offset][initCol];

    if (symbol === EDGE) {
      canMoveUp = false;
      break;
    }

    if (symbol === EMPTY) {
      continue;
    }

    if (symbol === "[") {
      const boxArr = [
        [initRow + offset, initCol],
        [initRow + offset, initCol + 1],
      ];

      const moved = moveUpDown(map, boxArr, up);

      if (moved) {
        map = moved;
      } else {
        canMoveUp = false;
        break;
      }
    } else if (symbol === "]") {
      const boxArr = [
        [initRow + offset, initCol],
        [initRow + offset, initCol - 1],
      ];

      const moved = moveUpDown(map, boxArr, up);

      if (moved) {
        map = moved;
      } else {
        canMoveUp = false;
        break;
      }
    }
  }

  if (canMoveUp) {
    for (let i = 0; i < initPosArr.length; i += 1) {
      const [initRow, initCol] = initPosArr[i];

      map[initRow + offset][initCol] = map[initRow][initCol];
      map[initRow][initCol] = EMPTY;
    }
  }

  return canMoveUp ? map : false;
}

export function sum(map, char = "[") {
  let sum = 0;
  for (let row = 0; row < map.length; row += 1) {
    for (let col = 1; col < map[row].length; col += 1) {
      if (map[row][col] === char) {
        sum += 100 * row + col;
      }
    }
  }

  return sum;
}

export function solutionPartTwo(map, commands) {
  let newMap = enlargeMap(map);

  for (let i = 0; i < commands.length; i += 1) {
    const command = commands[i];

    const initPos = findRobot(newMap);
    newMap = move(newMap, initPos, command, true);

    // await generate(
    //   `Command: ${command}; \n ${newMap.map((row) => row.join("")).join("\n")}`,
    //   {
    //     // textColor: "red",
    //     maxWidth: 1720,
    //     fontFamily: "Monaco",
    //     extensions: [
    //       fileWriter({
    //         fileName: path.join("images", `image-${i}.png`),
    //       }),
    //     ],
    //   }
    // );
  }

  return sum(newMap);
}
