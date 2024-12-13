import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartTwo } from "./13";

const REGEX = /.*[\+=](\d*),.*[\+=](\d*)/g;

describe("Day 13", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);

    const tries = [];
    for (let i = 0; i < dataArray.length; i += 3) {
      const buttonA = [...dataArray[i].matchAll(REGEX)];
      const buttonB = [...dataArray[i + 1].matchAll(REGEX)];
      const prize = [...dataArray[i + 2].matchAll(REGEX)];

      tries.push([
        [Number(buttonA[0][1]), Number(buttonA[0][2])],
        [Number(buttonB[0][1]), Number(buttonB[0][2])],
        [Number(prize[0][1]), Number(prize[0][2])],
      ]);
    }

    return tries;
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/13-example.txt")
      );

      expect(solutionPartTwo(data)).toEqual(480);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/13.txt"));

      expect(solutionPartTwo(data)).toEqual(33427);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/13-example.txt")
      );

      expect(solutionPartTwo(data, 10000000000000)).toEqual(875318608908);
    });

    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/13.txt"));

      expect(solutionPartTwo(data, 10000000000000)).toEqual(875318608908);
    });
  });
});
