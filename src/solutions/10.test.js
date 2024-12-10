import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./10";

describe("Day 10", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    return dataArray.map((row) => row.split("").map(Number));
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/10-example.txt")
      );

      expect(solutionPartOne(data)).toEqual(36);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/10.txt"));

      expect(solutionPartOne(data)).toEqual(531);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/10-example.txt")
      );

      expect(solutionPartTwo(data)).toEqual(81);
    });

    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/10.txt"));

      expect(solutionPartTwo(data)).toEqual(1210);
    });
  });
});
