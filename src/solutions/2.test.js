import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./2";

describe("Day 2", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);

    const rows = [];
    dataArray.forEach((line) => {
      rows.push(line.split(" ").map((value) => Number(value)));
    });

    return rows;
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const rows = prepareData(path.join(__dirname, "../inputs/2-example.txt"));

      expect(solutionPartOne(rows)).toEqual(2);
    });

    it("should return the correct value for the first part", () => {
      const rows = prepareData(path.join(__dirname, "../inputs/2.txt"));

      expect(solutionPartOne(rows)).toEqual(526);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const rows = prepareData(path.join(__dirname, "../inputs/2-example.txt"));

      expect(solutionPartTwo(rows)).toEqual(4);
    });

    it("should return the correct value for the second part", () => {
      const rows = prepareData(path.join(__dirname, "../inputs/2.txt"));

      expect(solutionPartTwo(rows)).toEqual(566);
    });
  });
});
