import path from "node:path";
import { expect, it, describe } from "vitest";
import { readInput } from "./utils/readInput";
import { solutionPartOne, solutionPartTwo } from "./5";

describe("Day 5", () => {
  function prepareData(filePath, separator) {
    const dataArray = readInput(filePath);

    return dataArray.map((row) => row.split(separator));
  }

  describe("Part One", () => {
    it("should return the correct value for the example", () => {
      const rules = prepareData(
        path.join(__dirname, "../inputs/5-example-rules.txt"),
        "|"
      );
      const pages = prepareData(
        path.join(__dirname, "../inputs/5-example-pages.txt"),
        ","
      );

      expect(solutionPartOne(rules, pages)).toEqual(143);
    });

    it("should return the correct value for the first part", () => {
      const rules = prepareData(
        path.join(__dirname, "../inputs/5-rules.txt"),
        "|"
      );
      const pages = prepareData(
        path.join(__dirname, "../inputs/5-pages.txt"),
        ","
      );

      expect(solutionPartOne(rules, pages)).toEqual(7307);
    });
  });

  describe("Part Two", () => {
    it.only("should return the correct value for the example", () => {
      const rules = prepareData(
        path.join(__dirname, "../inputs/5-example-rules.txt"),
        "|"
      );
      const pages = prepareData(
        path.join(__dirname, "../inputs/5-example-pages.txt"),
        ","
      );

      expect(solutionPartTwo(rules, pages)).toEqual(123);
    });

    it.only("should return the correct value for the second part", () => {
      const rules = prepareData(
        path.join(__dirname, "../inputs/5-rules.txt"),
        "|"
      );
      const pages = prepareData(
        path.join(__dirname, "../inputs/5-pages.txt"),
        ","
      );

      expect(solutionPartTwo(rules, pages)).toEqual(4713);
    });
  });
});
