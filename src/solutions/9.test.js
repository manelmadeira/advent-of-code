import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne } from "./9";
import { solutionPartTwoV2 } from "./9-2";

describe("Day 9", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    return dataArray[0].split("");
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/9-example.txt"));

      expect(solutionPartOne(data)).toEqual(1928);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/9.txt"));

      expect(solutionPartOne(data)).toEqual(6320029754031);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/9-example.txt"));

      expect(solutionPartTwoV2(data)).toEqual(2858);
    });

    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/9.txt"));

      expect(solutionPartTwoV2(data)).toEqual(6347435485773);
    });
  });
});
