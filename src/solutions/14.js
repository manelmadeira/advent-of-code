Number.prototype.mod = function (n) {
  "use strict";
  return ((this % n) + n) % n;
};

export function solutionPartOne(robots, seconds, width, length) {
  const map = new Array(length)
    .fill(null)
    .map(() => new Array(width).fill("."));

  for (let r = 0; r < robots.length; r += 1) {
    const [robotPos, robotVel] = robots[r];
    const finalX = (robotPos[0] + seconds * robotVel[0]).mod(width);
    const finalY = (robotPos[1] + seconds * robotVel[1]).mod(length);

    map[finalY][finalX] =
      (typeof map[finalY][finalX] === "number" ? map[finalY][finalX] : 0) + 1;
  }

  // const fs = require("fs");
  // fs.writeFile(
  //   `is-it-a-tree-${seconds}.txt`,
  //   map.map((row) => row.join("")).join("\n"),
  //   function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log("The file was saved!");
  //   }
  // );

  const quadrantsSum = [];
  const quadrants = [
    // 1st quadrant
    [
      [0, Math.floor(length / 2)],
      [0, Math.floor(width / 2)],
    ],
    // 2nd quadrant
    [
      [0, Math.floor(length / 2)],
      [Math.ceil(width / 2), width],
    ],
    // 3rd quadrant
    [
      [Math.ceil(length / 2), length],
      [0, Math.floor(width / 2)],
    ],
    // 4th quadrant
    [
      [Math.ceil(length / 2), length],
      [Math.ceil(width / 2), width],
    ],
  ];

  quadrants.forEach(([[minRow, maxRow], [minCol, maxCol]], idx) => {
    let sum = 0;

    for (let row = minRow; row < maxRow; row += 1) {
      for (let col = minCol; col < maxCol; col += 1) {
        if (typeof map[row][col] === "number") {
          sum += map[row][col];
        }
      }
    }

    quadrantsSum[idx] = sum;
  });

  return quadrantsSum.reduce((acc, number) => acc * number, 1);
}
