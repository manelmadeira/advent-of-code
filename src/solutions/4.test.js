import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./4";

describe("Day 4", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);

    return dataArray.map((row) => row.split(""));
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/4-example.txt"));

      expect(solutionPartOne(data)).toEqual(18);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/4.txt"));

      expect(solutionPartOne(data)).toEqual(2593);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/4-example.txt"));

      expect(solutionPartTwo(data)).toEqual(9);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/4.txt"));

      expect(solutionPartTwo(data)).toEqual(1950);
    });
  });
});
