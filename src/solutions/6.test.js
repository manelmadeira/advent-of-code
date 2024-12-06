import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./6";

describe("Day 6", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    return dataArray.map((row) => row.split(""));
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/6-example.txt"));

      expect(solutionPartOne(data)).toEqual(41);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/6.txt"));

      expect(solutionPartOne(data)).toEqual(5269);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/6-example.txt"));

      expect(solutionPartTwo(data)).toEqual(6);
    });

    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/6.txt"));

      expect(solutionPartTwo(data)).toEqual(1957);
    });
  });
});
