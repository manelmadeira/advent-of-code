import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartTwo } from "./11";

describe("Day 11", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    return dataArray[0].split(" ");
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/11-example.txt")
      );

      expect(solutionPartTwo(data, 25)).toEqual(55312);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/11.txt"));

      expect(solutionPartTwo(data, 25)).toEqual(217443);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/11.txt"));

      expect(solutionPartTwo(data, 75)).toEqual(257246536026785);
    });
  });
});
