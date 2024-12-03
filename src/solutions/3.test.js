import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./3";

describe("Day 3", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    return dataArray;
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/3-example.txt"));

      expect(solutionPartOne(data)).toEqual(161);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/3.txt"));

      expect(solutionPartOne(data)).toEqual(178794710);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const rows = prepareData(
        path.join(__dirname, "../inputs/3-part-2-example.txt")
      );

      expect(solutionPartTwo(rows)).toEqual(48);
    });

    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/3.txt"));

      expect(solutionPartTwo(data)).toEqual(76729637);
    });
  });
});
