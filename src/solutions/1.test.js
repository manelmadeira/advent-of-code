import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./1";

describe("Day 1", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);

    const arrayOne = [];
    const arrayTwo = [];

    dataArray.forEach((line) => {
      const [numberOne, numberTwo] = line.split("   ");

      arrayOne.push(numberOne);
      arrayTwo.push(numberTwo);
    });

    return [arrayOne, arrayTwo];
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const [arrayOne, arrayTwo] = prepareData(
        path.join(__dirname, "../inputs/1-example.txt")
      );

      expect(solutionPartOne(arrayOne, arrayTwo)).toEqual(11);
    });

    it("should return the correct value for the first part", () => {
      const [arrayOne, arrayTwo] = prepareData(
        path.join(__dirname, "../inputs/1.txt")
      );

      expect(solutionPartOne(arrayOne, arrayTwo)).toEqual(1319616);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const [arrayOne, arrayTwo] = prepareData(
        path.join(__dirname, "../inputs/1-example.txt")
      );

      expect(solutionPartTwo(arrayOne, arrayTwo)).toEqual(31);
    });

    it("should return the correct value for the second part", () => {
      const [arrayOne, arrayTwo] = prepareData(
        path.join(__dirname, "../inputs/1.txt")
      );

      expect(solutionPartTwo(arrayOne, arrayTwo)).toEqual(27267728);
    });
  });
});
