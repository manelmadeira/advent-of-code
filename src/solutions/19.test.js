import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartThree, solutionPartTwo } from "./19";

describe("Day 19", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);

    const towels = dataArray[0].split(", ");

    const patterns = [];
    for (let i = 1; i < dataArray.length; i += 1) {
      patterns.push(dataArray[i]);
    }

    return { towels, patterns };
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const { towels, patterns } = prepareData(
        path.join(__dirname, "../inputs/19-example.txt")
      );

      expect(solutionPartOne(towels, patterns)).toEqual(6);
    });

    it("should return the correct value for the first part", () => {
      const { towels, patterns } = prepareData(
        path.join(__dirname, "../inputs/19.txt")
      );

      expect(solutionPartOne(towels, patterns)).toEqual(298);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const { towels, patterns } = prepareData(
        path.join(__dirname, "../inputs/19-example.txt")
      );

      expect(solutionPartTwo(towels, patterns)).toEqual(16);
    });

    it("should return the correct value for the first part", () => {
      const { towels, patterns } = prepareData(
        path.join(__dirname, "../inputs/19.txt")
      );

      expect(solutionPartTwo(towels, patterns)).toEqual(572248688842069);
    });
  });
});
