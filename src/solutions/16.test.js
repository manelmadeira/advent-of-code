import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne } from "./16";

describe("Day 16", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    return dataArray.map((row) => row.split(""));
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/16-example.txt")
      );

      expect(solutionPartOne(data)[0]).toEqual(7036);
    });

    it("should return the correct value for the second example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/16-example-2.txt")
      );

      expect(solutionPartOne(data)[0]).toEqual(11048);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/16.txt"));

      expect(solutionPartOne(data)[0]).toEqual(74392);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/16-example.txt")
      );

      expect(solutionPartOne(data)[1]).toEqual(45);
    });

    it("should return the correct value for the second example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/16-example-2.txt")
      );

      expect(solutionPartOne(data)[1]).toEqual(64);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/16.txt"));

      expect(solutionPartOne(data)[1]).toEqual(426);
    });
  });
});
