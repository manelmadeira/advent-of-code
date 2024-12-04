function searchXmasFromCoord(word, directions, input, row, col) {
  const validDirections = new Array(directions.length).fill(true);

  for (let i = 0; i < word.length; i += 1) {
    for (let dirIdx = 0; dirIdx < directions.length; dirIdx += 1) {
      const direction = directions[dirIdx];
      const newRow = row + i * direction[0];
      const newCol = col + i * direction[1];

      if (
        newRow >= 0 &&
        newRow < input.length &&
        newCol >= 0 &&
        newCol < input[newRow].length
      ) {
        if (input[newRow][newCol] !== word[i]) {
          validDirections[dirIdx] = false;
        }
      } else {
        validDirections[dirIdx] = false;
      }
    }
  }

  return validDirections.reduce(
    (acc, direction) => (direction ? acc + 1 : acc),
    0
  );
}

export function solutionPartOne(input) {
  let count = 0;
  const word = ["X", "M", "A", "S"];
  const directions = [
    [1, 0], // down
    [-1, 0], // up
    [0, -1], // left
    [0, 1], // right
    [-1, -1], // diag up left
    [-1, 1], // diag up right
    [1, -1], // diag down left
    [1, 1], // diag down right
  ];

  for (let row = 0; row < input.length; row += 1) {
    for (let col = 0; col < input[row].length; col += 1) {
      if (input[row][col] === "X") {
        count += searchXmasFromCoord(word, directions, input, row, col);
      }
    }
  }

  return count;
}

export function solutionPartTwo(input) {
  let count = 0;

  for (let row = 1; row < input.length - 1; row += 1) {
    for (let col = 1; col < input[row].length - 1; col += 1) {
      if (input[row][col] === "A") {
        let diags = 0;
        if (
          (input[row - 1][col - 1] === "M" &&
            input[row + 1][col + 1] === "S") ||
          (input[row - 1][col - 1] === "S" && input[row + 1][col + 1] === "M")
        ) {
          diags += 1;
        }

        if (
          (input[row - 1][col + 1] === "M" &&
            input[row + 1][col - 1] === "S") ||
          (input[row - 1][col + 1] === "S" && input[row + 1][col - 1] === "M")
        ) {
          diags += 1;
        }

        if (diags === 2) {
          count += 1;
        }
      }
    }
  }

  return count;
}
