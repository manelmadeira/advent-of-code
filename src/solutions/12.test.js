import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne } from "./12";

describe("Day 12", () => {
  function prepareData(filePath) {
    const dataArray = readInput(filePath);
    return dataArray.map((row) => row.split(""));
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/12-example.txt")
      );

      expect(solutionPartOne(data)[0]).toEqual(140);
    });

    it("should return the correct value for the second example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/12-example-2.txt")
      );

      expect(solutionPartOne(data)[0]).toEqual(772);
    });

    it("should return the correct value for the third example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/12-example-3.txt")
      );

      expect(solutionPartOne(data)[0]).toEqual(1930);
    });

    it("should return the correct value for the first part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/12.txt"));

      expect(solutionPartOne(data)[0]).toEqual(1387004);
    });
  });

  describe("Part Two", () => {
    it("should return the correct value for the example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/12-example.txt")
      );

      expect(solutionPartOne(data)[1]).toEqual(80);
    });

    it("should return the correct value for the second example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/12-example-2.txt")
      );

      expect(solutionPartOne(data)[1]).toEqual(436);
    });

    it("should return the correct value for the third example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/12-example-3.txt")
      );

      expect(solutionPartOne(data)[1]).toEqual(1206);
    });

    it("should return the correct value for the fourth example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/12-example-4.txt")
      );

      expect(solutionPartOne(data)[1]).toEqual(236);
    });

    it("should return the correct value for the fifth example", () => {
      const data = prepareData(
        path.join(__dirname, "../inputs/12-example-5.txt")
      );

      expect(solutionPartOne(data)[1]).toEqual(368);
    });

    it("should return the correct value for the second part", () => {
      const data = prepareData(path.join(__dirname, "../inputs/12.txt"));

      expect(solutionPartOne(data)[1]).toEqual(844198);
    });
  });
});
