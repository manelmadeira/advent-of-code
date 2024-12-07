import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./7";

describe("Day 7", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    const calibrations = [];

    dataArray.forEach((row) => {
      const [result, numbers] = row.split(": ");

      calibrations.push([Number(result), numbers.split(" ").map(Number)]);
    });

    return calibrations;
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/7-example.txt"));
      expect(solutionPartOne(data)).toEqual(3749);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/7.txt"));

      expect(solutionPartOne(data)).toEqual(7710205485870);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(path.join(__dirname, "../inputs/7-example.txt"));
      expect(solutionPartTwo(data)).toEqual(11387);
    });

    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/7.txt"));

      expect(solutionPartTwo(data)).toEqual(20928985450275);
    });
  });
});
