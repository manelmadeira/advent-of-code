import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./8";

describe("Day 8", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    return dataArray.map((row) => row.split(""));
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/8-example.txt"));
      expect(solutionPartOne(data)).toEqual(14);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/8.txt"));

      expect(solutionPartOne(data)).toEqual(409);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/8-example.txt"));
      expect(solutionPartTwo(data)).toEqual(34);
    });

    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/8.txt"));

      expect(solutionPartTwo(data)).toEqual(1308);
    });
  });
});
