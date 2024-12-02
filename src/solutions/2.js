function isItValid(numberOne, numberTwo, direction) {
  // check direction still good
  if (numberOne < numberTwo && direction === -1) {
    const diff = Math.abs(numberOne - numberTwo);

    if (diff < 1 || diff > 3) {
      return false;
    }
  } else if (numberOne > numberTwo && direction === 1) {
    const diff = Math.abs(numberOne - numberTwo);

    if (diff < 1 || diff > 3) {
      return false;
    }
  } else {
    return false;
  }

  return true;
}

function isValidRow(columns) {
  // -1 is decreasing, 1 is increasing
  let direction = 0;

  for (let i = 1; i < columns.length; i += 1) {
    if (direction === 0) {
      direction = columns[i] < columns[i - 1] ? -1 : 1;
    }

    if (!isItValid(columns[i], columns[i - 1], direction)) {
      return false;
    }
  }

  return true;
}

export function solutionPartOne(rows) {
  let safeCount = 0;
  rows.forEach((columns) => {
    if (isValidRow(columns)) {
      safeCount += 1;
    }
  });

  return safeCount;
}

export function solutionPartTwo(rows) {
  let safeCount = 0;

  rows.forEach((columns) => {
    let isRowValid = isValidRow(columns);
    if (!isRowValid) {
      for (let i = 0; i < columns.length; i += 1) {
        const newArray = [...columns];

        newArray.splice(i, 1);

        isRowValid = isValidRow(newArray);
        if (isRowValid) {
          break;
        }
      }
    }

    if (isRowValid) {
      safeCount += 1;
    }
  });

  return safeCount;
}
